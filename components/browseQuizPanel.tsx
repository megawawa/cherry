import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useAccountContext } from "./layout/accountContext";
import InputButtonList from "./libs/inputButtonList";
import { PaginationFooter } from "./libs/paginationFooter";
import QuizzesPanel from "./quiz/quizPanel";

export default function BrowseQuizPanel() {
    let state = useAccountContext();

    const router = useRouter();

    const buttons = state.tags?.map((tag) =>
        <Button variant="secondary" className="ml-2"
            key={tag}>{tag}</Button>);

    const handleUpdateIndex = (index) => {
        state.update({
            quizzesIndex: index
        });

        router.push(
            `/quizzes/${index}`
        );
    };

    return <div>
        <div>
            Hot topics
            <InputButtonList tags={state.tags} onUpdate={(tagsState) => {
                state.update({
                    tags: tagsState
                });
            }} />
        </div>
        <QuizzesPanel quizzes={state.quizzes} displayUser={true} />
        <PaginationFooter current={state.quizzesIndex}
            onUpdateIndex={handleUpdateIndex} />
    </div>;
}