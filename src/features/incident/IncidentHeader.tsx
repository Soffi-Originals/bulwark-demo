import {
  ShieldAlert,
  MoreHorizontal,
  ChevronDown,
} from 'lucide-react'
import { Button } from '../../components/Button'
import { SeverityBadge, StatusBadge } from './severity'
import type { Incident } from './types'

interface IncidentHeaderProps {
  incident: Incident
}

export function IncidentHeader({ incident }: IncidentHeaderProps) {
  return (
    <header className="flex items-center gap-4 px-6 py-4 border-b border-line bg-surface">
      <span className="text-xs font-mono text-fg-subtle shrink-0">{incident.ref}</span>

      <h1 className="text-sm font-semibold tracking-tight leading-tight truncate flex-1 min-w-0">
        {incident.title}
      </h1>

      <div className="flex items-center gap-2 shrink-0">
        <SeverityBadge severity={incident.severity} pulse size="sm" />
        <StatusBadge status={incident.status} size="sm" />
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Button variant="outline" size="sm" leftIcon={<ChevronDown className="size-4" />}>
          Update status
        </Button>
        <Button variant="destructive" size="sm" leftIcon={<ShieldAlert className="size-4" />}>
          Escalate
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="More actions">
          <MoreHorizontal className="size-4" />
        </Button>
      </div>
    </header>
  )
}
