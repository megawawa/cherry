import { setPriority } from 'os'
import ProblemSummaryCard from '../components/quiz/problemSummary'
import { getDefaultSolutionById, getProblemStatementById, getProcessedStepsAndStepTrees } from './mockDb'

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

    let visited = {};

    while (bfs.length != 0) {
        let stepToExpand = bfs.shift();
        if (visited[stepToExpand]) {
            throw Error;
        }
        visited[stepToExpand] = true;
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
    let [steps, stepsTree] = getDefaultSolutionById(id);
    return {
        problemStatement: problemStatement,
        solution: { steps, stepsTree },
        id: id,
    };
}

function computeChild(
    stepsLevel: StepsLevel,
    currentIndex: number,
    parentLevel: number) {
    let currentKidLevel = -1;
    let children = [];
    // find children
    for (let j = currentIndex - 1; j >= 0; --j) {
        if (stepsLevel[j] <= parentLevel) {
            break;
        }
        // if stepsLevel[j] > currentKidLevel
        // j is the kid of the step with 
        // step level of "currentKidLevel"
        if (stepsLevel[j] <= currentKidLevel
            || currentKidLevel == -1) {
            children.push(j);
            currentKidLevel = stepsLevel[j];
        }
    }
    return children;
}

export function parseTextToSolution(text: string): Solution {
    let steps = text.split('\n--');
    let stepsLevel = [];
    let stepsTree = [];

    for (let i = 0; i < steps.length; ++i) {
        const regMatch = RegExp('[^-]', 'g');
        regMatch.exec(steps[i]);
        if (regMatch.lastIndex == 0) {
            // empty string. set level to 0
            stepsLevel.push(0);
        } else {
            stepsLevel.push(regMatch.lastIndex - 1);
        }
        steps[i] = steps[i].substr(stepsLevel[i]);
    }

    // process indentation to create stepsTree
    for (let i = 0; i < steps.length; ++i) {
        stepsTree.push(
            computeChild(stepsLevel, i, stepsLevel[i]));
    }

    stepsTree.push(
        computeChild(stepsLevel, steps.length, -1));

    console.log(steps, stepsTree, stepsLevel);

    let solutionSteps = [];
    [solutionSteps, stepsTree] =
        getProcessedStepsAndStepTrees(steps, stepsTree);
    return {
        stepsTree: stepsTree,
        steps: solutionSteps,
    };
}