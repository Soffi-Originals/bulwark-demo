import {
  AlertCircle,
  ArrowUpRight,
  Megaphone,
  MessageSquare,
  Wrench,
  CheckCircle2,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { Card } from '../../components/Card'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import type { TimelineEvent, TimelineEventKind } from './types'

const KIND_META: Record<
  TimelineEventKind,
  { icon: ComponentType<SVGProps<SVGSVGElement>>; tone: string }
> = {
  detected: { icon: AlertCircle, tone: 'text-critical bg-critical-subtle' },
  escalation: { icon: ArrowUpRight, tone: 'text-warning bg-warning-subtle' },
  updated: { icon: MessageSquare, tone: 'text-info bg-info-subtle' },
  comms: { icon: Megaphone, tone: 'text-accent bg-accent-subtle' },
  mitigation: { icon: Wrench, tone: 'text-brand bg-brand/10' },
  resolved: { icon: CheckCircle2, tone: 'text-success bg-success-subtle' },
}

interface IncidentTimelineProps {
  events: TimelineEvent[]
}

export function IncidentTimeline({ events }: IncidentTimelineProps) {
  return (
    <Card padding="none" className="flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-line">
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold">Timeline</h2>
          <p className="text-xs text-fg-muted">
            Authoritative record of the response
          </p>
        </div>
        <Button size="sm" variant="secondary">
          Export
        </Button>
      </div>

      <ol className="flex flex-col">
        {events.length === 0 && (
          <li className="px-4 py-8 text-center text-sm text-fg-muted">
            No events recorded yet.
          </li>
        )}
        {events.map((event, idx) => {
          const meta = KIND_META[event.kind]
          const Icon = meta.icon
          const last = idx === events.length - 1
          return (
            <li
              key={event.id}
              className="flex gap-3 px-4 py-3 relative"
            >
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`size-7 rounded-full flex items-center justify-center ${meta.tone}`}
                >
                  <Icon className="size-3.5" />
                </div>
                {!last && (
                  <div className="flex-1 w-px bg-line mt-1" aria-hidden />
                )}
              </div>
              <div className="flex flex-col gap-1 min-w-0 pb-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-fg-muted">{event.at}</span>
                  <span className="text-fg-subtle">&middot;</span>
                  <span className="font-medium text-fg">{event.author}</span>
                  <span className="text-fg-subtle uppercase tracking-wider text-[10px]">
                    {event.kind}
                  </span>
                </div>
                <p className="text-sm text-fg leading-snug">
                  {event.message}
                </p>
              </div>
            </li>
          )
        })}
      </ol>

      <div className="flex items-center gap-2 px-4 py-3 border-t border-line bg-surface-sunken/40">
        <Input
          size="sm"
          placeholder="Log an update to the timeline…"
          className="flex-1"
        />
        <Button size="sm" variant="primary">
          Log
        </Button>
      </div>
    </Card>
  )
}
