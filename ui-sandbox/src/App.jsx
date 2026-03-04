import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { runEvaluator, runProjection } from './lib/evaluator'
import { useSandboxData } from './lib/dataLoader'
import { DecisionPage } from './pages/DecisionPage'
import { GraphPage } from './pages/GraphPage'
import { ProfilesPage } from './pages/ProfilesPage'
import { ProjectionPage } from './pages/ProjectionPage'

const ROUTES = [
  { path: '/profiles', label: 'Profiles' },
  { path: '/decision', label: 'Decision' },
  { path: '/projection', label: 'Projection' },
  { path: '/graph', label: 'Graph' },
]

function App() {
  const { profiles, nodes, loading, error } = useSandboxData()
  const [selectedProfileId, setSelectedProfileId] = useState('')
  const [lastRun, setLastRun] = useState(null)
  const [projectionSteps, setProjectionSteps] = useState(5)
  const [projectionRun, setProjectionRun] = useState([])

  const selectedProfile = useMemo(
    () => profiles.find((profile) => profile.profile_id === selectedProfileId) ?? null,
    [profiles, selectedProfileId],
  )

  const runNow = () => {
    if (!selectedProfile) return
    setLastRun(runEvaluator(selectedProfile, nodes))
  }

  const runProjectionNow = () => {
    if (!selectedProfile) return
    setProjectionRun(runProjection(selectedProfile, nodes, projectionSteps))
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
            element={<DecisionPage run={lastRun} selectedProfile={selectedProfile} />}
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
              />
            }
          />
          <Route path="/graph" element={<GraphPage nodes={nodes} />} />
          <Route path="*" element={<Navigate to="/profiles" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
