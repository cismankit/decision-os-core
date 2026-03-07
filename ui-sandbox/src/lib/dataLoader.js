import { useEffect, useState } from 'react'

const loadJson = async (path) => {
  const response = await fetch(path)
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }
  return response.json()
}

export const useSandboxData = () => {
  const [profiles, setProfiles] = useState([])
  const [scenarioProfiles, setScenarioProfiles] = useState([])
  const [nodes, setNodes] = useState([])
  const [suiteMeta, setSuiteMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    Promise.all([
      loadJson('/data/regression-profiles.json'),
      loadJson('/data/scenario-profiles.json'),
      loadJson('/data/nodes.json'),
      loadJson('/data/regression-suite.json'),
    ])
      .then(([profileData, scenarioData, nodeData, regressionSuite]) => {
        if (!mounted) return
        const allowed = new Set((regressionSuite?.profile_ids || []).map((id) => String(id)))
        const filtered = profileData.filter((profile) => allowed.has(String(profile.profile_id)))
        setProfiles(filtered)
        setScenarioProfiles(scenarioData)
        setNodes(nodeData)
        setSuiteMeta(regressionSuite)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err.message)
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return { profiles, scenarioProfiles, nodes, suiteMeta, loading, error }
}
