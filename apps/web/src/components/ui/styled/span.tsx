import { ark } from '@ark-ui/react/factory'
import { styled } from 'styled-system/jsx'
// import { type ButtonVariantProps, button } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

export type SpanProps = ComponentProps<typeof Span>
export const Span = styled(ark.span);

