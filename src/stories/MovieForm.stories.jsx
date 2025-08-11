import MovieForm from '../MovieForm.jsx'
import { fn } from 'storybook/test'

const meta = {
  title: 'MovieForm',
  component: MovieForm,
  tags: ['autodocs'],
}

const Default = {
  args: {
    imageUrl: 'https://www.themoviedb.org/t/p/w1280/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    title: 'Pulp Fiction',
    releaseYear: 1994,
    genres: ['Thriller', 'Crime', 'Comedy'],
    rating: 8.5,
    duration: 154,
    description: `A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer\
converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously\
trip back and forth in time.`,
    onSubmit: fn(),
  },
}

export default meta
export { Default }
