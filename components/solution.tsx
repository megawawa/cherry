import { useEffect, useState } from 'react';
import { Solution, ExpandList, getVisibleSteps, getExpandedSteps, sanitize } from '../libs/problem'
import styles from '../styles/Problem.module.css'

function SolutionStep({ value, onClick }) {
    return <div className={styles.stepContainer}>
        <button className={styles.expandButton} onClick={onClick}>
            <img className={styles.buttonImg}
                src="/add.svg"
                alt="my image" />
        </button>
        <div className={styles.step}>solution step: {value}</div>
    </div>;
}

// no pagination, assuming solution is fetched once
export function SolutionPanel({ solution, expandList = [] }
    : { solution: Solution, expandList?: ExpandList }) {
    const [expandListState, updateExpandList] = useState<ExpandList>(
        sanitize(solution, expandList));

    // derive updated state from props
    useEffect(() => {
        updateExpandList(sanitize(solution, expandList));
    }, [solution]);

    const solutionSteps = getVisibleSteps(solution, expandListState);
    const newlyExpandedSteps = (id: number) => {
        console.log(expandListState.concat(getExpandedSteps(solution, id)));
        updateExpandList(expandListState.concat(getExpandedSteps(solution, id)));
    }
    var solutionItems = solutionSteps.map(
        (solutionStep) =>
            <SolutionStep
                key={solutionStep.id}
                value={solutionStep.text}
                onClick={newlyExpandedSteps.bind(this, solutionStep.id)} />
    )
    return <div>{solutionItems}</div>;
}