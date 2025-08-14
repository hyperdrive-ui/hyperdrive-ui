import path from 'path'
import { Command } from 'commander'
import prompts from 'prompts'
import chalk from 'chalk'
import ora from 'ora'
import { getConfig, saveConfig, hasConfig } from '../utils/config.js'
import { ensureDir, writeFile } from '../utils/file-utils.js'
import { Config, DEFAULT_CONFIG } from '../types.js'

export const init = new Command()
  .name('init')
  .description('Initialize hyperdrive-ui in your project')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .option('-f, --force', 'Force overwrite existing configuration')
  .action(async (options: { yes?: boolean; force?: boolean }) => {
    const cwd = process.cwd()
    
    // Check if already initialized
    if (hasConfig(cwd) && !options.force) {
      console.log(chalk.yellow('Configuration already exists. Use --force to overwrite.'))
      return
    }
    
    const spinner = ora('Initializing hyperdrive-ui...').start()
    
    try {
      let config: Config = DEFAULT_CONFIG
      
      if (!options.yes) {
        spinner.stop()
        
        const responses = await prompts([
          {
            type: 'select',
            name: 'framework',
            message: 'Which JS framework do you use?',
            choices: [
              { title: 'React', value: 'react' },
              { title: 'Solid', value: 'solid' },
              { title: 'Vue', value: 'vue' }
            ],
            initial: 0
          },
          {
            type: 'text',
            name: 'componentPath',
            message: 'Where would you like to store your components?',
            initial: DEFAULT_CONFIG.componentPath
          },
          {
            type: 'text',
            name: 'recipePath',
            message: 'Where would you like to store your recipes?',
            initial: DEFAULT_CONFIG.recipePath
          }
        ])
        
        if (!responses.framework) {
          console.log(chalk.red('Setup cancelled'))
          process.exit(0)
        }
        
        config = { ...config, ...responses }
        spinner.start()
      }
      
      spinner.text = 'Creating directories...'
      await ensureDir(config.componentPath)
      await ensureDir(path.join(config.componentPath, 'styled'))
      await ensureDir(path.join(config.componentPath, 'styled', 'utils'))
      await ensureDir(config.recipePath)
      
      spinner.text = 'Saving configuration...'
      saveConfig(config)
      
      spinner.text = 'Creating utility files...'
      await createUtilityFiles(config)
      
      spinner.succeed('Successfully initialized hyperdrive-ui!')
      
      console.log(chalk.green('\nNext steps:'))
      console.log(`1. Add components: ${chalk.cyan('npx @hyperdrive-ui/cli add button')}`)
      console.log(`2. Install dependencies: ${chalk.cyan('pnpm install @ark-ui/react @hyperdrive-ui/panda-preset')}`)
      console.log(`3. Update your panda.config.ts to include the preset`)
      
    } catch (error) {
      spinner.fail('Failed to initialize hyperdrive-ui')
      console.error(chalk.red(error.message))
      process.exit(1)
    }
  })

async function createUtilityFiles(config: Config): Promise<void> {
  // Create cn utility function
  const utilsContent = `import { type ClassValue, clsx } from "clsx"
import { cx } from "styled-system/css"

export function cn(...inputs: ClassValue[]) {
  return cx(clsx(inputs))
}
`
  
  const utilsPath = path.join(config.componentPath, '..', 'lib', 'utils.ts')
  await writeFile(utilsPath, utilsContent)
}