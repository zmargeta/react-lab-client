import useSWR from 'swr'
import axios from 'axios'
import { GenreLookup } from './Converters.js'

const BaseUrl = import.meta.env.VITE_API_URL
const ApiKey = import.meta.env.VITE_API_KEY

const fetcher = () =>
  axios
    .get('/3/genre/movie/list', {
      baseURL: BaseUrl,
      headers: {
        Authorization: `Bearer ${ApiKey}`,
      },
    })
    .then((result) => GenreLookup.inverse.convert(result.data.genres))

const useGenre = (config) => {
  const { data, error, isLoading } = useSWR('/api/genres', fetcher, config)
  return [data, isLoading, error]
}

export default useGenre
