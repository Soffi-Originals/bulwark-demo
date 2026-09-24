import { Mail, MessageCircle, Radio, Bell } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { Card } from '../../components/Card'
import { Button } from '../../components/Button'
import { Avatar } from '../../components/Avatar'
import { Badge } from '../../components/Badge'
import type { CommsChannel, CommsMessage } from './types'

// Error-rate sparkline — mirrors the INC-2418 timeline: spike at deploy,
// peak during investigation, recovery after rollback begins at 14:21.
const ERROR_RATE_DATA: { time: string; rate: number }[] = [
  { time: '14:00', rate: 1.2 },
  { time: '14:02', rate: 5.3 },  // monitor triggers
  { time: '14:06', rate: 14.8 },
  { time: '14:10', rate: 18.4 }, // peak
  { time: '14:14', rate: 17.9 },
  { time: '14:18', rate: 16.2 },
  { time: '14:21', rate: 13.5 }, // rollback starts
  { time: '14:25', rate: 6.1 },
  { time: '14:27', rate: 2.4 },  // canary healthy
  { time: '14:30', rate: 1.0 },
]

function ErrorRateSparkline() {
  const W = 280
  const H = 64
  const PAD = { top: 6, right: 4, bottom: 20, left: 28 }
  const innerW = W - PAD.left - PAD.right
  const innerH = H - PAD.top - PAD.bottom

  const maxRate = 20
  const xStep = innerW / (ERROR_RATE_DATA.length - 1)

  const toX = (i: number) => PAD.left + i * xStep
  const toY = (v: number) => PAD.top + innerH - (v / maxRate) * innerH

  const linePath = ERROR_RATE_DATA.map((d, i) =>
    `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(d.rate).toFixed(1)}`
  ).join(' ')

  const areaPath =
    `${linePath} L ${toX(ERROR_RATE_DATA.length - 1).toFixed(1)} ${(PAD.top + innerH).toFixed(1)} L ${PAD.left.toFixed(1)} ${(PAD.top + innerH).toFixed(1)} Z`

  // Threshold line at 5% (where the monitor fires)
  const thresholdY = toY(5)

  // Colour transitions from critical (above threshold) to success (recovery)
  const recoveryPoint = ERROR_RATE_DATA.findIndex((d) => d.rate < 5)
  const gradientStop = ((recoveryPoint - 1) / (ERROR_RATE_DATA.length - 1) * 100).toFixed(0)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-4">
        <span className="text-xs font-medium text-fg">5xx error rate</span>
        <span className="text-xs font-mono text-fg-subtle">payments-api · last 30m</span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        aria-label="5xx error rate over the last 30 minutes"
        role="img"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="errFill" x1="0" x2="1" y1="0" y2="0">
            <stop offset={`${gradientStop}%`} stopColor="hsl(var(--color-critical))" stopOpacity="0.15" />
            <stop offset={`${gradientStop}%`} stopColor="hsl(var(--color-success))" stopOpacity="0.10" />
          </linearGradient>
          <linearGradient id="errLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset={`${gradientStop}%`} stopColor="hsl(var(--color-critical))" />
            <stop offset={`${gradientStop}%`} stopColor="hsl(var(--color-success))" />
          </linearGradient>
        </defs>

        {/* Threshold at 5% */}
        <line
          x1={PAD.left} y1={thresholdY}
          x2={W - PAD.right} y2={thresholdY}
          stroke="hsl(var(--color-warning))"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.6"
        />
        <text
          x={PAD.left - 2} y={thresholdY}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize="8"
          fill="hsl(var(--color-warning))"
          opacity="0.8"
        >5%</text>

        {/* Y-axis label */}
        {[0, 10, 20].map((v) => (
          <g key={v}>
            <line
              x1={PAD.left - 3} y1={toY(v)}
              x2={PAD.left} y2={toY(v)}
              stroke="hsl(var(--color-border))"
              strokeWidth="1"
            />
            <text
              x={PAD.left - 5} y={toY(v)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="8"
              fill="hsl(var(--color-fg-subtle))"
            >{v}%</text>
          </g>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#errFill)" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="url(#errLine)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* X-axis time labels — show first, middle, last */}
        {[0, 4, 9].map((i) => (
          <text
            key={i}
            x={toX(i)}
            y={H - 4}
            textAnchor="middle"
            fontSize="8"
            fill="hsl(var(--color-fg-subtle))"
          >
            {ERROR_RATE_DATA[i].time}
          </text>
        ))}
      </svg>
    </div>
  )
}

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

      <div>
        <Card padding="sm">
          <ErrorRateSparkline />
        </Card>
      </div>
    </Card>
  )
}
