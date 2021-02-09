import { Steps, StepsTree, computeStepLevel } from './problem'

export function getProcessedStepsAndStepTrees(steps, stepsTree): [Steps, StepsTree] {
    let results = [];
    steps.forEach((elem, index) => {
        results.push({
            id: index,
            text: elem,
            hasChild: false,
            alwaysVisible: false
        })
    });

    computeStepLevel(results, stepsTree);

    return [results, stepsTree];
}

export function getDefaultSolutionById(id: number): [Steps, StepsTree] {
    let steps = [
        '= 1/(1*2) + 1/(2*3) + 1/(3*4) + ... + 1/(40*41)',
        '= (1 - 1/2) + (1/2 - 1/3) + (1/3 - 1/4) + ... + (1/40 - 1/41)',
        '= 1 - 1/2 + 1/2 - 1/3 + 1/3 - 1/4 + ... + 1/40 - 1/41',
        '= 1 - 1/41',
        '= 40/41'];
    let stepsTree = [[], [0], [], [2], [3], [1, 4]];

    return getProcessedStepsAndStepTrees(steps, stepsTree);
}

export async function getProblemStatementById(id: number): Promise<string> {
    return "1/2 + 1/6 + 1/12 + ... + 1/(40*41) = ?"
}