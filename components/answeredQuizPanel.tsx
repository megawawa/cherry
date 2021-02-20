import React from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { useAccountContext } from "./layout/accountContext";
import QuizzesPanel from "./quiz/quizPanel";
import styles from '../styles/BrowseQuiz.module.css'

export default function BrowseQuizPanel() {
    let state = useAccountContext();

    return <Accordion defaultActiveKey="0">
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Submitted quizzes:
        </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <QuizzesPanel quizzes={state.quizzes} displayUser={false} />
                </Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Answered quizzes
        </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
                <Card.Body>not implemented</Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>;
}