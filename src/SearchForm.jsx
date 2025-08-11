import React from 'react'
import styled from 'styled-components'
import Button from './Button.jsx'
import { ButtonVariant } from './ButtonStyles.js'

const StyledForm = styled.form`
  display: flex;
  gap: var(--ui-control-gap);

  > input {
    border: 0;
    border-radius: var(--ui-control-border-radius);
    box-sizing: border-box;
    display: block;
    font: inherit;
    font-weight: var(--font-weight-input);
    height: var(--ui-control-height);
    padding: 0;
  }

  > input:focus {
    outline: none;
  }

  > input[type='search'] {
    background-color: var(--color-background-input);
    color: var(--color-text-dimmed);
    line-height: var(--ui-control-height);
    padding-left: var(--ui-control-gap);
    width: 715px;
  }

  > input[type='search']::placeholder {
    color: var(--color-text-dimmed);
  }
`

const SearchForm = ({ value, onSubmit }) => (
  <StyledForm
    id="movie-search"
    aria-label="movie-search"
    key={value}
    onSubmit={(e) => {
      e.preventDefault()

      if (onSubmit) {
        const formData = new FormData(e.target)
        onSubmit(formData.get('search_term'))
      }
    }}
  >
    <input
      id="search-term"
      name="search_term"
      type="search"
      placeholder="What do you want to watch?"
      defaultValue={value}
    />
    <Button variant={ButtonVariant.Primary}>Search</Button>
  </StyledForm>
)

export default SearchForm
