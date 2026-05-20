import { Mail, MessageCircle, Radio, Bell } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { Card } from '../../components/Card'
import { Button } from '../../components/Button'
import { Avatar } from '../../components/Avatar'
import { Badge } from '../../components/Badge'
import type { CommsChannel, CommsMessage } from './types'

const CHANNEL_META: Record<
  CommsChannel,
  { label: string; icon: ComponentType<SVGProps<SVGSVGElement>> }
> = {
  slack: { label: 'Slack', icon: MessageCircle },
  email: { label: 'Email', icon: Mail },
  'status-page': { label: 'Status page', icon: Radio },
  pager: { label: 'Pager', icon: Bell },
}

interface CommsPanelProps {
  messages: CommsMessage[]
}

export function CommsPanel({ messages }: CommsPanelProps) {
  return (
    <Card padding="none" className="flex flex-col flex-1 min-h-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-line">
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold">Comms log</h2>
          <p className="text-xs text-fg-muted">
            Outbound customer + internal updates
          </p>
        </div>
        <Button size="sm" variant="primary">
          Compose
        </Button>
      </div>

      <ul className="flex flex-col divide-y divide-line-subtle overflow-y-auto scrollbar-thin">
        {messages.length === 0 && (
          <li className="px-4 py-6 text-center text-sm text-fg-muted">
            No external comms yet.
          </li>
        )}
        {messages.map((m) => {
          const meta = CHANNEL_META[m.channel]
          const Icon = meta.icon
          return (
            <li key={m.id} className="flex gap-3 px-4 py-3">
              <Avatar name={m.author} size="sm" />
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-medium text-fg">{m.author}</span>
                    <span className="text-fg-subtle font-mono">{m.at}</span>
                  </div>
                  <Badge variant="outline" size="sm" leftIcon={<Icon className="size-3" />}>
                    {meta.label}
                  </Badge>
                </div>
                <p className="text-sm text-fg-muted leading-snug">{m.body}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
