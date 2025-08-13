'use client'
import type { Assign } from '@ark-ui/react'
import { Checkbox } from '@ark-ui/react/checkbox'
import { type CheckboxVariantProps, checkbox } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from './utils/create-style-context'

const { withProvider, withContext } = createStyleContext(checkbox)

export type RootProviderProps = ComponentProps<typeof RootProvider>

// Derive Ark prop types from actual components (version-proof)
type ArkRootProviderProps = React.ComponentProps<typeof Checkbox.RootProvider>
type ArkRootProps         = React.ComponentProps<typeof Checkbox.Root>
type ArkControlProps      = React.ComponentProps<typeof Checkbox.Control>
type ArkGroupProps        = React.ComponentProps<typeof Checkbox.Group>
type ArkIndicatorProps    = React.ComponentProps<typeof Checkbox.Indicator>
type ArkLabelProps        = React.ComponentProps<typeof Checkbox.Label>


export const RootProvider = withProvider<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, Assign<ArkRootProviderProps, CheckboxVariantProps>>
>(Checkbox.RootProvider, 'root')


// export const RootProvider = withProvider<
//   HTMLLabelElement,
//   Assign<Assign<HTMLStyledProps<'label'>, Checkbox.RootProviderBaseProps>, CheckboxVariantProps>
// >(Checkbox.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, Assign<ArkRootProps, CheckboxVariantProps>>
>(Checkbox.Root, 'root')


export const Control = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ArkControlProps>
>(Checkbox.Control, 'control')

export const Group = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ArkGroupProps>
>(Checkbox.Group, 'group')

export const Indicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ArkIndicatorProps>
>(Checkbox.Indicator, 'indicator')

export const Label = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, ArkLabelProps>
>(Checkbox.Label, 'label')

export {
  CheckboxContext as Context,
  CheckboxHiddenInput as HiddenInput,
} from '@ark-ui/react/checkbox'
