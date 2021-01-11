import { getSolutionById } from './mockDb'

export class SolutionStep {
    id: number
    text?: string
}

export type ExpandList = Array<number>;
export type StepsTree = Array<Array<number>>;
export type Steps = Array<SolutionStep>

/*
 * "Solution" uses a tree structure underneath
 * to keep track of each solution step
 * steps: length N. N steps.
 * stepsTree: length N + 1. For index i:
 *  1) i < N: steps to expand to from step i
 *  2) i = N: steps to expand to from root
 */
export type Solution = {
    stepsTree: StepsTree;
    steps: Steps;
}

export function getExpandedSteps(solution: Solution, stepId: number)
    : Array<SolutionStep> {
    return solution.stepsTree[stepId].map((index) => solution.steps[index]);
}

function getVisibleStepsFromRoot(solution: Solution): Array<SolutionStep> {
    if (!solution?.stepsTree) {
        return [];
    }
    return getVisibleSteps(
        solution, solution.stepsTree[solution.stepsTree.length - 1]);
}

export function getVisibleSteps(solution: Solution, expandList: ExpandList)
    : Array<SolutionStep> {
    if (expandList.length == 0) {
        return getVisibleStepsFromRoot(solution);
    }
    return expandList.map((index) => solution.steps[index]);
}

export type Problem = {
    problemStatement?: string
    solution?: Solution
}

export async function getProblemById(id: number): Promise<Problem> {
    let [steps, stepsTree] = await getSolutionById(id);
    return {
        problemStatement: "sample problem: " + id,
        solution: { steps, stepsTree }
    };
}