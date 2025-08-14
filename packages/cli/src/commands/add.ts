import { Command } from 'commander'
import prompts from 'prompts'
import chalk from 'chalk'
import ora from 'ora'
import path from 'path'
import { getConfig, hasConfig } from '../utils/config.js'
import { fetchComponent, fetchFileFromGitHub, getAvailableComponents } from '../utils/github.js'
import { transformImports, transformForFramework } from '../utils/transform.js'
import { 
  writeFile, 
  fileExists, 
  ensureDir,
  resolveComponentPath, 
  resolveStyledPath, 
  resolveRecipePath,
  resolveUtilsPath 
} from '../utils/file-utils.js'
import { Config } from '../types.js'

export const add = new Command()
  .name('add')
  .description('Add components to your project')
  .argument('[components...]', 'Components to add')
  .option('-a, --all', 'Add all available components')
  .option('-f, --force', 'Overwrite existing files')
  .action(async (components: string[], options: { all?: boolean; force?: boolean }) => {
    const cwd = process.cwd()
    
    if (!hasConfig(cwd)) {
      console.log(chalk.red('No configuration found. Run "hyperdrive-ui init" first.'))
      process.exit(1)
    }
    
    const config = getConfig(cwd)
    const spinner = ora('Adding components...').start()
    
    try {
      let componentsToAdd: string[] = []
      
      if (options.all) {
        componentsToAdd = await getAvailableComponents(config.framework)
      } else if (components.length > 0) {
        componentsToAdd = components
      } else {
        spinner.stop()
        const availableComponents = await getAvailableComponents(config.framework)
        const { selected } = await prompts({
          type: 'multiselect',
          name: 'selected',
          message: 'Which components would you like to add?',
          choices: availableComponents.map(name => ({
            title: name,
            value: name,
            selected: false
          })),
          min: 1
        })
        
        if (!selected || selected.length === 0) {
          console.log(chalk.yellow('No components selected'))
          return
        }
        
        componentsToAdd = selected
        spinner.start()
      }
      
      const results: { name: string; success: boolean; error?: string }[] = []
      
      for (const componentName of componentsToAdd) {
        spinner.text = `Adding ${componentName}...`
        
        try {
          await addComponent(componentName, config, options.force || false)
          results.push({ name: componentName, success: true })
        } catch (error) {
          results.push({ 
            name: componentName, 
            success: false, 
            error: error.message 
          })
        }
      }
      
      spinner.stop()
      
      // Report results
      const successful = results.filter(r => r.success)
      const failed = results.filter(r => !r.success)
      
      
    if (successful.length > 0) {
        console.log(chalk.green(`\n✓ Successfully added ${successful.length} component(s):`))
        successful.forEach(({ name }) => {
            console.log(`  ${chalk.cyan('•')} ${name}`)
        })
        
        // Update recipes index
        spinner.start('Updating recipes index...')
        try {
            await updateRecipesIndex(config)
            spinner.succeed('Recipes index updated!')
        } catch (error) {
            spinner.warn('Could not update recipes index automatically')
            console.log(chalk.yellow('Please manually add your recipes to src/theme/recipes/index.ts'))
        }
    }
      
      if (failed.length > 0) {
        console.log(chalk.red(`\n✗ Failed to add ${failed.length} component(s):`))
        failed.forEach(({ name, error }) => {
          console.log(`  ${chalk.red('•')} ${name}: ${error}`)
        })
      }
      
    } catch (error) {
      spinner.fail('Failed to add components')
      console.error(chalk.red(error.message))
      process.exit(1)
    }
  })

async function addComponent(name: string, config: Config, force: boolean): Promise<void> {
  // Fetch component data from GitHub
  const componentData = await fetchComponent(name, config.framework)
  
  // Check for existing files
  const componentPath = resolveComponentPath(config, name)
  const styledPath = resolveStyledPath(config, name)
  const recipePath = resolveRecipePath(config, name)
  const utilsPath = resolveUtilsPath(config)
  
  if (!force) {
    const existingFiles = []
    if (componentData.files.component && await fileExists(componentPath)) {
      existingFiles.push(componentPath)
    }
    if (componentData.files.styled && await fileExists(styledPath)) {
      existingFiles.push(styledPath)
    }
    if (componentData.files.recipe && await fileExists(recipePath)) {
      existingFiles.push(recipePath)
    }
    
    if (existingFiles.length > 0) {
      throw new Error(`Files already exist. Use --force to overwrite: ${existingFiles.join(', ')}`)
    }
  }
  
  // Write component files
  if (componentData.files.component) {
    let content = transformImports(componentData.files.component, config)
    content = transformForFramework(content, 'react', config.framework)
    await writeFile(componentPath, content)
  }
  
  if (componentData.files.styled) {
    let content = transformImports(componentData.files.styled, config)
    content = transformForFramework(content, 'react', config.framework)
    await writeFile(styledPath, content)
  }
  
  if (componentData.files.recipe) {
    const content = transformImports(componentData.files.recipe, config)
    await writeFile(recipePath, content)
  }
  
  // Always ensure create-style-context.ts exists (fetch it once if needed)
  if (!await fileExists(utilsPath)) {
    await ensureStyleContextUtils(config)
  }
}

async function ensureStyleContextUtils(config: Config): Promise<void> {
  const utilsPath = resolveUtilsPath(config)
  
  // Always fetch YOUR actual file - no fallback
  const utilsFile = await fetchFileFromGitHub(`components/${config.framework}/src/components/ui/styled/utils/create-style-context.tsx`)
  
  if (utilsFile.exists) {
    const content = transformImports(utilsFile.content, config)
    await writeFile(utilsPath, content)
  } else {
    throw new Error(`create-style-context.ts not found in repository for framework: ${config.framework}`)
  }
}


async function updateRecipesIndex(config: Config): Promise<void> {
  const indexFile = await fetchFileFromGitHub('packages/preset/src/theme/recipes/index.ts')
  if (indexFile.exists) {
    const indexPath = path.join(config.recipePath, 'index.ts')
    const content = transformImports(indexFile.content, config)
    await writeFile(indexPath, content)
  } else {
    throw new Error('Could not fetch recipes index from repository')
  }
}