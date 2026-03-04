const buildGraph = (nodes) => {
  const nodeIds = nodes.map((node) => node.decision_id)
  const indexById = Object.fromEntries(nodeIds.map((id, index) => [id, index]))

  const graphNodes = nodeIds.map((id, index) => ({
    id,
    x: 120 + (index % 3) * 280,
    y: 80 + Math.floor(index / 3) * 120,
  }))

  const edges = []
  nodes.forEach((node) => {
    node.unlocks.forEach((target) => {
      if (indexById[target] !== undefined) {
        edges.push({
          from: node.decision_id,
          to: target,
        })
      }
    })
  })

  return { graphNodes, edges }
}

export function GraphPage({ nodes }) {
  const { graphNodes, edges } = buildGraph(nodes)
  const location = Object.fromEntries(graphNodes.map((node) => [node.id, node]))

  return (
    <section>
      <h2>Read-only Node Graph</h2>
      <p>Edges represent unlock relationships from committed graph data.</p>
      <svg viewBox="0 0 900 620" className="graph">
        {edges.map((edge) => {
          const from = location[edge.from]
          const to = location[edge.to]
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={from.x + 70}
              y1={from.y + 12}
              x2={to.x + 70}
              y2={to.y + 12}
              stroke="#6b7280"
              strokeWidth="1.5"
            />
          )
        })}
        {graphNodes.map((node) => (
          <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
            <rect width="140" height="24" rx="6" ry="6" fill="#1f2937" />
            <text x="8" y="16" fill="#f9fafb" fontSize="8">
              {node.id}
            </text>
          </g>
        ))}
      </svg>
    </section>
  )
}
