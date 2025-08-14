// import { fieldAnatomy } from '@ark-ui/react/field'
import { defineSlotRecipe } from '@pandacss/dev'
// import { resolveAnatomyKeys } from '../../utils/resolve-anatomy-keys';

// const slots = resolveAnatomyKeys(fieldAnatomy);
const slots = ["input", "label", "select", "textarea", "root", "errorText", "helperText", "requiredIndicator"]

export const field = defineSlotRecipe({
  className: 'field',
  // slots: fieldAnatomy.keys(),
  slots: slots,
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
    },
    label: {
      color: 'fg.default',
      fontWeight: 'medium',
      textStyle: 'sm',
      _disabled: {
        color: 'fg.disabled',
      },
    },
    helperText: {
      color: 'fg.muted',
      textStyle: 'sm',
      _disabled: {
        color: 'fg.disabled',
      },
    },
    errorText: {
      alignItems: 'center',
      color: 'fg.error',
      display: 'inline-flex',
      gap: '2',
      textStyle: 'sm',
      _disabled: {
        color: 'fg.disabled',
      },
    },
  },
})
