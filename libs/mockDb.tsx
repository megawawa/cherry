import { Steps, StepsTree } from './problem'

export async function getSolutionById(id: number): Promise<[Steps, StepsTree]> {
    let step0 = { id: 0, text: 'step0' };
    let step1 = { id: 1, text: 'step1' };
    let steps = [step0, step1];
    let stepsTree = [[], [0], [1]];

    return [steps, stepsTree];
}