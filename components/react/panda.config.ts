import { defineConfig } from '@pandacss/dev'
import { createPreset } from '@hyperdrive-ui/panda-preset'
import neutral from '@hyperdrive-ui/panda-preset/colors/neutral'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  importMap: 'styled-system',
  jsxFramework: 'react',
  presets: [
    '@pandacss/preset-panda',
    createPreset({ accentColor: neutral, grayColor: neutral, radius: 'sm' }),
  ],
})
