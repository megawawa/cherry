import React, { useState } from "react";
import { parseTextToSolution, parseSolutionToText, Problem, Solution, ExpandList } from "../../libs/problem";
import { useAccountContext } from "../layout/accountContext";
import { SolutionPanel } from "./solution";
import TextareaAutosize from 'react-autosize-textarea';
import styles from '../../styles/Problem.module.css'

export default function CreateSolutionPanel({ onTextUpdate, value }: {
    onTextUpdate: (event: Event) => void, value?: string
}) {
    const context = useAccountContext();

    let [solution, updateSolution] = useState<Solution>(
        parseTextToSolution(value ?? context?.problemData?.solution ?? ""));

    let [solutionText, updateSolutionText] = useState<string>(
        value ?? context?.problemData?.solution ?? "");

    const [expandList, updateExpandList] = useState<ExpandList>([]);

    const onSolutionTextUpdate = (event) => {
        updateSolutionText(event.target.value);
        updateSolution(parseTextToSolution(event.target.value));
        onTextUpdate(event);
        updateExpandList([]);
    }

    const updateList = (list) => {
        console.log('updating...', list);
        updateExpandList(list);
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
                <TextareaAutosize
                    style={{ width: "100%" }}
                    value={solutionText}
                    placeholder={"Try the following example:\n\
                    \n  step 1\n   step 1.a\n   step 1.b\n  step 2"}
                    rows={13}
                    onChange={onSolutionTextUpdate} />
            </div>
            <div className={styles.parseSolutionContainerItem}>
                <div>
                    Preview:
                </div>
                <SolutionPanel solution={solution}
                    updateSolutionStep={updateSolutionStep}
                    expandList={expandList}
                    updateExpandList={updateExpandList} />
            </div>

        </div>
    );
}