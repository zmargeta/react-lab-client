import React from 'react'
import Dialog from './Dialog.jsx'
import ConfirmForm from './ConfirmForm.jsx'
import { P } from './MoviesPage.jsx'
import { useParams } from 'react-router-dom'
import useNavigateWithQueryParams from './useNavigateWithQueryParams.js'
import useDeleteMovieMutation from './useDeleteMovieMutation.js'
import useMovie from './useMovie.js'

const DeleteMoviePage = () => {
  const { movieId } = useParams()
  const [movie] = useMovie(movieId)
  const mutate = useDeleteMovieMutation()
  const navigate = useNavigateWithQueryParams([P.SearchTerm, P.ActiveGenre, P.SortCriteria])

  return (
    <Dialog title="Delete Movie" visible={true} onHide={() => navigate('..')}>
      <ConfirmForm
        text={`Are you sure you want to delete ${movie?.title ?? 'this movie'} (${movie?.releaseYear ?? 'N/A'})?`}
        onConfirm={() => mutate(movieId).then(() => navigate('..'))}
      />
    </Dialog>
  )
}

export default DeleteMoviePage
