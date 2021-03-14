import React, { useEffect, useState } from 'react';
import { Solution, ExpandList, getVisibleSteps, getStepsToExpandFromId, sanitize } from '../../libs/problem'
import styles from '../../styles/Problem.module.css'
import TextareaAutosize from 'react-autosize-textarea';
import { Button, FormControl, InputGroup, OverlayTrigger, Popover, PopoverProps } from 'react-bootstrap';
import { Comments, CommentsList, Comment } from '../../libs/quiz';
import { useSession } from 'next-auth/client';
import Link from 'next/link';

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

function PastComment({ comment }: {
    comment: Comment
}) {
    return <div>
        <Link href={`/profile/${comment.id}`}>
            <a>{comment.username}</a>
        </Link>
        <span>{":  "}</span>
        {comment.comment}
    </div>;
}

function CommentPanel({ comments, uploadComment }: {
    comments: Comments,
    uploadComment: (comment: string) => void,
}) {
    const [state, updateState] = useState<string>();

    const handleChange = (event) => {
        updateState(event.target.value);
    }

    return (
        <>
            <Popover.Title as="h3">Comment here</Popover.Title>
            <Popover.Content>
                {comments && comments.map((comment) => (
                    <div>
                        <PastComment comment={comment} />
                    </div>))}

                <InputGroup size="sm" className="mb-3">
                    <TextareaAutosize
                        value={state ?? ''}
                        onChange={handleChange}
                    />
                    <InputGroup.Append>
                        <Button id="inputGroup-sizing-sm"
                            onClick={() => {
                                uploadComment(state);
                                updateState("");
                            }}>
                            Send
                        </Button>
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
    onEditStep, comments,
    uploadComment,
    onHandleGetComment,
}: {
    value: string, onClick: () => void, alwaysVisible: boolean,
    indent: number, expanded: boolean, hasChild: boolean,
    onEditStep: (string) => void, comments: Comments
    uploadComment: (string) => void,
    onHandleGetComment: () => Promise<void>,
}) {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log("loading for step", loading, value);
        if (loading) {
            onHandleGetComment();
        }
        setLoading(false);
    }, [loading]);

    return (<div style={{
        display: "flex", alignItems: "center",
        flexDirection: "column", justifyContent: 'flex-start'
    }}>
        {hasChild &&
            <button className={styles.expandButton} onClick={onClick}
                type="button">
                <img className={styles.buttonImg}
                    src={"/add.svg"}
                    alt="my image" />
            </button>}
        <div className={styles.stepContainer}>
            <div style={{ "width": indent * 2 + "rem" }}></div>
            <div className={styles.step +
                (alwaysVisible ? (' ' + styles.alwaysVisibleStep) : '')}>
                {onEditStep ?
                    <div className={styles.stepInput}>
                        <TextareaAutosize className={styles.stepInputText}
                            onChange={(event) => {
                                onEditStep(
                                    (event.target as HTMLTextAreaElement).value);
                            }} value={value}>
                        </TextareaAutosize>
                    </div> :
                    <div className={styles.stepText}>
                        {value}
                    </div>
                }
            </div>
            <OverlayTrigger trigger="click" placement="right" rootClose overlay={
                <UpdatingPopover id="popover-basic" style={{ minWidth: "400px" }}>
                    <CommentPanel comments={comments} uploadComment={uploadComment} />
                </UpdatingPopover>}>
                <div style={{ marginLeft: "auto" }}>
                    <button className={styles.commentButton} onClick={() => {
                        onHandleGetComment();
                    }}
                        type="button">
                        <img className={(comments?.length > 0) ?
                            styles.commentImgHasComment : styles.commentImg}
                            src={"/comment.svg"}
                            alt="my image" />
                    </button>
                </div>
            </OverlayTrigger >
        </div >
    </div>);
}

function convertToBoolArray(list) {
    return new Array<boolean>(list.length).fill(false);
}

// no pagination, assuming solution is fetched once
export function SolutionPanel({ solution, commentsList, expandList = [],
    updateSolutionStep,
    updateExpandList = () => { },
    onUploadComment,
    onHandleGetComment,
}
    : {
        solution: Solution, expandList?: ExpandList,
        updateSolutionStep?: (number, string) => void,
        updateExpandList?: (ExpandList) => void,
        commentsList: CommentsList,
        onUploadComment?: (
            stepIndex: number, commentIndex: number, comment: string
        ) => Promise<void>,
        onHandleGetComment: (stepId: number) => Promise<void>
    }) {
    const [expandListState, updateExpandListState] = useState<ExpandList>(
        sanitize(solution, expandList));
    const [session] = useSession();

    const [commentsListState, updateCommentsListState] = useState<CommentsList>(
        commentsList ?? []
    );

    useEffect(() => {
        updateCommentsListState(commentsList)
    }, [commentsList]);

    const uploadComment = (index: number, comment: string) => {
        const dupList = commentsListState.slice(0);
        if (!dupList[index]) {
            dupList[index] = [];
        }
        dupList[index].push({
            comment: comment,
            username: session?.user?.name,
            id: session?.user?.id,
        });
        if (onUploadComment) {
            onUploadComment(
                index,
                dupList[index].length - 1,
                comment,
            );
        }
        updateCommentsListState(dupList);
    }

    const [expandStatusListState, updateExpandStatusListState] =
        useState<Array<boolean>>(convertToBoolArray(expandListState));

    // derive updated state from props
    useEffect(() => {
        updateExpandListState(sanitize(solution, expandList));
        updateExpandStatusListState(convertToBoolArray(expandListState));
    }, [solution.toString()]);

    const handleSolutionStepUpdate = (index, value) => {
        // need to commit expandList for parent class
        // so that rerender remembers current expandListState
        updateExpandList(expandListState);
        updateSolutionStep(index, value);
    }

    const solutionSteps = getVisibleSteps(solution, expandListState);
    const newlyExpandedSteps = (id: number) => {
        const expanded = expandStatusListState[id];

        // flip expanded
        const updatedStatusList = expandStatusListState.slice(0);
        updatedStatusList[id] = !expanded;
        updateExpandStatusListState(updatedStatusList);

        // union
        updateExpandListState((prevExpandList) => Array.from(new Set(
            prevExpandList.concat(
                getStepsToExpandFromId(solution, id, prevExpandList)))));

        return;
    }

    var solutionItems = solutionSteps.map(
        (solutionStep, index) =>
            <SolutionStep
                key={solutionStep.id}
                value={solutionStep.text}
                indent={solutionStep.level}
                hasChild={getStepsToExpandFromId(solution,
                    solutionStep.id, expandListState)
                    .length != 0}
                alwaysVisible={solutionStep.alwaysVisible}
                expanded={expandStatusListState[solutionStep.id]}
                onClick={newlyExpandedSteps.bind(this, solutionStep.id)}
                onEditStep={handleSolutionStepUpdate?.bind(this, solutionStep.id)}
                comments={commentsListState[index]}
                uploadComment={(comment: string) => { uploadComment(index, comment); }}
                onHandleGetComment={onHandleGetComment.bind(this, solutionStep.id)} />
    )
    return <div>
        {solutionItems}
        {(solution.steps.length > 0) && (<Button variant="primary" onClick={() => {
            // reset to default expansion state
            updateExpandListState(
                sanitize(solution, []));
        }} className="mt-2">
            Collapse All
        </Button>)}
    </div>;
}