import {
  AlertOctagon,
  AlertTriangle,
  Info,
  CircleDot,
  CheckCircle2,
  Eye,
  Search,
  Wrench,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { Badge } from '../../components/Badge'
import type { IncidentStatus, Severity } from './types'

type Variant = Parameters<typeof Badge>[0]['variant']

const SEV_META: Record<
  Severity,
  { label: string; variant: Variant; icon: ComponentType<SVGProps<SVGSVGElement>> }
> = {
  sev1: { label: 'SEV-1', variant: 'sev1', icon: AlertOctagon },
  sev2: { label: 'SEV-2', variant: 'sev2', icon: AlertTriangle },
  sev3: { label: 'SEV-3', variant: 'sev3', icon: CircleDot },
  sev4: { label: 'SEV-4', variant: 'sev4', icon: Info },
}

const STATUS_META: Record<
  IncidentStatus,
  { label: string; variant: Variant; icon: ComponentType<SVGProps<SVGSVGElement>> }
> = {
  investigating: { label: 'Investigating', variant: 'critical', icon: Search },
  identified: { label: 'Identified', variant: 'warning', icon: Eye },
  monitoring: { label: 'Monitoring', variant: 'info', icon: Wrench },
  resolved: { label: 'Resolved', variant: 'success', icon: CheckCircle2 },
}

interface SeverityBadgeProps {
  severity: Severity
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
}

export function SeverityBadge({
  severity,
  size = 'md',
  pulse,
}: SeverityBadgeProps) {
  const meta = SEV_META[severity]
  const Icon = meta.icon
  return (
    <Badge
      variant={meta.variant}
      size={size}
      pulse={pulse && severity === 'sev1'}
      leftIcon={<Icon className="size-3" aria-hidden />}
    >
      {meta.label}
    </Badge>
  )
}

interface StatusBadgeProps {
  status: IncidentStatus
  size?: 'sm' | 'md' | 'lg'
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const meta = STATUS_META[status]
  const Icon = meta.icon
  return (
    <Badge
      variant={meta.variant}
      size={size}
      leftIcon={<Icon className="size-3" aria-hidden />}
    >
      {meta.label}
    </Badge>
  )
}
