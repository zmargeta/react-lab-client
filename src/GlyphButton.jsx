import React from 'react'
import styled from 'styled-components'

const StyledGlyphButton = styled.button`
  background-color: var(--tile-color-background);
  border: 0;
  border-radius: calc(0.5 * var(--ui-control-height-x-small));
  box-sizing: border-box;
  max-height: var(--ui-control-height-x-small);
  min-height: var(--ui-control-height-x-small);
  max-width: var(--ui-control-height-x-small);
  min-width: var(--ui-control-height-x-small);
  margin: 0;
  padding: 0;

  &:focus,
  &:focus-visible {
    outline: none;
  }
`

const Glyph = styled.div`
  background-color: var(--color-text);
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  margin: 0;
  max-height: var(--ui-control-height-x-small);
  min-height: var(--ui-control-height-x-small);
  max-width: var(--ui-control-height-x-small);
  min-width: var(--ui-control-height-x-small);
  // prettier-ignore
  mask-image: url("${(props) => props.$imageUrl}");
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: calc(0.33 * var(--ui-control-height-x-small));
  padding: 0;

  &:hover {
    background-color: var(--color-primary);
  }
`

const GlyphButton = ({ imageUrl, onClick }) => (
  <StyledGlyphButton onClick={onClick}>
    <Glyph $imageUrl={imageUrl} role="img" />
  </StyledGlyphButton>
)

export default GlyphButton
