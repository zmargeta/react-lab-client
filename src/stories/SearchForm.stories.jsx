import SearchForm from '../SearchForm.jsx'
import { fn } from 'storybook/test'

const meta = {
  title: 'SearchForm',
  component: SearchForm,
  tags: ['autodocs'],
}

const Default = {
  args: {
    value: '',
    onSubmit: fn(),
  },
}

export default meta
export { Default }
