import useSWR from 'swr'
import axios from 'axios'
import { Movie } from './Converters.js'

const BaseUrl = import.meta.env.VITE_API_URL
const ApiKey = import.meta.env.VITE_API_KEY

const fetcher = ([, movieId]) =>
  axios
    .get(`/3/movie/${movieId}`, {
      baseURL: BaseUrl,
      headers: {
        Authorization: `Bearer ${ApiKey}`,
      },
    })
    .then((result) => Movie.inverse.convert(result.data))

const useMovie = (movieId, config) => {
  const { data, error, isLoading } = useSWR(
    () => (movieId ? ['/api/movie', Number(movieId)] : null),
    fetcher,
    config
  )
  return [data, isLoading, error]
}

export default useMovie
