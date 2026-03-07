import { runEvaluator, evaluateAllNodes } from '../lib/evaluator.js'

export function evaluateProfile(profile: any, nodes: any[], priorDecisions: string[] = []) {
  return runEvaluator(profile, nodes, priorDecisions)
}

export function evaluateProfileDetailed(profile: any, nodes: any[], priorDecisions: string[] = []) {
  return evaluateAllNodes(profile, nodes, priorDecisions)
}
