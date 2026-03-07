const GATE_RANK = {
  'execute-eligible': 0,
  'learn-only': 1,
  blocked: 2,
}

const round3 = (value) => Math.round(Number(value) * 1000) / 1000

const parseExpression = (expression) => {
  const match = (expression || '')
    .trim()
    .match(/^([a-z_]\w*)\.(current_level|confidence|evidence_age_days)\s*(<=|>=|<|>)\s*(-?\d+(?:\.\d+)?)$/i)
  if (!match) return null
  return {
    category: match[1],
    field: match[2],
    op: match[3],
    threshold: Number(match[4]),
  }
}

const evaluateExpression = (expression, constraints) => {
  const parsed = parseExpression(expression)
  if (!parsed) return null
  const category = constraints[parsed.category]
  if (!category) return null
  const lhs = Number(category[parsed.field] ?? 0)
  const rhs = Number(parsed.threshold)
  if (parsed.op === '<') return lhs < rhs
  if (parsed.op === '>') return lhs > rhs
  if (parsed.op === '<=') return lhs <= rhs
  if (parsed.op === '>=') return lhs >= rhs
  return null
}

const computeConstraintDeltas = (node, constraints) => {
  const deltas = {}
  let unmet = 0
  const required = [...(node.constraints_required || [])].sort((a, b) =>
    String(a.category || '').localeCompare(String(b.category || '')),
  )
  required.forEach((req) => {
    const category = req.category
    if (!category) return
    const current = constraints[category] || {}
    const levelDelta = round3(Number(current.current_level || 0) - Number(req.min_required_level || 0))
    const confDelta = round3(Number(current.confidence || 0) - Number(req.confidence_min || 0))
    const freshnessDelta = round3(
      Number(req.evidence_freshness_days_max ?? 999999) - Number(current.evidence_age_days || 0),
    )
    deltas[category] = {
      level_delta: levelDelta,
      confidence_delta: confDelta,
      freshness_delta: freshnessDelta,
    }
    if (levelDelta < 0 || confDelta < 0 || freshnessDelta < 0) {
      unmet += 1
    }
  })
  return { deltas, unmet }
}

const evaluateNode = (profile, node, priorDecisions) => {
  const constraints = profile.constraints || {}
  const hardHits = []
  ;[...(node.blocked_when || [])]
    .sort((a, b) => String(a.condition_id || '').localeCompare(String(b.condition_id || '')))
    .forEach((cond) => {
      if (evaluateExpression(cond.expression, constraints)) {
        hardHits.push(String(cond.reason || cond.condition_id || 'blocked-condition'))
      }
    })

  const simulationHits = []
  ;[...(node.simulation_only_conditions || [])]
    .sort((a, b) => String(a.condition_id || '').localeCompare(String(b.condition_id || '')))
    .forEach((cond) => {
      if (evaluateExpression(cond.expression, constraints)) {
        simulationHits.push(String(cond.reason || cond.condition_id || 'simulation-condition'))
      }
    })

  const { deltas, unmet } = computeConstraintDeltas(node, constraints)
  let gatingReason = 'execute-eligible'
  let gatingDetails = ['all required constraints satisfy execution thresholds']

  if (hardHits.length > 0) {
    gatingReason = 'blocked'
    gatingDetails = [...hardHits].sort()
  } else if (unmet > 0 || simulationHits.length > 0) {
    gatingReason = 'learn-only'
    gatingDetails = [...simulationHits].sort()
    if (unmet > 0) {
      gatingDetails.push(`${unmet} required constraint(s) below execute threshold`)
    }
  }

  const reqCount = Math.max(1, Object.keys(deltas).length)
  const reqMet = reqCount - unmet
  const readinessRatio = reqMet / reqCount
  const irreversibility = Number(node.irreversibility_score || 0.5)
  const gateAdjustment = gatingReason === 'execute-eligible' ? 0.04 : gatingReason === 'learn-only' ? 0 : -0.04
  const optionalityDelta = round3((readinessRatio - 0.5) * 0.2 + (0.5 - irreversibility) * 0.08 + gateAdjustment)

  const riskDelta = deltas.risk?.level_delta
  const riskTrend =
    riskDelta === undefined ? 'risk-flat' : riskDelta < 0 ? 'risk-up' : riskDelta > 0 ? 'risk-down' : 'risk-flat'

  return {
    decision_id: String(node.decision_id || 'unknown-decision'),
    decision_type: String(node.decision_type || 'unknown'),
    irreversibility_score: irreversibility,
    prerequisites: node.prerequisites || [],
    gating_reason: gatingReason,
    gating_details: gatingDetails,
    constraint_deltas: deltas,
    optionality_delta: optionalityDelta,
    drift_flags: {
      risk_trend: riskTrend,
      loop_detected:
        priorDecisions.length >= 2 &&
        priorDecisions[priorDecisions.length - 1] === node.decision_id &&
        priorDecisions[priorDecisions.length - 2] === node.decision_id,
    },
  }
}

