'use client'

import type { Assign, PolymorphicProps } from '@ark-ui/react'
// import { Dialog } from '@ark-ui/react/dialog'
import { ark } from '@ark-ui/react/factory'
import { type ActionBarVariantProps, actionBar } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from './utils/create-style-context'
import { Popover as ArkPopover } from '@ark-ui/react/popover'

const { withRootProvider, withContext } = createStyleContext(actionBar)


export type RootProviderProps = ComponentProps<typeof RootProvider>

export const RootProvider = withRootProvider<
  Assign<ArkPopover.RootProviderBaseProps, ActionBarVariantProps>
>(ArkPopover.RootProvider)


export type RootProps = ComponentProps<typeof Root>
export const Root = withRootProvider<Assign<ArkPopover.RootProps, ActionBarVariantProps>>(ArkPopover.Root)


// export const Positioner = withContext<
//     HTMLDivElement, 
//     Assign<HTMLStyledProps<'div'>, ArkPopover.PositionerBaseProps> 
// >(ArkPopover.Positioner, 'positioner');

export const Positioner = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, PolymorphicProps>>(
    ark.div,
    'positioner'
)


export const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, ArkPopover.ContentBaseProps>
>(ArkPopover.Content, 'content')

export const CloseTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, ArkPopover.CloseTriggerBaseProps>
>(ArkPopover.CloseTrigger, 'closeTrigger')

// This is a custom component
export const SelectionTrigger = withContext<HTMLButtonElement, Assign<HTMLStyledProps<'button'>, PolymorphicProps>>(
    ark.button,
    'selectionTrigger'
)

export const Separator = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, PolymorphicProps>>(
    ark.div,
    'separator'
)


// export const Seperator = withContext<
//   HTMLDivElement,
//   Assign<HTMLStyledProps<'div'>, Dialog.DescriptionBaseProps>
// >(ArkPopover., 'description')



// export const SelectionTrigger = withContext<
//   HTMLButtonElement,
//   Assign<HTMLStyledProps<'button'>,  PolymorphicProps>
// >(ArkPopover.SelectionTrigger, 'closeTrigger')

