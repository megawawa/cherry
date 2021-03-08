import { ProblemPreviewType } from "../../libs/quiz";
import styles from '../../styles/BrowseQuiz.module.css'
import { Problem } from "../../libs/problem";
import React, { useState } from "react";
import { Card, Button, Form, FormCheck, DropdownButton, Dropdown } from "react-bootstrap";
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
                            Submitted by user: {" "}
                            <Link href={`/profile/${quiz.submitUserId}`}>
                                <a>{quiz.submitUserName}</a>
                            </Link>
                        </div>)}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>;
}

export default function QuizzesPanel({ quizzes, displayUser }:
    { quizzes: Array<ProblemPreviewType>, displayUser: boolean }) {
    const quizPanels =
        (quizzes?.length > 0) ? (
            quizzes?.map((quiz) =>
                <QuizPanel quiz={quiz} key={quiz.id} displayUser={displayUser} />)
        ) : (<div>
            You have reached the end of the quiz list. Express your interest
            and get notified when we have new quizzes!
        </div>);

    const [isStudentMode, setIsStudentMode] = useState<boolean>(true);

    const onSwitchAction = () => {
        setIsStudentMode(!isStudentMode);
        return;
    };

    return <div className={styles.quizPreviewList}>
        <div style={{
            justifyContent: "space-between",
            flexDirection: "row",
            display: "flex",
            marginTop: "1rem",
        }}>
            <span className={styles.mainHeader}>Quizzes
            </span>
            <div style={{
                justifyContent: "flex-end",
                flexDirection: "row",
                display: "flex",
                marginTop: "1rem",
            }}>
                <DropdownButton variant="info" id="dropdown-basic-button" style={
                    {
                        marginRight: "1rem",
                    }} title={
                        isStudentMode ? "Student Mode" : "Tutor Mode"}>
                    <Dropdown.Item onClick={onSwitchAction}>{
                        !isStudentMode ? "Student Mode" : "Tutor Mode"}</Dropdown.Item>
                </DropdownButton>
                <Button id="follow" variant="primary">
                    Follow</Button>
            </div>
        </div>

        {quizPanels}</div>;
}