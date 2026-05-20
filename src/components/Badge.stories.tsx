import type { Meta, StoryObj } from '@storybook/react'
import { AlertOctagon, CheckCircle2, Eye } from 'lucide-react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Core / Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'SEV-1' },
}
export default meta

type Story = StoryObj<typeof Badge>

export const Sev1: Story = {
  args: {
    variant: 'sev1',
    leftIcon: <AlertOctagon className="size-3" />,
    children: 'SEV-1',
  },
}
export const Sev2: Story = { args: { variant: 'sev2', children: 'SEV-2' } }
export const Sev3: Story = { args: { variant: 'sev3', children: 'SEV-3' } }
export const Sev4: Story = { args: { variant: 'sev4', children: 'SEV-4' } }
export const Pulsing: Story = {
  args: {
    variant: 'sev1',
    pulse: true,
    leftIcon: <AlertOctagon className="size-3" />,
    children: 'SEV-1',
  },
}

export const Severities: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Badge variant="sev1" leftIcon={<AlertOctagon className="size-3" />}>
          SEV-1
        </Badge>
        <Badge variant="sev2">SEV-2</Badge>
        <Badge variant="sev3">SEV-3</Badge>
        <Badge variant="sev4">SEV-4</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="critical" leftIcon={<Eye className="size-3" />}>
          Investigating
        </Badge>
        <Badge variant="warning">Identified</Badge>
        <Badge variant="info">Monitoring</Badge>
        <Badge variant="success" leftIcon={<CheckCircle2 className="size-3" />}>
          Resolved
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <Badge size="sm">small</Badge>
        <Badge size="md">medium</Badge>
        <Badge size="lg">large</Badge>
      </div>
    </div>
  ),
}
