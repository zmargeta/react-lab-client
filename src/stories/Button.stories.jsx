import Button from '../Button.jsx'
import { fn } from 'storybook/test'
import { ButtonSize, ButtonVariant } from '../ButtonStyles.js'

const meta = {
  title: 'Button',
  component: Button,
  render: ({ label, ...args }) => <Button {...args}>{label}</Button>,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        labels: {
          [ButtonVariant.Default]: 'Default',
          [ButtonVariant.Primary]: 'Primary',
          [ButtonVariant.Secondary]: 'Secondary',
        },
      },
      options: [ButtonVariant.Default, ButtonVariant.Primary, ButtonVariant.Secondary],
    },
    size: {
      control: {
        type: 'select',
        labels: {
          [ButtonSize.ExtraSmall]: 'Extra Small',
          [ButtonSize.Small]: 'Small',
          [ButtonSize.Medium]: 'Medium',
          [ButtonSize.Large]: 'Large',
          [ButtonSize.ExtraLarge]: 'Extra Large',
        },
      },
      options: [
        ButtonSize.ExtraSmall,
        ButtonSize.Small,
        ButtonSize.Medium,
        ButtonSize.Large,
        ButtonSize.ExtraLarge,
      ],
    },
  },
}

const Default = {
  args: {
    label: '+ Add Movie',
    onClick: fn(),
  },
}

const Primary = {
  args: {
    label: 'Submit',
    variant: ButtonVariant.Primary,
    onClick: fn(),
  },
}

const Secondary = {
  args: {
    label: 'Submit',
    variant: ButtonVariant.Secondary,
    onClick: fn(),
  },
}

export default meta
export { Default, Primary, Secondary }