const scoreDeficit = (evaluation) => {
  return Object.values(evaluation.constraint_deltas || {}).reduce((acc, delta) => {
    return (
      acc +
      Math.abs(Math.min(0, Number(delta.level_delta || 0))) +
      Math.abs(Math.min(0, Number(delta.confidence_delta || 0))) +
      Math.abs(Math.min(0, Number(delta.freshness_delta || 0))) / 100
    )
  }, 0)
}

const chooseDecision = (profile, nodes, priorDecisions = []) => {
  const evaluated = nodes.map((node) => evaluateNode(profile, node, priorDecisions))
  const ranked = [...evaluated].sort((a, b) => {
    const aKey = [
      GATE_RANK[a.gating_reason] ?? 9,
      round3(scoreDeficit(a)),
      Number(a.irreversibility_score || 0),
      a.decision_id,
    ]
    const bKey = [
      GATE_RANK[b.gating_reason] ?? 9,
      round3(scoreDeficit(b)),
      Number(b.irreversibility_score || 0),
      b.decision_id,
    ]
    return JSON.stringify(aKey).localeCompare(JSON.stringify(bKey))
  })

  let selected = ranked[0]
  if (!selected) return null

  if (priorDecisions.length > 0) {
    const alternatives = ranked.filter(
      (ev) => ev.gating_reason !== 'blocked' && ev.decision_id !== priorDecisions[priorDecisions.length - 1],
    )
    if (selected.decision_id === priorDecisions[priorDecisions.length - 1] && alternatives.length > 0) {
      selected = alternatives[0]
    }
  }

  if (priorDecisions.length >= 2 && new Set(priorDecisions.slice(-2)).size === 1) {
    const loopSet = new Set(priorDecisions.slice(-2))
    const alternatives = ranked.filter(
      (ev) => ev.gating_reason !== 'blocked' && !loopSet.has(ev.decision_id),
    )
    if (alternatives.length > 0) selected = alternatives[0]
  }

  return { selected, ranked }
}

export const evaluateAllNodes = (profile, nodes, priorDecisions = []) => {
  const evaluated = nodes.map((node) => evaluateNode(profile, node, priorDecisions))
  return [...evaluated].sort((a, b) => {
    const aKey = [
      GATE_RANK[a.gating_reason] ?? 9,
      round3(scoreDeficit(a)),
      Number(a.irreversibility_score || 0),
      a.decision_id,
    ]
    const bKey = [
      GATE_RANK[b.gating_reason] ?? 9,
      round3(scoreDeficit(b)),
      Number(b.irreversibility_score || 0),
      b.decision_id,
    ]
    return JSON.stringify(aKey).localeCompare(JSON.stringify(bKey))
  })
}

const applyProjectionUpdate = (profile, chosen) => {
  const updated = JSON.parse(JSON.stringify(profile))
  const constraints = updated.constraints || {}
  const boost =
    chosen.gating_reason === 'execute-eligible'
      ? [0.03, 0.02]
      : chosen.gating_reason === 'learn-only'
        ? [0.02, 0.015]
        : [-0.01, -0.005]

  Object.keys(constraints)
    .sort()
    .forEach((category) => {
      const entry = constraints[category]
      entry.evidence_age_days = Math.max(0, Number(entry.evidence_age_days || 0) + 1)
    })

  Object.keys(chosen.constraint_deltas || {})
    .sort()
    .forEach((category) => {
      if (!constraints[category]) return
      const entry = constraints[category]
      entry.current_level = round3(Math.min(1, Math.max(0, Number(entry.current_level || 0) + boost[0])))
      entry.confidence = round3(Math.min(1, Math.max(0, Number(entry.confidence || 0) + boost[1])))
      const required = Number(entry.required_level || 0)
      const current = Number(entry.current_level || 0)
      if (current + 0.01 < required) entry.trend = 'degrading'
      else if (current >= required) entry.trend = 'improving'
      else entry.trend = 'stable'
    })

  return updated
}

