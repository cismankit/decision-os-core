export function ProjectionPage({ steps, setSteps, run, selectedProfile, onRunProjection }) {
  if (!selectedProfile) {
    return <section>Select a profile first.</section>
  }

  return (
    <section>
      <h2>1-5 Step Projection</h2>
      <div className="card">
        <label htmlFor="steps">Steps: </label>
        <input
          id="steps"
          type="number"
          min={1}
          max={5}
          value={steps}
          onChange={(event) => setSteps(Number(event.target.value))}
        />
        <button onClick={onRunProjection}>Run Projection</button>
      </div>

      {run.length === 0 ? (
        <p>Run projection to view deterministic step outputs.</p>
      ) : (
        <div className="card-grid">
          {run.map((stepResult) => (
            <article key={stepResult.step} className="card">
              <h3>Step {stepResult.step}</h3>
              <p>
                <strong>next_decision_id:</strong> {stepResult.next_decision_id}
              </p>
              <p>
                <strong>status:</strong> {stepResult.status}
              </p>
              <p>
                <strong>rationale:</strong> {stepResult.rationale}
              </p>
              <p>
                <strong>blocked:</strong> {stepResult.blocking_reasons[0]}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
