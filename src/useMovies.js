import useSWR from 'swr'
import axios from 'axios'
import useGenres from './useGenres.js'
import { Genre, Movie, SortCriteria } from './Converters.js'

const BaseUrl = import.meta.env.VITE_API_URL
const ApiKey = import.meta.env.VITE_API_KEY

const fetcher =
  (genreLookup) =>
  ([, args]) =>
    args.query
      ? axios
          .get('/3/search/movie', {
            baseURL: BaseUrl,
            headers: {
              Authorization: `Bearer ${ApiKey}`,
            },
            params: {
              query: args.query,
            },
          })
          .then((result) =>
            result.data.results?.map((item) => Movie.using({ genreLookup }).inverse.convert(item))
          )
      : axios
          .get('/3/discover/movie', {
            baseURL: BaseUrl,
            headers: {
              Authorization: `Bearer ${ApiKey}`,
            },
            params: {
              with_genres: Genre.using({ genreLookup }).convert(args.genre),
              sort_by: SortCriteria.convert(args.sortBy),
            },
          })
          .then((result) =>
            result.data.results?.map((item) => Movie.using({ genreLookup }).inverse.convert(item))
          )

const useMovies = (query, genre, sortBy, config) => {
  const [genreLookup, genresError] = useGenres(config)
  const { data, error, isLoading } = useSWR(
    () => (genreLookup ? ['/api/movies', { query, genre, sortBy }] : null),
    fetcher(genreLookup),
    config
  )
  return [data, isLoading, genresError ?? error]
}

export default useMovies
