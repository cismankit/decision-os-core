import { useMemo, useState } from 'react'
import { runEvaluator, runProjection } from '../lib/evaluator'

export function ScenariosPage({ scenarios, nodes }) {
  const [selectedScenarioId, setSelectedScenarioId] = useState('')
  const [decisionRun, setDecisionRun] = useState(null)
  const [projectionRun, setProjectionRun] = useState([])

  const selectedScenario = useMemo(
    () => scenarios.find((scenario) => scenario.profile_id === selectedScenarioId) ?? null,
    [scenarios, selectedScenarioId],
  )

  const runScenario = () => {
    if (!selectedScenario) return
    setDecisionRun(runEvaluator(selectedScenario, nodes))
    setProjectionRun(runProjection(selectedScenario, nodes, 5))
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

      {selectedScenario && (
        <article className="card">
          <h3>Current State</h3>
          <p>
            <strong>Scenario:</strong> {selectedScenario.scenario_label}
          </p>
          <ul>
            <li>
              <strong>income:</strong> {selectedScenario.income.monthly_usd} USD ({selectedScenario.income.stability})
            </li>
            <li>
              <strong>credit readiness:</strong>{' '}
              {selectedScenario.credit_readiness.has_credit_history ? 'history present' : 'no history'} (
              {selectedScenario.credit_readiness.score_band})
            </li>
            <li>
              <strong>risk exposure:</strong> {selectedScenario.risk_exposure.level}
            </li>
            <li>
              <strong>legal exposure:</strong> {selectedScenario.legal_exposure.level}
            </li>
            <li>
              <strong>operational bandwidth:</strong> {selectedScenario.operational_bandwidth.hours_per_week} h/week
            </li>
            <li>
              <strong>capital availability:</strong> {selectedScenario.capital_availability.liquid_usd} USD
            </li>
            <li>
              <strong>knowledge gaps:</strong> {selectedScenario.knowledge_gaps.join(', ')}
            </li>
          </ul>
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
          <ul>
            {projectionRun.map((step) => (
              <li key={step.step}>
                <strong>step {step.step}:</strong> {step.next_decision_id} ({step.status}) | optionality{' '}
                {step.optionality_delta}
              </li>
            ))}
          </ul>
        </article>
      )}
    </section>
  )
}
