import { DecisionGraphView } from '../components/DecisionGraphView'

export function GraphPage({ nodes, nodeStates }) {
  return (
    <section>
      <h2>Decision Graph Viewer</h2>
      <p>Interactive read-only map with reachable, blocked, and irreversible highlights.</p>
      <DecisionGraphView nodes={nodes} nodeStates={nodeStates} />
    </section>
  )
}
