import React from "react";
import { Button } from "react-bootstrap";
import { useAccountContext } from "./layout/accountContext";
import QuizzesPanel from "./quiz/quizPanel";

export default function BrowseQuizPanel() {
    let state = useAccountContext();
    
    const buttons = state.tags?.map((tag) =>
        <Button variant="secondary" className="ml-2"
            key={tag}>{tag}</Button>);

    return <div>
        <div>
            Hot topics
            {buttons}
        </div>
        <QuizzesPanel quizzes={state.quizzes} />
    </div>;
}