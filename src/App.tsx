import { useEffect, useState } from 'react'
import { TopBar } from './features/TopBar'
import { IncidentSidebar } from './features/incident/IncidentSidebar'
import { IncidentHeader } from './features/incident/IncidentHeader'
import { IncidentTimeline } from './features/incident/IncidentTimeline'
import { IncidentDetails } from './features/incident/IncidentDetails'
import { ResponderPanel } from './features/incident/ResponderPanel'
import { CommsPanel } from './features/incident/CommsPanel'
import { RecommendationCard } from './components/RecommendationCard'
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

          <div className="flex flex-1 min-h-0 gap-4 p-4 overflow-hidden">
            {/* Timeline — fills all remaining width */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
              <IncidentTimeline events={incident.timeline} />
            </div>

            {/* Incident Details — new middle panel */}
            <div className="flex flex-col w-[280px] shrink-0 overflow-hidden">
              <IncidentDetails incident={incident} />
            </div>

            {/* Right aside — responders, comms, recommendation */}
            <aside className="flex flex-col w-[300px] shrink-0 gap-4 overflow-y-auto overflow-x-hidden scrollbar-thin">
              <ResponderPanel responders={incident.responders} />
              <CommsPanel messages={incident.comms} />
              <RecommendationCard
                title="Alternatively, you can deploy to Medusa Cloud"
                description="Deploy and manage production-ready Medusa applications with zero-configuration deployments automatic scaling, GitHub integration, and more."
              />
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
