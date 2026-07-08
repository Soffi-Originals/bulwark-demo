import {
  AlertCircle,
  ArrowUpRight,
  Megaphone,
  MessageSquare,
  Wrench,
  CheckCircle2,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Card } from '../../components/Card'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import type { TimelineEvent, TimelineEventKind } from './types'

function nowUtc() {
  const d = new Date()
  return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`
}

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
  onAddEvent?: (event: TimelineEvent) => void
}

/** Tracks which event IDs have already played their resolved animation. */
function useResolvedSet(events: TimelineEvent[]) {
  // Seed with IDs that are resolved on first render — they animate in on mount.
  const [seenIds, setSeenIds] = useState<Set<string>>(
    () => new Set(events.filter((e) => e.kind === 'resolved').map((e) => e.id))
  )
  const prevIdsRef = useRef<Set<string>>(seenIds)

  useEffect(() => {
    const incoming = events.filter((e) => e.kind === 'resolved').map((e) => e.id)
    const newOnes = incoming.filter((id) => !prevIdsRef.current.has(id))
    if (newOnes.length > 0) {
      setSeenIds((prev) => new Set([...prev, ...newOnes]))
      prevIdsRef.current = new Set([...prevIdsRef.current, ...newOnes])
    }
  }, [events])

  return seenIds
}

export function IncidentTimeline({ events, onAddEvent }: IncidentTimelineProps) {
  const resolvedSet = useResolvedSet(events)
  const [logText, setLogText] = useState('')

  function handleLog() {
    const text = logText.trim()
    if (!text || !onAddEvent) return
    onAddEvent({
      id: `t-${Date.now()}`,
      at: nowUtc(),
      author: 'You',
      kind: 'updated',
      message: text,
    })
    setLogText('')
  }

  function handleResolve() {
    if (!onAddEvent) return
    onAddEvent({
      id: `t-${Date.now()}`,
      at: nowUtc(),
      author: 'You',
      kind: 'resolved',
      message: logText.trim() || 'Incident resolved.',
    })
    setLogText('')
  }

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
          const isResolved = event.kind === 'resolved' && resolvedSet.has(event.id)

          return (
            <li
              key={event.id}
              className={`flex gap-3 px-4 py-3 relative rounded-sm transition-colors ${
                isResolved ? 'animate-resolve-wash' : ''
              }`}
            >
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`size-7 rounded-full flex items-center justify-center ${meta.tone} ${
                    isResolved ? 'animate-resolve-pop animate-check-draw' : ''
                  }`}
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
          value={logText}
          onChange={(e) => setLogText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLog()}
        />
        <Button size="sm" variant="secondary" onClick={handleResolve}>
          Resolve
        </Button>
        <Button size="sm" variant="primary" onClick={handleLog}>
          Log
        </Button>
      </div>
    </Card>
  )
}
