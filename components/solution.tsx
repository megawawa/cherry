import { useEffect, useState } from 'react';
import { Solution, ExpandList, getVisibleSteps, getExpandedSteps, sanitize } from '../libs/problem'
import styles from '../styles/Problem.module.css'

function SolutionStep({
    value, onClick, indent,
    expanded, hasChild, alwaysVisible
}: {
    value: string, onClick: () => void, alwaysVisible: boolean
    indent: number, expanded: boolean, hasChild: boolean
}) {
    return <div className={styles.stepContainer}>
        <div style={{ "width": indent * 0.5 + "rem" }}></div>
        {hasChild ?
            <button className={styles.expandButton} onClick={onClick}>
                <img className={styles.buttonImg}
                    src={expanded ? "/minus.svg" : "/add.svg"}
                    alt="my image" />
            </button> :
            <div className={styles.expandButtonPlaceholder}></div>}
        <div className={styles.step +
            (alwaysVisible ? (' ' + styles.alwaysVisibleStep) : '')}>
            {value}
        </div>
    </div>;
}

function convertToBoolArray(list) {
    return new Array<boolean>(list.length).fill(false);
}

// no pagination, assuming solution is fetched once
export function SolutionPanel({ solution, expandList = [] }
    : { solution: Solution, expandList?: ExpandList }) {
    const [expandListState, updateExpandList] = useState<ExpandList>(
        sanitize(solution, expandList));
    const [expandStatusListState, updateExpandStatusListState] =
        useState<Array<boolean>>(convertToBoolArray(expandListState));

    // derive updated state from props
    useEffect(() => {
        updateExpandList(sanitize(solution, expandList));
        updateExpandStatusListState(convertToBoolArray(expandListState));
    }, [solution]);

    const solutionSteps = getVisibleSteps(solution, expandListState);
    const newlyExpandedSteps = (id: number) => {
        const expanded = expandStatusListState[id];

        // flip expanded
        const updatedStatusList = expandStatusListState.slice(0);
        updatedStatusList[id] = !expanded;
        updateExpandStatusListState(updatedStatusList);

        // union
        if (!expanded) {
            updateExpandList(Array.from(new Set(
                expandListState.concat(getExpandedSteps(solution, id)))));
            return;
        }

        // diff.
        // TODO(@megawawa, 1/11/2021) could collapse all.
        // for now not needed for demo purpose
        updateExpandList(Array.from(new Set(
            expandListState.filter(
                (elem) => !getExpandedSteps(solution, id).includes(elem)
            ))));
    }
    var solutionItems = solutionSteps.map(
        (solutionStep) =>
            <SolutionStep
                key={solutionStep.id}
                value={solutionStep.text}
                indent={solutionStep.level}
                hasChild={solutionStep.hasChild}
                alwaysVisible={solutionStep.alwaysVisible}
                expanded={expandStatusListState[solutionStep.id]}
                onClick={newlyExpandedSteps.bind(this, solutionStep.id)} />
    )
    return <div>{solutionItems}</div>;
}