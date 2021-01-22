import React, { useState } from "react";
import { getProblemById, Problem, Solution } from "../../libs/problem";
import { useAccountContext } from "../layout/accountContext";
import { SolutionPanel } from "./solution";

export default function CreateSolutionPanel() {
    const context = useAccountContext();

    let [solution, updateSolution] = useState<Solution>(
        context?.problemData?.solution);

    const updateSolutionStep = (id: number, text: string) => {
        const ret = solution.steps.slice(0);
        ret[id].text = text;
        updateSolution({
            stepsTree: solution.stepsTree,
            steps: ret,
        });
    }

    return <SolutionPanel solution={solution}
        updateSolutionStep={updateSolutionStep} />;
}