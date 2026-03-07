import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { evaluateProfile } from './engine-adapter/evaluateProfile'
import { projectProfile } from './engine-adapter/runProjection'
import { useSandboxData } from './lib/dataLoader'
import { DashboardPage } from './pages/DashboardPage'
import { DecisionPage } from './pages/DecisionPage'
import { GraphPage } from './pages/GraphPage'
import { ProfilesPage } from './pages/ProfilesPage'
import { ProjectionPage } from './pages/ProjectionPage'
import { ScenariosPage } from './pages/ScenariosPage'

const ROUTES = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/profiles', label: 'Profiles' },
  { path: '/decision', label: 'Decision' },
  { path: '/projection', label: 'Projection' },
  { path: '/scenarios', label: 'Scenarios' },
  { path: '/graph', label: 'Graph' },
]

function App() {
  const { profiles, scenarioProfiles, nodes, loading, error } = useSandboxData()
  const [selectedProfileId, setSelectedProfileId] = useState('')
  const [lastRun, setLastRun] = useState(null)
  const [projectionSteps, setProjectionSteps] = useState(5)
  const [projectionRun, setProjectionRun] = useState([])

  const selectedProfile = useMemo(
    () => profiles.find((profile) => profile.profile_id === selectedProfileId) ?? null,
    [profiles, selectedProfileId],
  )
  const nodesById = useMemo(
    () => Object.fromEntries(nodes.map((node) => [node.decision_id, node])),
    [nodes],
  )

  const runNow = () => {
    if (!selectedProfile) return
    setLastRun(evaluateProfile(selectedProfile, nodes))
  }

  const runProjectionNow = () => {
    if (!selectedProfile) return
    setProjectionRun(projectProfile(selectedProfile, nodes, projectionSteps))
  }

  if (loading) {
    return <div className="app-shell">Loading local sandbox data...</div>
  }

  if (error) {
    return <div className="app-shell">Failed to load local data: {error}</div>
  }

  return (
    <div className="app-shell">
      <header className="top-bar">
        <h1>WS3 Diagnostic UI Sandbox</h1>
        <div className="toolbar">
          <select
            value={selectedProfileId}
            onChange={(event) => setSelectedProfileId(event.target.value)}
          >
            <option value="">Select regression profile...</option>
            {profiles.map((profile) => (
              <option key={profile.profile_id} value={profile.profile_id}>
                {profile.profile_id}
              </option>
            ))}
          </select>
          <button onClick={runNow} disabled={!selectedProfile}>
            Run
          </button>
        </div>
        <nav className="route-nav">
          {ROUTES.map((route) => (
            <NavLink key={route.path} to={route.path}>
              {route.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage profile={selectedProfile} run={lastRun} />} />
          <Route
            path="/profiles"
            element={
              <ProfilesPage
                profiles={profiles}
                selectedProfileId={selectedProfileId}
                setSelectedProfileId={setSelectedProfileId}
              />
            }
          />
          <Route
            path="/decision"
            element={<DecisionPage run={lastRun} selectedProfile={selectedProfile} nodesById={nodesById} />}
          />
          <Route
            path="/projection"
            element={
              <ProjectionPage
                steps={projectionSteps}
                setSteps={setProjectionSteps}
                run={projectionRun}
                selectedProfile={selectedProfile}
                onRunProjection={runProjectionNow}
                nodesById={nodesById}
              />
            }
          />
          <Route
            path="/scenarios"
            element={<ScenariosPage scenarios={scenarioProfiles} nodes={nodes} />}
          />
          <Route path="/graph" element={<GraphPage nodes={nodes} nodeStates={lastRun?.node_states || []} />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
