import React from 'react'
import styled from 'styled-components'
import { ButtonSize, ButtonVariant } from './ButtonStyles.js'

const StyledButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--color-primary);
  border-radius: var(--ui-control-border-radius);
  box-sizing: border-box;
  display: block;
  color: var(--color-primary);
  cursor: pointer;
  font: inherit;
  font-weight: var(--font-weight-strong);
  height: var(--ui-control-height);
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
  max-width: max-content;
  min-width: var(--ui-control-min-width);
  padding: 0 var(--ui-control-gap);

  &:focus {
    text-decoration: underline;
  }

  &.primary {
    background-color: var(--color-primary);
    border: 0;
    color: var(--color-text);
  }

  &.secondary {
    background-color: var(--color-secondary);
    border: 0;
    color: var(--color-primary);
  }

  &.small {
    height: var(--ui-control-height-small);
  }

  &.x-small {
    height: var(--ui-control-height-x-small);
    min-width: auto;
    padding: 0 var(--ui-control-gap);
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }
`

const VariantStyle = {
  [ButtonVariant.Primary]: 'primary',
  [ButtonVariant.Secondary]: 'secondary',
}

const SizeStyle = {
  [ButtonSize.ExtraSmall]: 'x-small',
  [ButtonSize.Small]: 'small',
}

const Button = ({
  variant = ButtonVariant.Default,
  size = ButtonSize.Medium,
  children,
  onClick,
  ...props
}) => (
  <StyledButton
    {...props}
    onClick={onClick}
    className={[VariantStyle[variant], SizeStyle[size]].filter((it) => it ?? null).join(' ')}
  >
    {children}
  </StyledButton>
)

export default Button
