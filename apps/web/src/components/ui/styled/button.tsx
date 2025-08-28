import { ark } from '@ark-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { button } from 'styled-system/recipes'
// import type { ComponentProps } from 'styled-system/jsx'
import type { ComponentProps } from 'styled-system/types';

export const Button = styled(ark.button, button);
export type ButtonProps = ComponentProps<typeof Button> 