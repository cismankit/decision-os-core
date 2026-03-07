type DecisionCardProps = {
  run: any
  nodesById: Record<string, any>
}

export function DecisionCard({ run, nodesById }: DecisionCardProps) {
  if (!run) return null
  const node = nodesById[run.next_decision_id] || {}
  const projectedBenefit =
    run.optionality_delta > 0 ? 'increases strategic flexibility' : 'stabilizes current constraint posture'
  return (
    <article className="card">
      <h3>Next Best Decision</h3>
      <p>
        <strong>Decision:</strong> {run.next_decision_id}
      </p>
      <p>
        <strong>Title:</strong> {node.decision_id || run.next_decision_id}
      </p>
      <p>
        <strong>Gating Reason:</strong> {run.status}
      </p>
      <p>
        <strong>Projected Benefit:</strong> {projectedBenefit}
      </p>
      <p>
        <strong>Optionality Change:</strong> {run.optionality_delta}
      </p>
      <h4>Prerequisites</h4>
      <ul>
        {(run.prerequisites || []).map((item: any) => (
          <li key={item.prerequisite_id}>{item.prerequisite_id}</li>
        ))}
      </ul>
      <h4>Constraint Deltas</h4>
      <ul>
        {Object.entries(run.constraint_deltas || {}).map(([k, v]: any) => (
          <li key={k}>
            {k}: level {v.level_delta}, confidence {v.confidence_delta}, freshness {v.freshness_delta}
          </li>
        ))}
      </ul>
    </article>
  )
}
