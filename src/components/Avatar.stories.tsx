import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Core / Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Mira Okafor' },
}
export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {}
export const OnCall: Story = { args: { status: 'oncall' } }
export const Online: Story = { args: { status: 'online' } }
export const Away: Story = { args: { status: 'away' } }

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="A B" size="xs" />
      <Avatar name="A B" size="sm" />
      <Avatar name="A B" size="md" />
      <Avatar name="A B" size="lg" />
      <Avatar name="A B" size="xl" />
    </div>
  ),
}

export const Stack: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar name="Mira Okafor" className="ring-2 ring-canvas" />
      <Avatar name="Daniel Reyes" className="ring-2 ring-canvas" />
      <Avatar name="Priya Shah" className="ring-2 ring-canvas" />
      <Avatar name="Lucas Berg" className="ring-2 ring-canvas" />
    </div>
  ),
}
