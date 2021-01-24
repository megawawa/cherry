import React, { useState } from "react";
import { getProblemById, parseTextToSolution, Problem, Solution } from "../../libs/problem";
import { useAccountContext } from "../layout/accountContext";
import { SolutionPanel } from "./solution";
import TextareaAutosize from 'react-autosize-textarea';
import styles from '../../styles/Problem.module.css'

export default function CreateSolutionPanel() {
    const context = useAccountContext();

    let [solution, updateSolution] = useState<Solution>(
        context?.problemData?.solution);

    let [solutionText, updateSolutionText] = useState<string>();

    const onSolutionTextUpdate = (event) => {
        updateSolutionText(event.target.value);
        updateSolution(parseTextToSolution(event.target.value));
    }

    const updateSolutionStep = (id: number, text: string) => {
        const ret = solution.steps.slice(0);
        ret[id].text = text;
        updateSolution({
            stepsTree: solution.stepsTree,
            steps: ret,
        });
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
                    placeholder="
                    Try the following example:
                    step 1
                    --step 2
                    ---step 3
                    --step 4"
                    rows={13}
                    onChange={onSolutionTextUpdate} />
            </div>
            <div className={styles.parseSolutionContainerItem}>
                <div>
                    Preview:
                </div>
                <SolutionPanel solution={solution}
                    updateSolutionStep={updateSolutionStep} />
            </div>

        </div>
    );
}