import MovieTiles from '../MovieTiles.jsx'
import { fn } from 'storybook/test'

const meta = {
  title: 'MovieTiles',
  component: MovieTiles,
  tags: ['autodocs'],
}

const Default = {
  args: {
    movies: [
      {
        id: '01K0BXE5JXTNMW82B3GFANGJJX',
        imageUrl: 'https://www.themoviedb.org/t/p/w1280/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
        title: 'Pulp Fiction',
        releaseYear: 1994,
        genres: ['Thriller', 'Crime', 'Comedy'],
      },
      {
        id: '01K0BXEPAM3TD2Y5ADA0N79X2V',
        imageUrl: 'https://www.themoviedb.org/t/p/w1280/6d5XOczc226jECq0LIX0siKtgHR.jpg',
        title: 'No Country for Old Men',
        releaseYear: 2007,
        genres: ['Crime', 'Drama', 'Thriller'],
      },
      {},
    ],
    onSelectMovie: fn(),
    onEditMovie: fn(),
    onDeleteMovie: fn(),
  },
}

export default meta
export { Default }
