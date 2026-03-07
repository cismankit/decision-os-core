type DecisionGraphViewProps = {
  nodes: any[]
  nodeStates?: { decision_id: string; gating_reason: string; irreversibility_score: number }[]
}

export function DecisionGraphView({ nodes, nodeStates = [] }: DecisionGraphViewProps) {
  const ids = nodes.map((node) => node.decision_id)
  const indexById = Object.fromEntries(ids.map((id, index) => [id, index]))
  const stateById = Object.fromEntries(nodeStates.map((state) => [state.decision_id, state]))
  const graphNodes = ids.map((id, index) => ({
    id,
    x: 120 + (index % 3) * 290,
    y: 90 + Math.floor(index / 3) * 118,
  }))
  const position = Object.fromEntries(graphNodes.map((node) => [node.id, node]))
  const edges: { from: string; to: string }[] = []
  nodes.forEach((node) => {
    ;(node.unlocks || []).forEach((target: any) => {
      const toId = typeof target === 'string' ? target : target?.target_decision_id
      if (toId && indexById[toId] !== undefined) {
        edges.push({ from: node.decision_id, to: toId })
      }
    })
  })

  return (
    <svg viewBox="0 0 980 700" className="graph">
      {edges.map((edge) => {
        const from = position[edge.from]
        const to = position[edge.to]
        return (
          <line
            key={`${edge.from}-${edge.to}`}
            x1={from.x + 80}
            y1={from.y + 14}
            x2={to.x + 80}
            y2={to.y + 14}
            stroke="#9ca3af"
            strokeWidth="1.4"
          />
        )
      })}
      {graphNodes.map((node) => {
        const rawState = stateById[node.id]
        const stateClass =
          rawState?.gating_reason === 'execute-eligible'
            ? 'node-reachable'
            : rawState?.gating_reason === 'learn-only'
              ? 'node-learn'
              : rawState?.gating_reason === 'blocked'
                ? 'node-blocked'
                : 'node-unknown'
        const irreversible = Number(rawState?.irreversibility_score ?? 0) >= 0.8
        return (
          <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
            <rect width="160" height="30" rx="7" ry="7" className={`graph-node ${stateClass}`} />
            <text x="7" y="18" fill="#fff" fontSize="8">
              {node.id}
            </text>
            {irreversible && <circle cx="147" cy="8" r="4" fill="#f59e0b" />}
          </g>
        )
      })}
    </svg>
  )
}
