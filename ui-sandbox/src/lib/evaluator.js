const parseExpression = (expression) => {
  const match = expression.match(/^([a-z_]+)\.(current_level|confidence)\s*<\s*([0-9.]+)$/i)
  if (!match) return null
  return {
    category: match[1],
    field: match[2],
    threshold: Number(match[3]),
  }
}

const evaluateHardBlock = (profile, rule) => {
  const parsed = parseExpression(rule.expression || '')
  if (!parsed) return false
  const category = profile.constraints[parsed.category]
  if (!category) return false
  return category[parsed.field] < parsed.threshold
}

const evaluateNode = (profile, node) => {
  const evidenceGaps = []
  const blockingReasons = []
  const ruleRefs = []

  node.constraints_required.forEach((requirement) => {
    const constraint = profile.constraints[requirement.category]
    if (!constraint) {
      evidenceGaps.push(`missing ${requirement.category} evidence`)
      return
    }

    if (constraint.current_level < requirement.min_required_level) {
      blockingReasons.push(
        `${requirement.category} level ${constraint.current_level.toFixed(2)} < ${requirement.min_required_level.toFixed(2)}`,
      )
      ruleRefs.push(`readiness:${requirement.category}:level`)
    }
    if (
      typeof requirement.confidence_min === 'number' &&
      constraint.confidence < requirement.confidence_min
    ) {
      blockingReasons.push(
        `${requirement.category} confidence ${constraint.confidence.toFixed(2)} < ${requirement.confidence_min.toFixed(2)}`,
      )
      ruleRefs.push(`readiness:${requirement.category}:confidence`)
    }
    if (
      typeof requirement.evidence_freshness_days_max === 'number' &&
      constraint.evidence_age_days > requirement.evidence_freshness_days_max
    ) {
      blockingReasons.push(
        `${requirement.category} evidence age ${constraint.evidence_age_days}d > ${requirement.evidence_freshness_days_max}d`,
      )
      ruleRefs.push(`readiness:${requirement.category}:freshness`)
    }
  })

  const unmetPrereqs = node.prerequisites.filter((p) => !p.satisfied)
  if (unmetPrereqs.length > 0) {
    blockingReasons.push(`unmet prerequisites: ${unmetPrereqs.map((p) => p.prerequisite_id).join(', ')}`)
    ruleRefs.push('preconditions:prerequisites')
  }

  const hardBlocks = node.blocked_when.filter((rule) => evaluateHardBlock(profile, rule))
  if (hardBlocks.length > 0) {
    hardBlocks.forEach((rule) => {
      blockingReasons.push(rule.reason || `hard block: ${rule.condition_id}`)
      ruleRefs.push(`safety:${rule.condition_id}`)
    })
    return {
      ...node,
      status: 'ineligible-hard-block',
      blocking_reasons: blockingReasons,
      evidence_gaps: evidenceGaps,
      rule_refs: ruleRefs,
    }
  }

  const status = blockingReasons.length > 0 ? 'eligible-learn-only' : 'eligible-execute'
  return {
    ...node,
    status,
    blocking_reasons: blockingReasons,
    evidence_gaps: evidenceGaps,
    rule_refs: ruleRefs,
  }
}

export const runEvaluator = (profile, nodes) => {
  const evaluated = nodes.map((node) => evaluateNode(profile, node))
  const ordered = [...evaluated].sort((a, b) => {
    if (a.irreversibility_score !== b.irreversibility_score) {
      return a.irreversibility_score - b.irreversibility_score
    }
    return a.decision_id.localeCompare(b.decision_id)
  })

  const executeCandidate = ordered.find((node) => node.status === 'eligible-execute')
  const learnCandidate = ordered.find((node) => node.status === 'eligible-learn-only')
  const next = executeCandidate || learnCandidate || null

  return {
    profile_id: profile.profile_id,
    next_decision_id: next?.decision_id || null,
    status: next ? (next.status === 'eligible-execute' ? 'execute-eligible' : 'learn-only') : 'learn-only',
    rationale: next
      ? `Selected by deterministic irreversibility ordering after readiness/safety checks (${next.irreversibility_score.toFixed(2)}).`
      : 'No candidate available.',
    blocking_reasons: next?.blocking_reasons || ['all candidates hard-blocked'],
    evidence_gaps: next?.evidence_gaps || [],
    rule_refs: next?.rule_refs || [],
    blocked_candidates: ordered
      .filter((node) => node.status !== 'eligible-execute')
      .slice(0, 6)
      .map((node) => ({
        decision_id: node.decision_id,
        status: node.status,
        reason: node.blocking_reasons[0] || 'not execute-eligible',
      })),
  }
}

export const runProjection = (profile, nodes, steps) => {
  const cappedSteps = Math.min(Math.max(steps, 1), 5)
  return Array.from({ length: cappedSteps }, (_, idx) => ({
    step: idx + 1,
    ...runEvaluator(profile, nodes),
  }))
}
