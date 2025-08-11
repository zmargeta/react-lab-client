import SortControl from '../SortControl.jsx'
import { fn } from 'storybook/test'
import { SortCriteria } from '../SortCriteria.js'
import { useArgs } from 'storybook/preview-api'

const meta = {
  title: 'SortControl',
  component: SortControl,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: {
        type: 'select',
        labels: {
          [SortCriteria.Popularity]: 'Popularity',
          [SortCriteria.ReleaseDate]: 'Release Date',
          [SortCriteria.Title]: 'Title',
        },
      },
      options: [SortCriteria.Popularity, SortCriteria.ReleaseDate, SortCriteria.Title],
    },
  },
}

const Default = {
  args: {
    value: SortCriteria.Popularity,
    onChange: fn(),
  },
  render: function Render(args) {
    const { onChange } = args
    const [{ value }, updateArgs] = useArgs()
    return (
      <SortControl
        {...args}
        value={value}
        onChange={(it) => {
          onChange?.(it)
          updateArgs({ value: it })
        }}
      />
    )
  },
}

export default meta
export { Default }
