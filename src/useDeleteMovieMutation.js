import { useSWRConfig } from 'swr'
import axios from 'axios'

const BaseUrl = import.meta.env.VITE_API_URL

const keyFilter = (movieId) => (key) =>
  Array.isArray(key) &&
  (key[0] === '/api/movies' || (key[0] === '/api/movie' && key[1] === movieId))

const useDeleteMovieMutation = () => {
  const { mutate } = useSWRConfig()

  return (movieId) =>
    axios
      .delete(`/movies/${movieId}`, { baseURL: BaseUrl })
      .then((res) => res.status)
      .then(() => mutate(keyFilter(movieId), undefined, { revalidate: true }))
}

export default useDeleteMovieMutation
