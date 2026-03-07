export function loadScenarioById(scenarios: any[], scenarioId: string) {
  return scenarios.find((scenario) => scenario.profile_id === scenarioId) ?? null
}

export function withScenarioOverrides(scenario: any, overrides: Record<string, number>) {
  const cloned = JSON.parse(JSON.stringify(scenario))
  Object.entries(overrides).forEach(([key, value]) => {
    if (cloned.constraints?.[key]) {
      cloned.constraints[key].current_level = Math.max(0, Math.min(1, Number(value)))
    }
  })
  return cloned
}
