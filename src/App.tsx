import { useEffect, useState } from 'react'
import { TopBar } from './features/TopBar'
import { IncidentSidebar } from './features/incident/IncidentSidebar'
import { IncidentHeader } from './features/incident/IncidentHeader'
import { IncidentTimeline } from './features/incident/IncidentTimeline'
import { ResponderPanel } from './features/incident/ResponderPanel'
import { CommsPanel } from './features/incident/CommsPanel'
import { incidents as seedIncidents } from './features/incident/mockData'
import type { Incident, TimelineEvent } from './features/incident/types'

// Keep a mutable working copy of incidents so timeline state can grow.
const initialIncidents: Incident[] = seedIncidents.map((i) => ({ ...i, timeline: [...i.timeline] }))

export function App() {
  const [incidentList, setIncidentList] = useState<Incident[]>(initialIncidents)
  const [selectedId, setSelectedId] = useState(incidentList[0].id)
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.body.classList.contains('dark') ? 'dark' : 'light'
  )

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const incident = incidentList.find((i) => i.id === selectedId) ?? incidentList[0]

  function addTimelineEvent(event: TimelineEvent) {
    setIncidentList((prev) =>
      prev.map((inc) =>
        inc.id === incident.id
          ? { ...inc, timeline: [...inc.timeline, event] }
          : inc
      )
    )
  }

  return (
    <div className="flex flex-col h-full bg-canvas text-fg">
      <TopBar
        theme={theme}
        onToggleTheme={() =>
          setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
        }
      />

      <div className="flex flex-1 min-h-0">
        <IncidentSidebar
          incidents={incidentList}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <main className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <IncidentHeader incident={incident} />

          <div className="flex flex-1 min-h-0 gap-4 p-4 overflow-hidden">
            <div className="flex flex-col flex-1 min-w-0 gap-4 overflow-y-auto scrollbar-thin">
              <IncidentTimeline
                events={incident.timeline}
                onAddEvent={addTimelineEvent}
              />
            </div>

            <aside className="flex flex-col w-[340px] shrink-0 gap-4 overflow-hidden">
              <ResponderPanel responders={incident.responders} />
              <CommsPanel messages={incident.comms} />
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