export const runEvaluator = (profile, nodes, priorDecisions = []) => {
  const decision = chooseDecision(profile, nodes, priorDecisions)
  if (!decision) {
    return {
      profile_id: profile.profile_id,
      next_decision_id: null,
      status: 'learn-only',
      rationale: 'No candidate available.',
      blocking_reasons: ['all candidates hard-blocked'],
      evidence_gaps: [],
      rule_refs: [],
      constraint_deltas: {},
      optionality_delta: 0,
      drift_flags: { risk_trend: 'risk-flat', loop_detected: false },
      blocked_candidates: [],
    }
  }

  const { selected, ranked } = decision
  const blockedByHard = ranked.filter((node) => node.gating_reason === 'blocked').length
  const executeEligible = ranked.filter((node) => node.gating_reason === 'execute-eligible').length
  const learnOnly = ranked.filter((node) => node.gating_reason === 'learn-only').length
  return {
    profile_id: profile.profile_id,
    next_decision_id: selected.decision_id,
    status: selected.gating_reason === 'execute-eligible' ? 'execute-eligible' : 'learn-only',
    rationale: `Selected by deterministic ordering (${selected.irreversibility_score.toFixed(2)}).`,
    blocking_reasons: selected.gating_details,
    evidence_gaps: [],
    rule_refs: ['runner-parity:v1'],
    prerequisites: selected.prerequisites || [],
    decision_type: selected.decision_type,
    constraint_deltas: selected.constraint_deltas,
    optionality_delta: selected.optionality_delta,
    drift_flags: selected.drift_flags,
    stats: {
      execute_eligible_count: executeEligible,
      learn_only_count: learnOnly,
      hard_block_count: blockedByHard,
      total_candidates: ranked.length,
    },
    node_states: ranked.map((node) => ({
      decision_id: node.decision_id,
      gating_reason: node.gating_reason,
      irreversibility_score: node.irreversibility_score,
    })),
    blocked_candidates: ranked
      .filter((node) => node.gating_reason !== 'execute-eligible')
      .slice(0, 6)
      .map((node) => ({
        decision_id: node.decision_id,
        status:
          node.gating_reason === 'blocked'
            ? 'ineligible-hard-block'
            : node.gating_reason === 'learn-only'
              ? 'eligible-learn-only'
              : 'eligible-execute',
        reason: node.gating_details[0] || 'not execute-eligible',
      })),
  }
}

export const runProjection = (profile, nodes, steps) => {
  const cappedSteps = Math.min(Math.max(steps, 1), 5)
  const history = []
  let state = JSON.parse(JSON.stringify(profile))
  const priorDecisions = []

  for (let index = 0; index < cappedSteps; index += 1) {
    const decision = chooseDecision(state, nodes, priorDecisions)
    if (!decision) {
      history.push({
        step: index + 1,
        profile_id: profile.profile_id,
        next_decision_id: null,
        status: 'learn-only',
        rationale: 'No candidate available.',
        blocking_reasons: ['all candidates hard-blocked'],
        evidence_gaps: [],
        rule_refs: [],
        constraint_deltas: {},
        optionality_delta: 0,
        drift_flags: { risk_trend: 'risk-flat', loop_detected: false },
        blocked_candidates: [],
      })
      continue
    }
    const { selected, ranked } = decision
    history.push({
      step: index + 1,
      profile_id: profile.profile_id,
      next_decision_id: selected.decision_id,
      status: selected.gating_reason === 'execute-eligible' ? 'execute-eligible' : 'learn-only',
      rationale: `Selected by deterministic ordering (${selected.irreversibility_score.toFixed(2)}).`,
      blocking_reasons: selected.gating_details,
      evidence_gaps: [],
      rule_refs: ['runner-parity:v1'],
      constraint_deltas: selected.constraint_deltas,
      optionality_delta: selected.optionality_delta,
      drift_flags: selected.drift_flags,
      blocked_candidates: ranked
        .filter((node) => node.gating_reason !== 'execute-eligible')
        .slice(0, 6)
        .map((node) => ({
          decision_id: node.decision_id,
          status:
            node.gating_reason === 'blocked'
              ? 'ineligible-hard-block'
              : node.gating_reason === 'learn-only'
                ? 'eligible-learn-only'
                : 'eligible-execute',
          reason: node.gating_details[0] || 'not execute-eligible',
        })),
    })
    priorDecisions.push(selected.decision_id)
    state = applyProjectionUpdate(state, selected)
  }
  return history
}
