export function DecisionPage({ run, selectedProfile }) {
  if (!selectedProfile) {
    return <section>Select a profile on the Profiles page, then click Run.</section>
  }

  if (!run) {
    return <section>Click Run to evaluate NBA output for the selected profile.</section>
  }

  return (
    <section>
      <h2>Next Best Decision</h2>
      <div className="card">
        <p>
          <strong>Profile:</strong> {run.profile_id}
        </p>
        <p>
          <strong>next_decision_id:</strong> {run.next_decision_id}
        </p>
        <p>
          <strong>status:</strong> {run.status}
        </p>
        <p>
          <strong>rationale:</strong> {run.rationale}
        </p>
      </div>

      <div className="card-grid">
        <article className="card">
          <h3>Why selected</h3>
          <ul>
            {run.rule_refs.map((ref) => (
              <li key={ref}>{ref}</li>
            ))}
          </ul>
        </article>
        <article className="card">
          <h3>What blocked execution</h3>
          <ul>
            {run.blocking_reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
          {run.evidence_gaps.length > 0 && (
            <>
              <h4>Evidence gaps</h4>
              <ul>
                {run.evidence_gaps.map((gap) => (
                  <li key={gap}>{gap}</li>
                ))}
              </ul>
            </>
          )}
        </article>
      </div>

      <article className="card">
        <h3>Blocked candidates snapshot</h3>
        <ul>
          {run.blocked_candidates.map((candidate) => (
            <li key={candidate.decision_id}>
              <strong>{candidate.decision_id}</strong> ({candidate.status}) - {candidate.reason}
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}
