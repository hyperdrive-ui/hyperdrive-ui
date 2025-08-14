import { cosmiconfigSync } from 'cosmiconfig'
import fs from 'fs-extra'
import path from 'path'
import { Config, DEFAULT_CONFIG } from '../types.js'

const explorer = cosmiconfigSync('hyperdrive-ui')

export function getConfig(cwd: string = process.cwd()): Config {
  const result = explorer.search(cwd)
  
  if (result) {
    return { ...DEFAULT_CONFIG, ...result.config }
  }
  
  // Try to read from package.json
  const packageJsonPath = path.join(cwd, 'package.json')
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = fs.readJsonSync(packageJsonPath)
    if (packageJson['hyperdrive-ui']) {
      return { ...DEFAULT_CONFIG, ...packageJson['hyperdrive-ui'] }
    }
  }
  
  return DEFAULT_CONFIG
}

export function saveConfig(config: Config, cwd: string = process.cwd()): void {
  const configPath = path.join(cwd, 'hyperdrive-ui.config.json')
  fs.writeJsonSync(configPath, config, { spaces: 2 })
}


export function hasConfig(cwd: string = process.cwd()): boolean {
  console.log('Checking for config in:', cwd)
  
  const result = explorer.search(cwd)
  console.log('Explorer result:', result)
  
  // Also check for the direct file
  const configPath = path.join(cwd, 'hyperdrive-ui.config.json')
  const directExists = fs.existsSync(configPath)
  console.log('Direct config file exists:', directExists)
  
  return result !== null || directExists
}