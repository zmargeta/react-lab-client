import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import glyphUrl from './assets/glyph_close.svg'
import GlyphButton from './GlyphButton.jsx'

const StyledDialog = styled.dialog`
  border: 0;
  padding: 0;

  &::backdrop {
    background-color: var(--tile-color-background);
    opacity: var(--modal-backdrop-opacity);
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }
`

const Container = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  background-color: var(--tile-color-background);
  box-sizing: border-box;
  min-height: var(--modal-min-height);
  min-width: var(--modal-min-width);
  max-width: calc(var(--tile-width) - 2 * var(--tile-padding-horizontal));

  > :nth-child(1) {
    margin: 0;
    align-self: flex-end;
  }

  > :nth-child(2),
  > :nth-child(3) {
    margin: 0 var(--tile-padding-horizontal) calc(2 * var(--tile-padding-vertical));
  }
`

const Title = styled.h1`
  color: var(--color-text);
  font-size: 1.5rem;
  font-weight: var(--font-weight);
  margin: 0;
  padding: 0;
  text-transform: uppercase;
`

const Dialog = ({ title, visible = false, children, onHide }) => {
  const dialogRef = useRef(null)

  useEffect(
    () => (visible ? dialogRef.current?.showModal() : dialogRef.current?.close()),
    [visible]
  )

  return (
    <StyledDialog
      ref={dialogRef}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          onHide?.(e)
        }
      }}
    >
      <Container>
        <GlyphButton imageUrl={glyphUrl} onClick={(e) => onHide?.(e)} />
        {title ? <Title>{title}</Title> : undefined}
        {children}
      </Container>
    </StyledDialog>
  )
}

export default Dialog
