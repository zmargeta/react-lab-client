import { useSWRConfig } from 'swr'
import axios from 'axios'
import { Movie } from './Converters.js'

const BaseUrl = import.meta.env.VITE_API_URL

const keyFilter = (editedMovie) => (key) =>
  Array.isArray(key) &&
  (key[0] === '/api/movies' || (key[0] === '/api/movie' && key[1] === editedMovie?.id))

const useEditMovieMutation = () => {
  const { mutate } = useSWRConfig()

  return (movie) =>
    axios
      .put('/movies', Movie.convert(movie), { baseURL: BaseUrl })
      .then((result) => Movie.inverse.convert(result.data))
      .then((editedMovie) =>
        mutate(keyFilter(editedMovie), undefined, { revalidate: true }).then(() => editedMovie)
      )
}

export default useEditMovieMutation
