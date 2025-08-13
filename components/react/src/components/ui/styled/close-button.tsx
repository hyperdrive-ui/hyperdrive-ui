import { ark } from '@ark-ui/react/factory'
// import { MdClose } from 'react-icons/md'
import { styled } from 'styled-system/jsx'
import { type ButtonVariantProps, button } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

export type CloseButtonProps = ComponentProps<typeof CloseButton>

export const CloseButton = styled(ark.button, button, {
  defaultProps: { px: '0', variant: 'ghost' } as ButtonVariantProps,
})
