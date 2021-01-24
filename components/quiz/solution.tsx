import React, { useEffect, useState } from 'react';
import { Solution, ExpandList, getVisibleSteps, getStepsToExpandFromId, sanitize } from '../../libs/problem'
import styles from '../../styles/Problem.module.css'
import TextareaAutosize from 'react-autosize-textarea';
import { FormControl, InputGroup, OverlayTrigger, Popover, PopoverProps } from 'react-bootstrap';

const UpdatingPopover = React.forwardRef<HTMLButtonElement, PopoverProps>(
    ({ popper, children, show: _, ...props }, ref) => {
        useEffect(() => {
            console.log('updating!');
            popper.scheduleUpdate();
        }, [children, popper]);

        return (
            <Popover ref={ref} content {...props}>
                {children}
            </Popover>
        );
    },
);

function CommentPanel() {
    return (
        <>
            <Popover.Title as="h3">Comment here</Popover.Title>
            <Popover.Content>
                Can someone <strong>help</strong> me? I got stuck here
                <InputGroup size="sm" className="mb-3">
                    <TextareaAutosize />
                    <InputGroup.Append>
                        <InputGroup.Text id="inputGroup-sizing-sm">Send</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </Popover.Content>
        </>
    );
}

// alwaysVisible element skips initial rendering effect
function SolutionStep({
    value, onClick, indent,
    expanded, hasChild, alwaysVisible,
    onEditStep,
}: {
    value: string, onClick: () => void, alwaysVisible: boolean,
    indent: number, expanded: boolean, hasChild: boolean,
    onEditStep: (string) => void
}) {
    return <div className={styles.stepContainer}>
        <div style={{ "width": indent * 0.5 + "rem" }}></div>
        {hasChild ?
            <button className={styles.expandButton} onClick={onClick}
                type="button">
                <img className={styles.buttonImg}
                    src={expanded ? "/minus.svg" : "/add.svg"}
                    alt="my image" />
            </button> :
            <div className={styles.expandButtonPlaceholder}></div>}
        <div className={styles.step +
            (alwaysVisible ? (' ' + styles.alwaysVisibleStep) : '')}>
            {onEditStep ?
                <div className={styles.stepInput}>
                    <TextareaAutosize className={styles.stepInputText}
                        onChange={() => { }} value={value}>
                    </TextareaAutosize>
                </div> :
                <div className={styles.stepText}>
                    {value}
                </div>
            }
        </div>
        <OverlayTrigger trigger="click" placement="right" rootClose overlay={
            <UpdatingPopover id="popover-basic" style={{ minWidth: "400px" }}>
                <CommentPanel />
            </UpdatingPopover>}>
            <div style={{ marginLeft: "auto" }}>
                <button className={styles.commentButton} onClick={() => { }}
                    type="button">
                    <img className={styles.commentImg}
                        src={"/comment.svg"}
                        alt="my image" />
                </button>
            </div>
        </OverlayTrigger >
    </div >;
}

function convertToBoolArray(list) {
    return new Array<boolean>(list.length).fill(false);
}

// no pagination, assuming solution is fetched once
export function SolutionPanel({ solution, expandList = [], updateSolutionStep }
    : {
        solution: Solution, expandList?: ExpandList,
        updateSolutionStep?: (number, string) => void
    }) {
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
                expandListState.concat(getStepsToExpandFromId(solution, id)))));
            return;
        }

        // diff.
        // TODO(@megawawa, 1/11/2021) could collapse all.
        // for now not needed for demo purpose
        updateExpandList(Array.from(new Set(
            expandListState.filter(
                (elem) => !getStepsToExpandFromId(solution, id).includes(elem)
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
                onClick={newlyExpandedSteps.bind(this, solutionStep.id)}
                onEditStep={updateSolutionStep?.bind(solutionStep.id)} />
    )
    return <div>{solutionItems}</div>;
}