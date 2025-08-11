import PopupMenu, { PopupMenuItem } from '../PopupMenu.jsx'
import { fn } from 'storybook/test'

const meta = {
  title: 'PopupMenu',
  component: PopupMenu,
  tags: ['autodocs'],
  args: {
    visible: true,
  },
  render: ({ items, ...args }) => (
    <PopupMenu {...args}>
      {items.map((it) => (
        <PopupMenuItem>{it}</PopupMenuItem>
      ))}
    </PopupMenu>
  ),
}

const Default = {
  args: {
    items: ['Edit', 'Delete'],
    onHide: fn(),
  },
}

export default meta
export { Default }
