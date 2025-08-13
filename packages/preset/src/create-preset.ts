import { type SemanticTokens, definePreset } from '@pandacss/dev'
import red from './colors/red'
import type { PresetOptions } from './options'
import { breakpoints } from './theme/breakpoints'
import { conditions } from './theme/conditions'
import { globalCss } from './theme/global-css'
import { keyframes } from './theme/keyframes'
import { recipes, slotRecipes } from './theme/recipes'
import { semanticTokens } from './theme/semantic-tokens'
import { textStyles } from './theme/text-styles'
import { tokens } from './theme/tokens'
import { createRadii } from './utils/create-radii'

export const createPreset = (options: PresetOptions) => {
  const { accentColor, grayColor, radius } = options

  const standardizeGrayTokens = (tokens: SemanticTokens['colors']) =>
    JSON.parse(JSON.stringify(tokens).replace(new RegExp(grayColor.name, 'g'), 'gray'))

  return definePreset({
    name: '@hyperdrive-ui/panda-preset',
    presets: ['@pandacss/preset-base'],
    conditions,
    globalCss: {
      ...globalCss,
      html: {
        colorPalette: accentColor.name,
      },
    },
    theme: {
      extend: {
        breakpoints,
        keyframes,
        recipes,
        slotRecipes,
        textStyles,
        tokens: {
          ...tokens,
          colors: {
            ...tokens.colors,
            red: red.tokens,
            gray: grayColor.tokens ?? {},

            // accent: accentColor.tokens  ?? {},
            // Add accent color as "accent" key
            ...(accentColor.tokens && { accent: accentColor.tokens }),
            
            [accentColor.name]: accentColor.tokens,
          },
        },
        semanticTokens: {
          ...semanticTokens,
          colors: {
            ...semanticTokens.colors,
            red: red.semanticTokens,
            gray: standardizeGrayTokens(grayColor.semanticTokens),
            // "accent": accentColor.semanticTokens ?? {},
            // Add accent color as "accent" key
            ...(accentColor.semanticTokens && { accent: accentColor.semanticTokens }),
            [accentColor.name]: accentColor.semanticTokens,
          },
          radii: createRadii(radius),
        },
      },
    },
  })
}
