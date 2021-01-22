import { getSolutionById, getProblemStatementById } from './mockDb'

export class SolutionStep {
    id: number
    text?: string
    level?: number
    hasChild: boolean
    alwaysVisible: boolean
}

export type ExpandList = Array<number>;
export type StepsTree = Array<Array<number>>;
export type Steps = Array<SolutionStep>
export type StepsLevel = Array<number>;

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

export function getStepsToExpandFromId(solution: Solution, stepId: number)
    : ExpandList {
    if (!solution?.stepsTree) {
        return [];
    }
    return solution.stepsTree[stepId];
}

// sanitize expandList. If it is empty, set to default expansion
// (of root) from solution
export function sanitize(solution: Solution, expandList: ExpandList): ExpandList {
    if (!solution?.stepsTree) {
        return expandList;
    }
    if (expandList.length == 0) {
        return solution.stepsTree[solution.stepsTree.length - 1];
    }
    return expandList;
}

export function getVisibleSteps(solution: Solution, expandList: ExpandList)
    : Array<SolutionStep> {
    return solution?.steps?.filter((_, index) => expandList.includes(index)) ?? [];
}

export type Problem = {
    id: number;
    problemStatement?: string
    solution?: Solution
}

export function computeStepLevel(steps, stepsTree) {
    // init
    const ROOT = stepsTree.length - 1;
    let bfs = stepsTree[ROOT].concat([]);
    stepsTree[ROOT].forEach((index) => {
        steps[index].level = 0;
        steps[index].hasChild = false;
        steps[index].alwaysVisible = true;
    })

    while (bfs.length != 0) {
        let stepToExpand = bfs.shift();
        steps[stepToExpand].hasChild = stepsTree[stepToExpand].length != 0;
        stepsTree[stepToExpand].forEach((index) => {
            bfs.push(index);
            steps[index].level = steps[stepToExpand].level + 1;
            steps[index].hasChild = false;
            steps[index].alwaysVisible = false;
        });
    }
}

export async function getProblemById(id: number): Promise<Problem> {
    let problemStatement = await getProblemStatementById(id);
    let [steps, stepsTree] = await getSolutionById(id);
    return {
        problemStatement: problemStatement,
        solution: { steps, stepsTree },
        id: id,
    };
}