import { Card } from '../../components/Card'
import { Badge } from '../../components/Badge'
import type { Incident } from './types'

interface IncidentDetailsProps {
  incident: Incident
}

const STATUS_LABEL: Record<Incident['status'], string> = {
  investigating: 'Investigating',
  identified: 'Identified',
  monitoring: 'Monitoring',
  resolved: 'Resolved',
}

const STATUS_TONE: Record<
  Incident['status'],
  'critical' | 'warning' | 'info' | 'success'
> = {
  investigating: 'critical',
  identified: 'warning',
  monitoring: 'info',
  resolved: 'success',
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-wider font-medium text-fg-muted">
        {label}
      </span>
      <div className="text-sm text-fg">{children}</div>
    </div>
  )
}

export function IncidentDetails({ incident }: IncidentDetailsProps) {
  return (
    <Card padding="none" className="flex flex-col overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b border-line shrink-0">
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold">Incident Details</h2>
          <p className="text-xs text-fg-muted">Structured metadata</p>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-4 py-4">
        <Row label="Reference">
          <span className="font-mono font-semibold">{incident.ref}</span>
        </Row>

        <Row label="Status">
          <Badge variant={STATUS_TONE[incident.status]}>
            {STATUS_LABEL[incident.status]}
          </Badge>
        </Row>

        <Row label="Severity">
          <Badge variant={incident.severity === 'sev1' ? 'critical' : incident.severity === 'sev2' ? 'warning' : 'info'}>
            {incident.severity.toUpperCase()}
          </Badge>
        </Row>

        <Row label="Service">
          <span className="font-mono text-xs bg-surface px-1.5 py-0.5 rounded border border-line">
            {incident.service}
          </span>
        </Row>

        <Row label="Started">
          <span className="font-mono text-sm">{incident.startedAt}</span>
        </Row>

        <Row label="Commander">
          <span>{incident.commander}</span>
        </Row>

        <Row label="Affected customers">
          <span className="text-critical font-semibold tabular-nums">
            {incident.affectedCustomers.toLocaleString()}
          </span>
        </Row>

        <Row label="Summary">
          <p className="text-sm text-fg leading-snug">{incident.summary}</p>
        </Row>

        <div className="border-t border-line" />

        <Row label="Responders">
          {incident.responders.length === 0 ? (
            <span className="text-fg-muted text-xs">No responders assigned</span>
          ) : (
            <ul className="flex flex-col gap-2 mt-1">
              {incident.responders.map((r) => (
                <li key={r.id} className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-fg">{r.name}</span>
                  <span className="text-xs text-fg-muted">
                    {r.role} &middot; {r.team}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Row>
      </div>
    </Card>
  )
}
