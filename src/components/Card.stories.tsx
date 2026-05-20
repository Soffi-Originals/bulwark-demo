import type { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card'
import { Button } from './Button'
import { Badge } from './Badge'

const meta: Meta<typeof Card> = {
  title: 'Core / Card',
  component: Card,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-[360px]">
      <CardHeader>
        <CardTitle>Runbook: Payments API rollback</CardTitle>
        <CardDescription>
          Owner: Payments &middot; Last verified 4 days ago
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-fg-muted">
          Step-by-step rollback procedure for the payments-api service.
        </p>
      </CardContent>
      <CardFooter>
        <Badge variant="success" size="sm">
          Verified
        </Badge>
        <Button size="sm" variant="secondary">
          Open
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const Raised: Story = {
  render: () => (
    <Card variant="raised" className="w-[360px]">
      <CardHeader>
        <CardTitle>Raised card</CardTitle>
        <CardDescription>Used for floating panels</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-fg-muted">Subtle elevation via shadow.</p>
      </CardContent>
    </Card>
  ),
}

export const Critical: Story = {
  render: () => (
    <Card variant="critical" className="w-[360px]">
      <CardHeader>
        <CardTitle className="text-critical">Action required</CardTitle>
        <CardDescription>Postmortem due in 2 days</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-fg-muted">
          The postmortem for INC-2418 has not been started.
        </p>
      </CardContent>
    </Card>
  ),
}
