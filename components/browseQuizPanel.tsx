import React from "react";
import { Button } from "react-bootstrap";
import QuizzesPanel from "./quizPanel";

export default function BrowseQuizPanel({ tags }:
    { tags: Array<string> }) {
    const buttons = tags.map((tag) =>
        <Button variant="secondary" className="ml-2"
            key={tag}>{tag}</Button>);

    return <div>
        <div>
            Hot topics
            {buttons}
        </div>
        <QuizzesPanel tags={tags}/>
    </div>;
}