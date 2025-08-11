import React from 'react'
import styled from 'styled-components'
import GlyphButton from './GlyphButton.jsx'
import glyphUrl from './assets/glyph_close.svg'

const StyledPopupMenu = styled.ul`
  align-items: stretch;
  background-color: var(--tile-color-background);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0 0 var(--ui-control-gap);
  max-width: max-content;

  > :nth-child(1) {
    align-self: flex-end;
  }
`

const PopupMenu = ({ visible = false, children, onHide }) =>
  visible ? (
    <StyledPopupMenu role="menu" onMouseLeave={onHide}>
      <GlyphButton imageUrl={glyphUrl} onClick={onHide} />
      {children}
    </StyledPopupMenu>
  ) : null

const StyledPopupMenuItem = styled.li`
  box-sizing: border-box;
  color: var(--color-text);
  cursor: pointer;
  display: block;
  font: inherit;
  min-width: var(--ui-control-min-width);
  padding: var(--ui-control-gap);
  text-align: left;
  text-transform: uppercase;

  &:hover {
    background-color: var(--color-primary);
  }
`

const PopupMenuItem = ({ children, onClick }) => (
  <StyledPopupMenuItem role="menuitem" onClick={onClick}>
    {children}
  </StyledPopupMenuItem>
)

export default PopupMenu
export { PopupMenuItem }
