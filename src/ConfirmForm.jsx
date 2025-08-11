import React from 'react'
import styled from 'styled-components'
import Button from './Button.jsx'
import { ButtonSize, ButtonVariant } from './ButtonStyles.js'

const StyledConfirmForm = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;

  & > span {
    align-self: flex-start;
    color: var(--color-text);
    font: inherit;
    padding-bottom: 36px;
  }
`

const ConfirmForm = ({ text, onConfirm }) => (
  <StyledConfirmForm>
    <span>{text}</span>
    <Button variant={ButtonVariant.Primary} size={ButtonSize.Small} onClick={onConfirm}>
      Confirm
    </Button>
  </StyledConfirmForm>
)

export default ConfirmForm
