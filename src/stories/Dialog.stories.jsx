import React from 'react'
import Dialog from '../Dialog.jsx'
import MovieForm from '../MovieForm.jsx'
import { Default as DefaultMovieForm } from './MovieForm.stories.jsx'
import { fn } from 'storybook/test'
import ConfirmForm from '../ConfirmForm.jsx'

const meta = {
  title: 'Dialog',
  component: Dialog,
}

const AddMovie = {
  args: {
    title: 'Add Movie',
    visible: true,
    onHide: fn(),
  },
  render: (args) => (
    <Dialog {...args}>
      <MovieForm />
    </Dialog>
  ),
}

const EditMovie = {
  args: {
    title: 'Edit Movie',
    visible: true,
    onHide: fn(),
  },
  render: (args) => (
    <Dialog {...args}>
      <MovieForm {...DefaultMovieForm.args} />
    </Dialog>
  ),
}

const DeleteMovie = {
  args: {
    title: 'Delete Movie',
    visible: true,
    onHide: fn(),
  },
  render: (args) => (
    <Dialog {...args}>
      <ConfirmForm text={'Are you sure you want to delete this movie?'} />
    </Dialog>
  ),
}

export default meta
export { AddMovie, EditMovie, DeleteMovie }
