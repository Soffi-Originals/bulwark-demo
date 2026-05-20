import { UserPlus } from 'lucide-react'
import { Card } from '../../components/Card'
import { Button } from '../../components/Button'
import { Avatar } from '../../components/Avatar'
import { Badge } from '../../components/Badge'
import type { Responder } from './types'

const PRESENCE_LABEL: Record<Responder['presence'], { label: string; variant: 'success' | 'warning' | 'neutral' | 'critical' }> = {
  online: { label: 'Online', variant: 'success' },
  away: { label: 'Away', variant: 'warning' },
  offline: { label: 'Offline', variant: 'neutral' },
  oncall: { label: 'On-call', variant: 'critical' },
}

interface ResponderPanelProps {
  responders: Responder[]
}

export function ResponderPanel({ responders }: ResponderPanelProps) {
  return (
    <Card padding="none" className="flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-line">
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold">Responders</h2>
          <p className="text-xs text-fg-muted">
            {responders.length} on the response
          </p>
        </div>
        <Button size="sm" variant="secondary" leftIcon={<UserPlus className="size-3.5" />}>
          Page
        </Button>
      </div>

      <ul className="flex flex-col divide-y divide-line-subtle">
        {responders.length === 0 && (
          <li className="px-4 py-6 text-center text-sm text-fg-muted">
            No responders assigned.
          </li>
        )}
        {responders.map((r) => {
          const presence = PRESENCE_LABEL[r.presence]
          return (
            <li key={r.id} className="flex items-center gap-3 px-4 py-3">
              <Avatar name={r.name} size="md" status={r.presence} />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-medium truncate">{r.name}</span>
                <span className="text-xs text-fg-muted truncate">
                  {r.role} &middot; {r.team}
                </span>
              </div>
              <Badge variant={presence.variant} size="sm">
                {presence.label}
              </Badge>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
