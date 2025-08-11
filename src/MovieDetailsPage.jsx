import React from 'react'
import Dialog from './Dialog.jsx'
import MovieDetails from './MovieDetails.jsx'
import { P } from './MoviesPage.jsx'
import { useParams } from 'react-router-dom'
import useNavigateWithQueryParams from './useNavigateWithQueryParams.js'
import useMovie from './useMovie.js'

const MovieDetailsPage = () => {
  const { id } = useParams()
  const [movie] = useMovie(id, { suspense: true })
  const navigate = useNavigateWithQueryParams([P.SearchTerm, P.ActiveGenre, P.SortCriteria])

  return (
    <Dialog visible={true} onHide={() => navigate('..')}>
      <MovieDetails {...movie} />
    </Dialog>
  )
}

export default MovieDetailsPage
