// export { CloseButton, type CloseButtonProps } from './styled/close-button'


import { forwardRef } from "react";
// import { Center, styled } from "styled-system/jsx";
// import { Spinner } from './spinner'
import { Button as StyledButton, type ButtonProps as StyledButtonProps } from './styled/button'
import { MdClose } from 'react-icons/md';


// interface ButtonLoadingProps {
//   loading?: boolean
//   loadingText?: React.ReactNode
// }

export interface CloseButtonProps extends StyledButtonProps {}

export const CloseButton2 = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  const { disabled, children, ...rest } = props

  return (
    <StyledButton disabled={disabled} px="0" variant="ghost" ref={ref} {...rest}>
      {/* {loading && !loadingText ? (
        <>
          <ButtonSpinner />
          <styled.span opacity={0}>{children}</styled.span>
        </>
      ) : loadingText ? (
        loadingText
      ) : (
        children
      )} */}
      {children ? children : <MdClose />}
    </StyledButton>
  )
})

CloseButton2.displayName = 'CloseButton'


// const ButtonSpinner = () => (
//   <Center inline position="absolute" transform="translate(-50%, -50%)" top="[50%]" insetStart="[50%]">
//     <Spinner
//       width="1.1em"
//       height="1.1em"
//       borderWidth="1.5px"
//       borderTopColor="fg.disabled"
//       borderRightColor="fg.disabled"
//     />
//   </Center>
// )
