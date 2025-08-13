import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'


// import { join, dirname } from "path"

const config: StorybookConfig = {
  stories: [
    '../src/components/stories/*.tsx', 
    // '../src/plus/stories/*.tsx'
  ],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: { backgrounds: false, controls: false, actions: false },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-themes',  
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  typescript: {
    reactDocgen: false,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tsconfigPaths({ root: './' })],
    })
  },
}

export default config


// /**
// * This function is used to resolve the absolute path of a package.
// * It is needed in projects that use Yarn PnP or are set up within a monorepo.
// */
// function getAbsolutePath(value: string): any {
//   return dirname(require.resolve(join(value, 'package.json')))
// }
// const config: StorybookConfig = {
//   "stories": [
//     "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
//   ],
//   "addons": [],
//   "framework": {
//     "name": getAbsolutePath('@storybook/react-vite'),
//     "options": {}
//   }
// };
// export default config;