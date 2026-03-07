type ProjectionTimelineProps = {
  run: any[]
  nodesById: Record<string, any>
}

export function ProjectionTimeline({ run, nodesById }: ProjectionTimelineProps) {
  if (!run || run.length === 0) {
    return <p>Run projection to view timeline.</p>
  }
  return (
    <div className="timeline">
      {run.map((step) => {
        const node = nodesById[step.next_decision_id] || {}
        const irreversible = Number(node.irreversibility_score || 0) >= 0.8
        return (
          <article key={step.step} className={`card timeline-step ${irreversible ? 'irreversible' : ''}`}>
            <h4>Step {step.step}</h4>
            <p>{step.next_decision_id}</p>
            <p>{step.status}</p>
            <p>optionality: {step.optionality_delta}</p>
            <p>risk: {step.drift_flags?.risk_trend}</p>
          </article>
        )
      })}
    </div>
  )
}
