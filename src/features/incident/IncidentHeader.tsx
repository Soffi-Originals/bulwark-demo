import {
  Activity,
  Clock,
  Server,
  Users,
  ShieldAlert,
  MoreHorizontal,
  ChevronDown,
} from 'lucide-react'
import { Button } from '../../components/Button'
import { Avatar } from '../../components/Avatar'
import { SeverityBadge, StatusBadge } from './severity'
import type { Incident } from './types'

interface IncidentHeaderProps {
  incident: Incident
}

export function IncidentHeader({ incident }: IncidentHeaderProps) {
  return (
    <header className="flex flex-col gap-4 px-6 py-5 border-b border-line bg-surface">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-center gap-2 text-xs text-fg-muted font-mono">
            <span>{incident.ref}</span>
            <span className="text-fg-subtle">/</span>
            <span>{incident.service}</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight leading-tight">
            {incident.title}
          </h1>
          <p className="text-sm text-fg-muted max-w-2xl">
            {incident.summary}
          </p>
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
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <SeverityBadge severity={incident.severity} pulse />
        <StatusBadge status={incident.status} />
        <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted px-2 py-1 border border-line rounded-md bg-surface-sunken">
          <Clock className="size-3.5" /> Started {incident.startedAt}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted px-2 py-1 border border-line rounded-md bg-surface-sunken">
          <Server className="size-3.5" /> {incident.service}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted px-2 py-1 border border-line rounded-md bg-surface-sunken">
          <Users className="size-3.5" />{' '}
          {incident.affectedCustomers.toLocaleString()} customers impacted
        </span>
        <span className="inline-flex items-center gap-2 ml-auto text-xs text-fg-muted">
          <Activity className="size-3.5 text-critical" />
          <span className="font-mono">live</span>
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 pt-2 border-t border-line-subtle">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider text-fg-subtle">
            Commander
          </span>
          <div className="flex items-center gap-2">
            <Avatar name={incident.commander} size="sm" status="oncall" />
            <span className="text-sm font-medium">{incident.commander}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider text-fg-subtle">
            Responders
          </span>
          <div className="flex -space-x-2">
            {incident.responders.slice(0, 5).map((r) => (
              <Avatar
                key={r.id}
                name={r.name}
                size="sm"
                className="ring-2 ring-surface"
              />
            ))}
            {incident.responders.length > 5 && (
              <span className="size-6 inline-flex items-center justify-center rounded-full bg-surface-sunken border border-line text-[10px] font-medium ring-2 ring-surface">
                +{incident.responders.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
