import { ProjectionTimeline } from '../components/ProjectionTimeline'

export function ProjectionPage({ steps, setSteps, run, selectedProfile, onRunProjection, nodesById }) {
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

      <ProjectionTimeline run={run} nodesById={nodesById} />
    </section>
  )
}
