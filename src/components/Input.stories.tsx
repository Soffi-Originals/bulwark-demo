import type { Meta, StoryObj } from '@storybook/react'
import { Search } from 'lucide-react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Core / Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'Search incidents…' },
}
export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {}
export const WithIcon: Story = {
  args: { leftIcon: <Search className="size-3.5" /> },
}
export const Error: Story = { args: { state: 'error', defaultValue: 'invalid' } }
export const Success: Story = { args: { state: 'success', defaultValue: 'ok' } }
export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'disabled' },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[320px]">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
}
