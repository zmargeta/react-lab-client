/** @type { import('@storybook/react-vite').Preview } */
import { sb } from 'storybook/test'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { GlobalStyles } from '../src/App.jsx'

sb.mock('../src/useGenres.js')
sb.mock('../src/useMovies.js')
sb.mock('../src/useMovie.js')

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },

    backgrounds: {
      default: 'default',
      options: {
        default: { name: 'default', value: '#232323' },
        app: { name: 'app', value: '#555' },
      },
    },
  },

  decorators: [withThemeFromJSXProvider({ GlobalStyles })],

  initialGlobals: {
    backgrounds: { value: 'default' },
  },
}

export default preview
