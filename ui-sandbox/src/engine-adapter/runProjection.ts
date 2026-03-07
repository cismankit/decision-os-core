import { runProjection } from '../lib/evaluator.js'

export function projectProfile(profile: any, nodes: any[], steps = 5) {
  return runProjection(profile, nodes, steps)
}
