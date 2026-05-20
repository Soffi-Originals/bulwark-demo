export type Severity = 'sev1' | 'sev2' | 'sev3' | 'sev4'

export type IncidentStatus =
  | 'investigating'
  | 'identified'
  | 'monitoring'
  | 'resolved'

export type ResponderRole =
  | 'Incident Commander'
  | 'Comms Lead'
  | 'Scribe'
  | 'Subject Matter Expert'
  | 'Customer Liaison'

export interface Responder {
  id: string
  name: string
  role: ResponderRole
  team: string
  presence: 'online' | 'away' | 'offline' | 'oncall'
}

export type TimelineEventKind =
  | 'detected'
  | 'updated'
  | 'mitigation'
  | 'comms'
  | 'escalation'
  | 'resolved'

export interface TimelineEvent {
  id: string
  at: string
  author: string
  kind: TimelineEventKind
  message: string
}

export type CommsChannel = 'slack' | 'email' | 'status-page' | 'pager'

export interface CommsMessage {
  id: string
  author: string
  at: string
  channel: CommsChannel
  body: string
}

export interface Incident {
  id: string
  ref: string
  title: string
  summary: string
  severity: Severity
  status: IncidentStatus
  startedAt: string
  service: string
  commander: string
  affectedCustomers: number
  responders: Responder[]
  timeline: TimelineEvent[]
  comms: CommsMessage[]
}
