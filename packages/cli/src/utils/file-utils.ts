import fs from 'fs-extra'
import path from 'path'
import type { Config } from '../types'

export async function ensureDir(dirPath: string): Promise<void> {
  await fs.ensureDir(dirPath)
}

export async function writeFile(filePath: string, content: string): Promise<void> {
  await ensureDir(path.dirname(filePath))
  await fs.writeFile(filePath, content, 'utf8')
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

export function resolveComponentPath(config: Config, componentName: string): string {
  const extension = config.framework === 'vue' ? '.vue' : '.tsx'
  return path.resolve(config.componentPath, componentName + extension)
}

export function resolveStyledPath(config: Config, componentName: string): string {
  const extension = config.framework === 'vue' ? '.vue' : '.tsx'
  return path.resolve(config.componentPath, 'styled', componentName + extension)
}

export function resolveRecipePath(config: Config, componentName: string): string {
  return path.resolve(config.recipePath, componentName + '.ts')
}

export function resolveUtilsPath(config: Config): string {
  return path.resolve(config.componentPath, 'styled', 'utils', 'create-style-context.ts')
}