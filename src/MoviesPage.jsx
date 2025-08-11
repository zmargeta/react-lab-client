import React, { Suspense } from 'react'
import ErrorBoundary from 'react-error-boundary'
import styled from 'styled-components'
import tmdbLogo from './assets/tmdb_logo.svg'
import GenreSelect from './GenreSelect.jsx'
import MovieTiles from './MovieTiles.jsx'
import { SortCriteria } from './SortCriteria.js'
import SortControl from './SortControl.jsx'
import LoadingIndicator from './LoadingIndicator.jsx'
import { Converter } from './Converters.js'
import { Outlet } from 'react-router-dom'
import useQueryParams from './useQueryParams.js'
import useNavigateWithQueryParams from './useNavigateWithQueryParams.js'
import useMovies from './useMovies.js'
import SearchTile from './SearchTile.jsx'

const Header = styled.header`
  --inherit-color-background: var(--tile-color-background);
  --inherit-height: var(--tile-header-height);
  --inherit-padding-horizontal: var(--tile-padding-horizontal);
  --inherit-padding-vertical: var(--tile-padding-vertical);

  --divider-color: var(--color-background);
  --divider-height: var(--tile-divider-height);
  --height: var(--inherit-height);

  background-color: var(--inherit-color-background);
  border-bottom: var(--divider-height) solid var(--divider-color);
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  min-height: var(--height);
  max-height: var(--height);
  overflow: hidden;
`

const Menu = styled.nav`
  --inherit-color-background: var(--tile-color-background);
  --inherit-height: var(--ui-control-height);

  --height: var(--inherit-height);
  --padding-horizontal: var(--tile-padding-horizontal);

  background-color: var(--inherit-color-background);
  border-bottom: var(--menu-border-height) solid var(--menu-border-color);
  display: flex;
  justify-content: space-between;
  margin: 0 var(--padding-horizontal);
  min-height: var(--height);
  max-height: var(--height);
`

const Content = styled.main`
  --inherit-padding-horizontal: var(--tile-padding-horizontal);
  --inherit-padding-vertical: var(--tile-padding-vertical);

  background-color: var(--inherit-color-background);
  margin: var(--inherit-padding-horizontal);
  max-width: var(--tile-max-width);
`

const Footer = styled.footer`
  align-items: center;
  background-color: var(--menu-border-color);
  color: var(--color-text-dimmed);
  display: flex;
  font-size: 0.625rem;
  font-weight: var(--font-weight-light);
  gap: var(--ui-control-gap);
  height: var(--tile-padding-horizontal);
  justify-content: center;

  & > a {
    // prettier-ignore
    background-image: url("${tmdbLogo}");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
    height: 15px;
    width: 100px;
  }
`

const P = { SearchTerm: 'q', ActiveGenre: 'genre', SortCriteria: 'sort_by' }
const F = { SearchTerm: null, ActiveGenre: 'All', SortCriteria: SortCriteria.Popularity }

const Genres = [F.ActiveGenre, 'Action', 'Documentary', 'Comedy', 'Crime', 'Fantasy', 'Horror']

const QueryParams = [
  {
    name: P.SearchTerm,
    fallback: F.SearchTerm,
    unset: [P.ActiveGenre, P.SortCriteria],
  },
  {
    name: P.ActiveGenre,
    fallback: F.ActiveGenre,
    converter: Converter(
      (value) => Genres.indexOf(value),
      (param) => Genres[param]
    ),
    deps: [P.SearchTerm],
    predicate: ([searchTerm]) => searchTerm === F.SearchTerm,
    unset: [P.SearchTerm],
  },
  {
    name: P.SortCriteria,
    fallback: F.SortCriteria,
    deps: [P.SearchTerm],
    predicate: ([searchTerm]) => searchTerm === F.SearchTerm,
    unset: [P.SearchTerm],
  },
]

const MoviesPage = () => {
  const [searchTerm, , activeGenre, setActiveGenre, sortCriteria, setSortCriteria] =
    useQueryParams(QueryParams)
  const [movies] = useMovies(searchTerm, activeGenre, sortCriteria, { suspense: true })
  const navigate = useNavigateWithQueryParams([P.SearchTerm, P.ActiveGenre, P.SortCriteria])

  return (
    <React.Fragment>
      <Header>
        <SearchTile />
      </Header>
      <Menu aria-label="movie-filters">
        <GenreSelect values={Genres} selected={activeGenre} onChange={setActiveGenre} />
        <SortControl value={sortCriteria} onChange={setSortCriteria} />
      </Menu>
      <Content>
        <ErrorBoundary fallback={<p>Something went wrong.</p>}>
          <Suspense fallback={<LoadingIndicator />}>
            <MovieTiles
              movies={movies}
              onSelectMovie={(it) => navigate(`/details/${it.id}`)}
              onEditMovie={(it) => navigate(`/edit/${it.id}`)}
              onDeleteMovie={(it) => navigate(`/delete/${it.id}`)}
            />
          </Suspense>
        </ErrorBoundary>
      </Content>
      <Footer>
        <span>POWERED BY</span>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" />
      </Footer>
      <Outlet />
    </React.Fragment>
  )
}

export default MoviesPage
export { P, QueryParams }
