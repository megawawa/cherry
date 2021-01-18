import { Steps, StepsTree, computeStepLevel } from './problem'

export async function getSolutionById(id: number): Promise<[Steps, StepsTree]> {
    let steps = [
        '= 1/(1*2) + 1/(2*3) + 1/(3*4) + ... + 1/(40*41)',
        '= (1 - 1/2) + (1/2 - 1/3) + (1/3 - 1/4) + ... + (1/40 - 1/41)',
        '= 1 - 1/2 + 1/2 - 1/3 + 1/3 - 1/4 + ... + 1/40 - 1/41',
        '= 1 - 1/41',
        '= 40/41'];
    let stepsTree = [[], [0], [], [2], [3], [1, 4]];
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

export async function getProblemStatementById(id: number): Promise<string> {
    return "1/2 + 1/6 + 1/12 + ... + 1/(40*41) = ?"
}

// TODO(@megawawa, 2021/1/18) This needs to be rewritten when connect to actual
// backend.
export type ProblemPreviewType = {
    problemStatement?: string;
}
export function getProblemFromTags(tags: Array<string>):
    Array<ProblemPreviewType> {
    return [];
}