import React from 'react'
import Dialog from './Dialog.jsx'
import MovieForm from './MovieForm.jsx'
import { P } from './MoviesPage.jsx'
import { useParams } from 'react-router-dom'
import useMovie from './useMovie.js'
import useNavigateWithQueryParams from './useNavigateWithQueryParams.js'
import useEditMovieMutation from './useEditMovieMutation.js'

const EditMoviePage = () => {
  const { movieId } = useParams()
  const [movie] = useMovie(movieId)
  const mutate = useEditMovieMutation()
  const navigate = useNavigateWithQueryParams([P.SearchTerm, P.ActiveGenre, P.SortCriteria])

  return (
    <Dialog title="Edit Movie" visible={true} onHide={() => navigate('..')}>
      <MovieForm
        {...movie}
        onSubmit={(it) => mutate({ id: movie?.id, ...it }).then(() => navigate('..'))}
      />
    </Dialog>
  )
}

export default EditMoviePage
