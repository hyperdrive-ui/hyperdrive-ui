import fetch, { FetchError } from 'node-fetch'
import { ComponentData, GitHubFile } from '../types.js'

const REPO_BASE_URL = 'https://raw.githubusercontent.com/gregStevenard/hyperdrive-ui/main'

export async function fetchFileFromGitHub(filePath: string): Promise<GitHubFile> {
  const url = `${REPO_BASE_URL}/${filePath}`
  
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      if (response.status === 404) {
        return { path: filePath, content: '', exists: false }
      }
      throw new Error(`Failed to fetch ${filePath}: ${response.status} ${response.statusText}`)
    }
    
    const content = await response.text()
    return { path: filePath, content, exists: true }
    
  } catch (error: unknown) {
        let err = error as FetchError;
    throw new Error(`Error fetching ${filePath}: ${err.message}`)
  }
}

export async function fetchComponent(componentName: string, framework: string): Promise<ComponentData> {
  const files = await Promise.allSettled([
    // Main component file
    fetchFileFromGitHub(`components/${framework}/src/components/ui/${componentName}.tsx`),
    
    // Styled component file
    fetchFileFromGitHub(`components/${framework}/src/components/ui/styled/${componentName}.tsx`),
    
    // Recipe file
    // fetchFileFromGitHub(`packages/styled-system/src/recipes/${componentName}.ts`),
    fetchFileFromGitHub(`packages/preset/src/theme/recipes/${componentName}.ts`),
    
    // Utils (if component has custom utils)
    fetchFileFromGitHub(`components/${framework}/src/components/ui/styled/utils/create-style-context.ts`)
  ])

  const componentData: ComponentData = {
    name: componentName,
    files: {}
  }

  // Process results
 const [componentResult, styledResult, recipeResult] = files

  if (componentResult.status === 'fulfilled' && componentResult.value.exists) {
    componentData.files.component = componentResult.value.content
  }

  if (styledResult.status === 'fulfilled' && styledResult.value.exists) {
    componentData.files.styled = styledResult.value.content
  }

  if (recipeResult.status === 'fulfilled' && recipeResult.value.exists) {
    componentData.files.recipe = recipeResult.value.content
  }


  // Check if we got at least one file
  if (!componentData.files.component && !componentData.files.styled) {
    throw new Error(`Component "${componentName}" not found for framework "${framework}"`)
  }

  return componentData
}

export async function getAvailableComponents(framework: string): Promise<string[]> {
  // This is a simplified version - you could fetch a directory listing
  // or maintain a hardcoded list of available components
  return [
    'accordion',
    'action-bar',
    'alert',
    'avatar',
    'badge',
    'button',
    'card', 
    'carousel',
    'checkbox',
    'clipboard',
    'close-button',
    'code',
    'collapsible',
    'color-picker',
    'combobox',
    'date-picker',
    'dialog',
    'drawer',
    'editable',
    'field',
    'fieldset',
    'file-upload',
    'form-label',
    'heading',
    'hover-card',
    'icon-button',
    'icon',
    'input',
    'kbd',
    'link',
    'menu',
    'number-input',
    'pagination',
    'pin-input',
    'popover',
    'progress',
    'qr-code',
    'radio-button-group',
    'radio-group',
    'rating-group',
    'segment-group',
    'select',
    'skeleton',
    'slider',
    'span',
    'spinner',
    'splitter',
    'switch',
    'table',
    'tabs',
    'tags-input',
    'text',
    'textarea',
    'toast',
    'toggle-group',
    'tooltip',
    'tree-view'
  ]
}