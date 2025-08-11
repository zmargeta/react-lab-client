import MovieTile from '../MovieTile.jsx'
import { fn } from 'storybook/test'

const meta = {
  title: 'MovieTile',
  component: MovieTile,
  tags: ['autodocs'],
}

const Default = {
  args: {
    imageUrl: 'https://www.themoviedb.org/t/p/w1280/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    title: 'Pulp Fiction',
    releaseYear: 1994,
    genres: ['Thriller', 'Crime', 'Comedy'],
    onClick: fn(),
    onEditMovie: fn(),
    onDeleteMovie: fn(),
  },
}

const Unavailable = {
  args: {
    onClick: fn(),
    onEditMovie: fn(),
    onDeleteMovie: fn(),
  },
}

export default meta
export { Default, Unavailable }
