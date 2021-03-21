import { ProblemPreviewType } from "../../libs/quiz";
import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/client'
import { Card } from "react-bootstrap";
import { QuizPanel } from "./quizPanel";

export default function QuizzesHistoryPanel({ displayUser }:
    {
        displayUser: boolean,
    }) {
    const [session] = useSession();

    const [quizzes, setQuizzes] = useState<Array<ProblemPreviewType>>([]);

    useEffect(() => {
        (async () => {
            console.log("fetching quiz for user");
            const url = `/api/getQuizzes`;

            const res = await fetch(
                url,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'GET'
                }
            )

            let result = await res.json();
            console.log("fetched quiz for user: ", result);

            if (res.status != 200) {
                return;
            }

            result = result.map((quiz) => {
                if (quiz.submitTime) {
                    quiz.submitTime = new Date(quiz.submitTime);
                }
                return quiz;
            });

            setQuizzes(result);
        })();
    }, []);

    const quizPanels =
        (quizzes?.length > 0) ? (
            quizzes?.map((quiz) =>
                <QuizPanel quiz={quiz} key={quiz.id} displayUser={displayUser} />)
        ) : (<div>
            You haven't submitted any quizzes yet.
        </div>);

    const [isStudentMode, setIsStudentMode] = useState<boolean>(true);

    const onSwitchAction = () => {
        setIsStudentMode(!isStudentMode);
        return;
    };

    return <Card>
        <Card.Header>Submitted Quizzes</Card.Header>
        <Card.Body>
            {quizPanels}
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>;
}