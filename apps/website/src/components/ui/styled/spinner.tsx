import { ark } from '@ark-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { spinner } from 'styled-system/recipes'
import type { ComponentProps } from 'styled-system/types'

export const Spinner = styled(ark.div, spinner)
export type SpinnerProps = ComponentProps<typeof Spinner>
