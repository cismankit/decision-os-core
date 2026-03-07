import { useMemo, useState } from 'react'
import { evaluateProfile } from '../engine-adapter/evaluateProfile'
import { projectProfile } from '../engine-adapter/runProjection'
import { loadScenarioById, withScenarioOverrides } from '../engine-adapter/loadScenario'
import { ProjectionTimeline } from '../components/ProjectionTimeline'

export function ScenariosPage({ scenarios, nodes }) {
  const [selectedScenarioId, setSelectedScenarioId] = useState('')
  const [overrides, setOverrides] = useState({})
  const [decisionRun, setDecisionRun] = useState(null)
  const [projectionRun, setProjectionRun] = useState([])
  const nodesById = useMemo(
    () => Object.fromEntries(nodes.map((node) => [node.decision_id, node])),
    [nodes],
  )

  const selectedScenario = useMemo(
    () => loadScenarioById(scenarios, selectedScenarioId),
    [scenarios, selectedScenarioId],
  )
  const workingScenario = useMemo(
    () => (selectedScenario ? withScenarioOverrides(selectedScenario, overrides) : null),
    [selectedScenario, overrides],
  )

  const runScenario = () => {
    if (!workingScenario) return
    setDecisionRun(evaluateProfile(workingScenario, nodes))
    setProjectionRun(projectProfile(workingScenario, nodes, 5))
  }

  const updateConstraint = (category, value) => {
    setOverrides((prev) => ({ ...prev, [category]: Number(value) }))
  }

  return (
    <section>
      <h2>Real Scenario Profiles</h2>
      <p>Evaluate realistic human states against the same deterministic decision logic.</p>
      <div className="card">
        <select
          value={selectedScenarioId}
          onChange={(event) => setSelectedScenarioId(event.target.value)}
        >
          <option value="">Select scenario profile...</option>
          {scenarios.map((scenario) => (
            <option key={scenario.profile_id} value={scenario.profile_id}>
              {scenario.profile_id}
            </option>
          ))}
        </select>
        <button onClick={runScenario} disabled={!selectedScenario}>
          Run Scenario
        </button>
      </div>

      {workingScenario && (
        <article className="card">
          <h3>Current State</h3>
          <p>
            <strong>Scenario:</strong> {workingScenario.scenario_label}
          </p>
          <ul>
            <li>
              <strong>income:</strong> {workingScenario.income.monthly_usd} USD ({workingScenario.income.stability})
            </li>
            <li>
              <strong>credit readiness:</strong>{' '}
              {workingScenario.credit_readiness.has_credit_history ? 'history present' : 'no history'} (
              {workingScenario.credit_readiness.score_band})
            </li>
            <li>
              <strong>risk exposure:</strong> {workingScenario.risk_exposure.level}
            </li>
            <li>
              <strong>legal exposure:</strong> {workingScenario.legal_exposure.level}
            </li>
            <li>
              <strong>operational bandwidth:</strong> {workingScenario.operational_bandwidth.hours_per_week} h/week
            </li>
            <li>
              <strong>capital availability:</strong> {workingScenario.capital_availability.liquid_usd} USD
            </li>
            <li>
              <strong>knowledge gaps:</strong> {workingScenario.knowledge_gaps.join(', ')}
            </li>
          </ul>
          <h4>Modify Parameters</h4>
          <div className="meter-grid">
            {Object.entries(workingScenario.constraints).map(([name, values]) => (
              <label key={name} className="card">
                <strong>{name}</strong>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={values.current_level}
                  onChange={(event) => updateConstraint(name, event.target.value)}
                />
                <span>current: {Number(values.current_level).toFixed(2)}</span>
              </label>
            ))}
          </div>
        </article>
      )}

      {decisionRun && (
        <article className="card">
          <h3>Next Best Decision</h3>
          <p>
            <strong>next_decision_id:</strong> {decisionRun.next_decision_id}
          </p>
          <p>
            <strong>status:</strong> {decisionRun.status}
          </p>
          <p>
            <strong>optionality_delta:</strong> {decisionRun.optionality_delta}
          </p>
        </article>
      )}

      {projectionRun.length > 0 && (
        <article className="card">
          <h3>Projection Timeline (5-step)</h3>
          <ProjectionTimeline run={projectionRun} nodesById={nodesById} />
        </article>
      )}
    </section>
  )
}
