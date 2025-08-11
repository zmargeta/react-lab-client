import React from 'react'
import styled from 'styled-components'
import { SortCriteria } from './SortCriteria.js'

const StyledSortControl = styled.label`
  --height: var(--inherit-height, var(--ui-control-height));

  background-color: var(--inherit-color-background);
  display: flex;
  color: var(--color-text-dimmed);
  font-weight: var(--font-weight-light);
  gap: var(--ui-control-gap);
  height: var(--height);
  line-height: var(--height);
  text-transform: uppercase;

  > select {
    align-items: center;
    background-color: transparent;
    border: 0;
    color: var(--color-text);
    cursor: pointer;
    font: inherit;
    line-height: inherit;
    outline: none;
    text-transform: uppercase;
  }
`

const SortControl = ({ value = SortCriteria.Popularity, onChange }) => (
  <StyledSortControl>
    Sort by
    <select
      id="sort-criteria"
      name="sort_criteria"
      aria-label="sort-criteria"
      value={value}
      onChange={(e) => {
        const newValue = Number(e.target.value)

        if (value !== newValue) {
          onChange?.(newValue)
        }
      }}
    >
      <option value={SortCriteria.Popularity}>Popularity</option>
      <option value={SortCriteria.ReleaseDate}>Release Date</option>
      <option value={SortCriteria.Title}>Title</option>
    </select>
  </StyledSortControl>
)

export default SortControl
