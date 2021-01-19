import { getProblemFromTags, ProblemPreviewType } from "../../libs/mockDb";
import styles from '../../styles/BrowseQuiz.module.css'
import { Problem } from "../../libs/problem";
import React from "react";
import { Card } from "react-bootstrap";
import Link from "next/link";

function QuizPanel({ quiz }: { quiz: ProblemPreviewType }) {
    return <div>
        <Card className={styles.card}>
            <Card.Body>
                <Card.Text>
                    <Link href={`/problems/${quiz.id}`}>
                        {quiz.problemStatement}
                    </Link>
                    <div>
                        Submitted by user: {quiz.submitUserId}</div>
                </Card.Text>
            </Card.Body>
        </Card>
    </div>;
}

export default function QuizzesPanel({ quizzes }:
    { quizzes: Array<ProblemPreviewType> }) {
    const quizPanels = quizzes?.map((quiz) =>
        <QuizPanel quiz={quiz} key={quiz.id} />);

    return <div className={styles.quizPreviewList}>{quizPanels}</div>;
}