import { setPriority } from 'os'
import { resourceLimits } from 'worker_threads'
import ProblemSummaryCard from '../components/quiz/problemSummary'
import { getProblemStatementById } from './mockDb'

/* 
 * This file is for abstracting "problem" from backend point of view.
 * For derived entities to interact with problem, see "quiz".
 * A "problem" consists of problem statement and solution.
 */

export class SolutionStep {
    id: number
    text?: string
    level?: number
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
    rootExpansion: ExpandList;
    steps: Steps;
}

function computeChild(
    currentStepId: number,
    prevStepId: number,
    steps: Steps): ExpandList {
    let parentLevel = steps[currentStepId]?.level ?? -1;
    let currentKidLevel = -1;
    let startStepId = prevStepId + 1;
    // find children
    for (let j = currentStepId - 1; j > prevStepId; --j) {
        if (steps[j].level <= parentLevel) {
            startStepId = j;
            break;
        }
        // if stepsLevel[j] > currentKidLevel
        // j is the kid of the step with 
        // step level of "currentKidLevel"
        if (steps[j].level <= currentKidLevel
            || currentKidLevel == -1) {
            currentKidLevel = steps[j].level;
        }
    }
    let children = [];
    for (; startStepId < currentStepId; startStepId++) {
        if (steps[startStepId].level == currentKidLevel) {
            children.push(startStepId);
        }
    }
    return children;
}

export function getStepsToExpandFromId(solution: Solution, stepId: number,
    expandedList: ExpandList)
    : ExpandList {
    if (!solution?.steps) {
        return [];
    }

    let prevStepId = -1;
    expandedList.forEach((item) => {
        if (item < stepId) {
            if (prevStepId < item) {
                prevStepId = item;
            }
        }
    })
    return computeChild(stepId, prevStepId, solution.steps);
}

// sanitize expandList. If it is empty, set to default expansion
// (of root) from solution
export function sanitize(solution: Solution, expandList: ExpandList): ExpandList {
    if (!solution?.rootExpansion) {
        return expandList;
    }
    if (expandList.length == 0) {
        return solution.rootExpansion;
    }
    return expandList;
}

export function getVisibleSteps(solution: Solution, expandList: ExpandList)
    : Array<SolutionStep> {
    return solution?.steps?.filter((_, index) => expandList.includes(index)) ?? [];
}

export type Summary = {
    pastAttempts?: number,
    successfulAttempts?: number;
}

export type Problem = {
    id: string;
    summary: Summary;
    problemStatement?: string
    solution?: string
}

export function processSteps(steps, rootExpansion) {
    // init
    rootExpansion.forEach((index) => {
        steps[index].level = 0;
        steps[index].alwaysVisible = true;
    })
}

export function parseTextToSolution(text: string): Solution {
    let stepsLevel = [];
    let steps = [];
    if (!text || !text.startsWith('  ')) {
        return getSolutionFromStepsAndStepLevel(steps, stepsLevel);
    }
    text = text.substr(2);
    steps = text.split('\n  ');

    for (let i = 0; i < steps.length; ++i) {
        const regMatch = RegExp('[\\S]+', 'g');
        const match = regMatch.exec(steps[i]);
        if (!match) {
            // empty string. set level to 0
            stepsLevel.push(0);
        } else {
            stepsLevel.push(match.index);
        }
        steps[i] = steps[i].substr(stepsLevel[i]);
    }

    return getSolutionFromStepsAndStepLevel(steps, stepsLevel);
}

export function parseSolutionToText(solution: Solution): string {
    return solution.steps.map((step) =>
        ' '.repeat(step.level + 2) + step.text).join('\n');
}

function getSolutionFromStepsAndStepLevel(steps: string[],
    stepsLevel: StepsLevel): Solution {
    if (steps.length != stepsLevel.length) {
        console.log("error in getSolutionFromStepsAndStepLevel,\
         step and stepLevel length mismatch");
    }
    let results = [];
    steps.forEach((elem, index) => {
        results.push({
            id: index,
            text: elem,
            level: stepsLevel[index],
            alwaysVisible: false
        })
    });

    let rootExpansion = computeChild(
        results.length /* current step id */,
        -1 /* previous step id */,
        results);

    processSteps(results, rootExpansion);

    return {
        steps: results,
        rootExpansion: rootExpansion
    };
}
