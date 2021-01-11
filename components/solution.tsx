import { Solution, ExpandList, getVisibleSteps } from '../libs/problem'

export function SolutionStep({ value }) {
    return <div>solution step: {value}</div>;
}

// no pagination, assuming solution is fetched once
export function SolutionPanel({ solution, expandList = [] }
    : { solution: Solution, expandList?: ExpandList }) {
    const solutionSteps = getVisibleSteps(solution, expandList);

    var solutionItems = solutionSteps.map(
        (solutionStep) =>
            <SolutionStep key={solutionStep.id} value={solutionStep.text} />
    )
    return <div>{solutionItems}</div>;
}