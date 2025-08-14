import { Config } from '../types.js'

export function transformImports(content: string, config: Config): string {
  let transformed = content

  // Transform styled-system imports
  transformed = transformed.replace(
    /from ['"`]styled-system\/([^'"`]+)['"`]/g,
    `from '${config.aliases.styledSystem}/$1'`
  )

  // Transform component imports  
  transformed = transformed.replace(
    /from ['"`]~\/([^'"`]+)['"`]/g,
    `from '${config.aliases.components}/$1'`
  )

  // Transform utils imports
  transformed = transformed.replace(
    /from ['"`]@\/lib\/([^'"`]+)['"`]/g,
    `from '${config.aliases.utils}/$1'`
  )

  return transformed
}

export function transformForFramework(
  content: string, 
  fromFramework: string, 
  toFramework: string
): string {
  if (fromFramework === toFramework) {
    return content
  }

  // Add framework-specific transformations here
  // This is a simplified example
  if (toFramework === 'solid') {
    content = content.replace(
      /import { ([^}]+) } from ['"`]react['"`]/g,
      'import { $1 } from "solid-js"'
    )
    
    content = content.replace(
      /React\.FC/g,
      'Component'
    )
  }

  if (toFramework === 'vue') {
    // Add Vue-specific transformations
  }

  return content
}