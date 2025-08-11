import React from 'react'
import Dialog from './Dialog.jsx'
import MovieForm from './MovieForm.jsx'
import { P } from './MoviesPage.jsx'
import useNavigateWithQueryParams from './useNavigateWithQueryParams.js'
import useAddMovieMutation from './useAddMovieMutation.js'

const AddMoviePage = () => {
  const mutate = useAddMovieMutation()
  const navigate = useNavigateWithQueryParams([P.SearchTerm, P.ActiveGenre, P.SortCriteria])

  return (
    <Dialog title="Add Movie" visible={true} onHide={() => navigate('..')}>
      <MovieForm onSubmit={(it) => mutate(it).then(() => navigate('..'))} />
    </Dialog>
  )
}

export default AddMoviePage
