import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import SearchForm from './SearchForm'
import Button from './Button.jsx'
import { ButtonSize, ButtonVariant } from './ButtonStyles.js'
import backgroundUrl from './assets/background.jpg'
import useQueryParams from './useQueryParams.js'
import { P, QueryParams } from './MoviesPage.jsx'
import useNavigateWithQueryParams from './useNavigateWithQueryParams.js'

const StyledSearchTile = styled.section`
  --color-background: var(--inherit-color-background, var(--tile-color-background));
  --height: var(--inherit-height, var(--tile-header-height));

  background-color: var(--color-background);
  background-image: url('${(props) => props.$imageUrl}');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  min-height: var(--height);
  max-height: var(--height);
`

const GradientOverlay = styled.div`
  --padding-horizontal: var(--inherit-padding-horizontal, var(--tile-padding-horizontal));
  --padding-vertical: var(--inherit-padding-vertical, var(--tile-padding-vertical));

  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  position: relative;

  > :nth-child(1) {
    left: var(--padding-horizontal);
    position: absolute;
    top: var(--padding-vertical);
  }

  > :nth-child(2) {
    position: absolute;
    right: var(--padding-horizontal);
    top: var(--padding-vertical);
  }
`

const SearchTile = () => {
  const [searchTerm, setSearchTerm] = useQueryParams(QueryParams)
  const navigate = useNavigateWithQueryParams([P.ActiveGenre, P.SortCriteria])

  return (
    <StyledSearchTile $imageUrl={backgroundUrl}>
      <GradientOverlay>
        <Logo />
        <Button
          variant={ButtonVariant.Secondary}
          size={ButtonSize.Small}
          onClick={() => navigate('/add')}
        >
          + Add Movie
        </Button>
        <SearchForm value={searchTerm} onSubmit={setSearchTerm} />
      </GradientOverlay>
    </StyledSearchTile>
  )
}

export default SearchTile
