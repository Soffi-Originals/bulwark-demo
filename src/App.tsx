import { useEffect, useState } from 'react'
import { TopBar } from './features/TopBar'
import { IncidentSidebar } from './features/incident/IncidentSidebar'
import { IncidentHeader } from './features/incident/IncidentHeader'
import { IncidentTimeline } from './features/incident/IncidentTimeline'
import { ResponderPanel } from './features/incident/ResponderPanel'
import { CommsPanel } from './features/incident/CommsPanel'
import { incidents } from './features/incident/mockData'

export function App() {
  const [selectedId, setSelectedId] = useState(incidents[0].id)
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.body.classList.contains('dark') ? 'dark' : 'light'
  )

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const incident =
    incidents.find((i) => i.id === selectedId) ?? incidents[0]

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
          incidents={incidents}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <main className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <IncidentHeader incident={incident} />

          <div className="flex flex-col flex-1 min-h-0 gap-6 p-6 overflow-y-auto scrollbar-thin">
            <IncidentTimeline events={incident.timeline} />

            <div className="flex gap-6 min-h-0">
              <div className="flex flex-col w-[340px] shrink-0">
                <ResponderPanel responders={incident.responders} />
              </div>
              <div className="flex flex-col flex-1 min-w-0 min-h-0">
                <CommsPanel messages={incident.comms} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
