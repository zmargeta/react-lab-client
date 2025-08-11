import { useSWRConfig } from 'swr'
import axios from 'axios'
import { Movie } from './Converters.js'

const BaseUrl = import.meta.env.VITE_API_URL

const keyFilter = (key) => Array.isArray(key) && key[0] === '/api/movies'

const useAddMovieMutation = () => {
  const { mutate } = useSWRConfig()

  return (movie) =>
    axios
      .post('/movies', Movie.convert(movie), { baseURL: BaseUrl })
      .then((result) => Movie.inverse.convert(result.data))
      .then((addedMovie) =>
        mutate(keyFilter, undefined, { revalidate: true }).then(() => addedMovie)
      )
}

export default useAddMovieMutation
