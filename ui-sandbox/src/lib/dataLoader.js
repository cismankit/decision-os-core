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
  const [nodes, setNodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    Promise.all([loadJson('/data/profiles.json'), loadJson('/data/nodes.json')])
      .then(([profileData, nodeData]) => {
        if (!mounted) return
        setProfiles(profileData)
        setNodes(nodeData)
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

  return { profiles, nodes, loading, error }
}
