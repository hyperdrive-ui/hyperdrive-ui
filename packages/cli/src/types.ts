export interface Config {
  framework: 'react' | 'solid' | 'vue'
  componentPath: string
  recipePath: string
  styledSystemPath: string
  aliases: {
    components: string
    utils: string
    styledSystem: string
  }
}

export interface ComponentData {
  name: string
  files: {
    component?: string
    styled?: string
    recipe?: string
    utils?: string
  }
}

export interface GitHubFile {
  path: string
  content: string
  exists: boolean
}

export const DEFAULT_CONFIG: Config = {
  framework: 'react',
  componentPath: './src/components/ui',
  recipePath: './src/theme/recipes',
  styledSystemPath: './styled-system',
  aliases: {
    components: '~/components',
    utils: '~/lib/utils',
    styledSystem: 'styled-system'
  }
}