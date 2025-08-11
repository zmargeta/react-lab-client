import React from 'react'
import MoviesPage from './MoviesPage.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { transparentize } from 'polished'
import MovieDetailsPage from './MovieDetailsPage.jsx'
import AddMoviePage from './AddMoviePage.jsx'
import EditMoviePage from './EditMoviePage.jsx'
import DeleteMoviePage from './DeleteMoviePage.jsx'

const GlobalStyles = createGlobalStyle`
  :root {
    --color-background: #555;
    --color-background-input: ${transparentize(0.2, '#323232')};
    --color-text: #fff;
    --color-text-dimmed: ${transparentize(0.5, '#ffffff')};
    --color-primary: #f65261;
    --color-secondary: ${transparentize(0.3, '#606060')};
    --font-family: Montserrat, Helvetica, Arial, sans-serif;
    --font-size: 1rem;
    --font-weight: 200;
    --font-weight-input: 200;
    --font-weight-light: 100;
    --font-weight-strong: 400;

    --tile-color-background: #232323;
    --tile-divider-height: 10px;
    --tile-header-height: 540px;
    --tile-padding-horizontal: 50px;
    --tile-padding-vertical: 20px;
    --tile-width: 1320px;

    --menu-border-color: #424242;
    --menu-border-height: 2px;

    --modal-min-height: 350px;
    --modal-min-width: 700px;
    --modal-backdrop-opacity: 0.5;

    --ui-control-border-radius: 6px;
    --ui-control-gap: 14px;
    --ui-control-height: 55px;
    --ui-control-height-small: 45px;
    --ui-control-height-x-small: 36px;
    --ui-control-min-width: 180px;

    --poster-height: calc(var(--poster-width) / 2 * 3);
    --poster-width: 280px;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-text);
    font-family: var(--font-family);
    font-size: var(--font-size);
    font-weight: var(--font-weight);

    strong {
      font-weight: var(--font-weight-strong);
    }
  }

  #root {
    background-color: var(--tile-color-background);
    display: flex;
    flex-direction: column;
    margin: var(--tile-padding-horizontal) auto;
    min-width: var(--tile-width);
    max-width: var(--tile-width);
  }
`

const App = () => (
  <React.Fragment>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesPage />}>
          <Route path="details/:id" element={<MovieDetailsPage />} />
          <Route path="add" element={<AddMoviePage />} />
          <Route path="edit/:movieId" element={<EditMoviePage />} />
          <Route path="delete/:movieId" element={<DeleteMoviePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.Fragment>
)

export default App
export { GlobalStyles }
