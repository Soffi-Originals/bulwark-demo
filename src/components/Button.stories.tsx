import type { Meta, StoryObj } from '@storybook/react'
import { ShieldAlert, Plus, ArrowRight } from 'lucide-react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Core / Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Acknowledge',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline', 'destructive', 'subtle'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon', 'icon-sm'],
    },
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { variant: 'primary' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Outline: Story = { args: { variant: 'outline' } }
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Escalate',
    leftIcon: <ShieldAlert className="size-4" />,
  },
}
export const Loading: Story = {
  args: { variant: 'primary', loading: true, children: 'Saving' },
}
export const Disabled: Story = { args: { disabled: true } }
export const WithIcons: Story = {
  args: {
    leftIcon: <Plus className="size-4" />,
    rightIcon: <ArrowRight className="size-4" />,
    children: 'Declare incident',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex items-center gap-2">
        <Button>Default</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  ),
}
