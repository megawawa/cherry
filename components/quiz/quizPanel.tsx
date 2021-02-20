import { ProblemPreviewType } from "../../libs/mongoDb";
import styles from '../../styles/BrowseQuiz.module.css'
import { Problem } from "../../libs/problem";
import React from "react";
import { Card } from "react-bootstrap";
import Link from "next/link";

function QuizPanel({ quiz, displayUser }:
    { quiz: ProblemPreviewType, displayUser: boolean }) {
    return <div>
        <Card className={styles.card}>
            <Card.Body>
                <Card.Text>
                    <Link href={`/problems/${quiz.id}`}>
                        <a>{quiz.problemStatement}</a>
                    </Link>
                    {displayUser &&
                        (<div>
                            Submitted by user: {quiz.submitUserName}
                        </div>)}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>;
}

export default function QuizzesPanel({ quizzes, displayUser }:
    { quizzes: Array<ProblemPreviewType>, displayUser: boolean }) {
    const quizPanels = quizzes?.map((quiz) =>
        <QuizPanel quiz={quiz} key={quiz.id} displayUser={displayUser} />);

    return <div className={styles.quizPreviewList}>{quizPanels}</div>;
}