import { SortCriteria as SortCriteriaModel } from './SortCriteria.js'

const BaseUrl = import.meta.env.VITE_IMG_URL
const DateFormat = new Intl.DateTimeFormat('en-CA')

const Converter = (convert, inverse) => {
  return Object.freeze({
    convert: convert,
    inverse: {
      convert: inverse,
    },
    using(context) {
      return Converter(
        (...args) => this.convert(...args, context),
        (...args) => this.inverse.convert(...args, context)
      )
    },
  })
}

Converter.Identity = Converter(
  (it) => it,
  (it) => it
)

const ImageUrl = Converter(
  (val) => val?.replace(/^.*\//i, '/'),
  (dto) => (dto ? `${BaseUrl}/t/p/w300${dto}` : undefined)
)

const GenreLookup = Converter(
  (val) => val?.entries().map(([id, name]) => ({ id, name })),
  (dto) => dto?.reduce((map, obj) => map.set(obj.id, obj.name), new Map())
)

const Genre = Converter(
  (val, { genreLookup = new Map() }) =>
    val !== 'All'
      ? genreLookup.entries().find(([, name]) => name?.toLowerCase() === val?.toLowerCase())?.[0]
      : undefined,
  (dto, { genreLookup = new Map() }) => genreLookup.get(dto)
)

const ReleaseYear = Converter(
  (val) => (val ? DateFormat.format(new Date(val.toString())) : undefined),
  (dto) => (dto ? new Date(dto).getFullYear() : undefined)
)

const SortCriteria = Converter(
  (val) => {
    let dto = undefined
    switch (Number(val)) {
      case SortCriteriaModel.Popularity:
        dto = 'popularity.desc'
        break
      case SortCriteriaModel.ReleaseDate:
        dto = 'primary_release_date.desc'
        break
      case SortCriteriaModel.Title:
        dto = 'original_title.asc'
    }
    return dto
  },
  (dto) => {
    let val = undefined
    switch (dto) {
      case 'popularity.desc':
        val = SortCriteriaModel.Popularity
        break
      case 'primary_release_date.desc':
        val = SortCriteriaModel.ReleaseDate
        break
      case 'original_title.asc':
        val = SortCriteriaModel.Title
    }
    return val
  }
)

const Movie = Converter(
  ({ id, imageUrl, title, rating, genres, releaseYear, duration, description }, context) => ({
    id,
    poster_path: ImageUrl.convert(imageUrl),
    title,
    vote_average: rating,
    genres,
    genre_ids: genres
      ?.map((item) => Genre.using(context).convert(item))
      .filter((item) => item ?? null),
    release_date: ReleaseYear.convert(releaseYear),
    runtime: duration,
    overview: description,
  }),
  (
    { id, poster_path, title, vote_average, genre_ids, genres, release_date, runtime, overview },
    context
  ) => ({
    id,
    imageUrl: ImageUrl.inverse.convert(poster_path),
    title,
    rating: vote_average?.toFixed(1),
    genres:
      genres?.map((item) => item.name) ??
      genre_ids
        ?.map((item) => Genre.using(context).inverse.convert(item))
        .filter((item) => item ?? null),
    releaseYear: ReleaseYear.inverse.convert(release_date),
    duration: runtime,
    description: overview,
  })
)

export { Converter, GenreLookup, Genre, ImageUrl, Movie, ReleaseYear, SortCriteria }
