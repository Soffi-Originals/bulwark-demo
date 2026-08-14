import { Search, Filter, Plus } from 'lucide-react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { cn } from '../../lib/cn'
import { SeverityBadge } from './severity'
import type { Incident } from './types'

interface IncidentSidebarProps {
  incidents: Incident[]
  selectedId: string
  onSelect: (id: string) => void
}

export function IncidentSidebar({
  incidents,
  selectedId,
  onSelect,
}: IncidentSidebarProps) {
  return (
    <aside className="flex flex-col w-[280px] shrink-0 border-r border-line bg-surface">
      <div className="flex items-center justify-between px-5 py-4 border-b border-line">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-sm font-semibold tracking-tight">Active</h2>
          <p className="text-xs text-fg-muted">
            {incidents.filter((i) => i.status !== 'resolved').length} open
            &middot; {incidents.length} total
          </p>
        </div>
        <Button size="icon-sm" variant="primary" aria-label="Declare incident">
          <Plus className="size-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 px-5 py-3 border-b border-line">
        <Input
          size="sm"
          placeholder="Search incidents…"
          leftIcon={<Search className="size-3.5" />}
        />
        <Button size="icon-sm" variant="outline" aria-label="Filter">
          <Filter className="size-4" />
        </Button>
      </div>

      <div className="flex flex-col overflow-y-auto scrollbar-thin">
        {incidents.map((incident) => {
          const selected = incident.id === selectedId
          return (
            <button
              key={incident.id}
              onClick={() => onSelect(incident.id)}
              className={cn(
                'flex flex-col gap-2 px-5 py-4 text-left border-b border-line-subtle',
                'transition-colors',
                'hover:bg-surface-sunken/60 focus-visible:outline-none focus-visible:bg-surface-sunken',
                selected &&
                  'bg-surface-sunken border-l-2 border-l-brand pl-[18px]'
              )}
              aria-current={selected ? 'true' : undefined}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium leading-snug text-fg line-clamp-2 flex-1 min-w-0">
                  {incident.title}
                </p>
                <SeverityBadge severity={incident.severity} size="sm" />
              </div>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
