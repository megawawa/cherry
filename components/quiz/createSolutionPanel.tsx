import React, { useState } from "react";
import { parseTextToSolution, parseSolutionToText, Problem, Solution, ExpandList } from "../../libs/problem";
import { useAccountContext } from "../layout/accountContext";
import { SolutionPanel } from "./solution";
import TextareaAutosize from 'react-autosize-textarea';
import styles from '../../styles/Problem.module.css'
import { MathSymbolList } from "../mathSymbolList";
import { CommentsList } from "../../libs/quiz";
import { Form } from "react-bootstrap";

export default function CreateSolutionPanel({
    onSolutionTextUpdate, value, onUploadComment, commentsList,
    onHandleGetComment = async () => { }
}: {
    onSolutionTextUpdate: (value: string) => void, value?: string,
    onUploadComment?: (
        stepIndex: number, commentIndex: number, comment: string
    ) => Promise<void>,
    commentsList: CommentsList,
    onHandleGetComment?: (stepId: number) => Promise<void>
}) {
    const context = useAccountContext();

    let [solution, updateSolution] = useState<Solution>(
        parseTextToSolution(value ?? context?.problemData?.solution ?? ""));

    let [solutionText, updateSolutionText] = useState<string>(
        value ?? context?.problemData?.solution ?? "");

    const [expandList, updateExpandList] = useState<ExpandList>([]);

    const onSolutionTextAreaUpdate = (value) => {
        updateSolutionText(value);
        updateSolution(parseTextToSolution(value));
        onSolutionTextUpdate(value);
        updateExpandList([]);
    }

    const updateList = (list) => {
        console.log('updating...', list);
        updateExpandList(list);
    }

    const isValidSolution = () => {
        return solution?.steps?.length > 0;
    }

    const updateSolutionStep = (id: number, text: string) => {
        console.log("here", id, text);
        const ret = solution.steps.slice(0);
        ret[id].text = text;
        const newSolution = {
            rootExpansion: solution.rootExpansion,
            steps: ret,
        };
        updateSolutionText(
            parseSolutionToText(newSolution)
        );
        updateSolution(newSolution);
    }

    return (
        <div className={styles.parseSolutionContainer}>
            <div className={styles.parseSolutionContainerItem}>
                <div>
                    Input your solution here:
                </div>
                <MathSymbolList handleTextUpdate={
                    (addedText) => {
                        onSolutionTextAreaUpdate(solutionText + addedText);
                    }
                } />
                <TextareaAutosize
                    className={!isValidSolution() ? styles.Invalid : styles.Valid}
                    style={{ width: "100%" }}
                    value={solutionText}
                    placeholder={"Try the following example:\n\
                    \n  step 1\n   step 1.a\n   step 1.b\n  step 2"}
                    rows={13}
                    onChange={(event) => {
                        onSolutionTextAreaUpdate(
                            (event.target as HTMLTextAreaElement).value);
                    }} />
            </div>
            {!isValidSolution() && (
                <Form.Text style={{ color: "red" }}>
                    Invalid solution input. Please make sure solution input
                    starts with two empty spaces, for example: "  step 1".
                    (<a style={{textDecoration: "underline"}}
                        onClick={() => {
                        onSolutionTextAreaUpdate(
                            "  example step 1\n   example step 1.a\
                            \n   example step 1.b\n  example step 2"
                        );
                    }}>Click here to prefill solution input with example</a>)
                </Form.Text>)}
            <div className={styles.parseSolutionContainerItem}>
                <div>
                    Preview:
                </div>
                <SolutionPanel solution={solution}
                    updateSolutionStep={updateSolutionStep}
                    expandList={expandList}
                    commentsList={commentsList}
                    updateExpandList={updateExpandList}
                    onUploadComment={onUploadComment}
                    onHandleGetComment={onHandleGetComment} />
            </div>

        </div>
    );
}