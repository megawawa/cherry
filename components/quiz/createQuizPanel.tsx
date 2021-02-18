import React, { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import CreateSolutionPanel from "./createSolutionPanel";
import styles from '../../styles/Problem.module.css'

type QuizCreateFormType = {
    problemStatement?: string,
    intro?: string,
    email?: string,
    phone?: string,
    otherContact?: string,
    partialSolution?: string,
    solution?: string,
}

export default function CreateQuizPanel({ }) {
    let [state, setState] = useState({ text: "Select reason", index: -1 });

    let [quiz, setQuiz] = useState<QuizCreateFormType>();

    const handleChange = (event) => {
        setQuiz({
            ...quiz,
            [event.target.name]: event.target.value
        });
    };

    const updateSolution = (event) => {
        setQuiz({
            ...quiz,
            solution: event.target.value
        });
    };

    const prompts = [
        "I don't know how to get started",
        "I am solving it halfway through, and I got stuck",
        "I have standard answer, but I can't understand certain steps",
    ]

    const items = prompts.map((text, index) =>
        <Dropdown.Item onClick={() => {
            setState({
                text: text, index: index
            });
        }} key={index}>
            {text}
        </Dropdown.Item>
    );

    let solutionInput = null;
    if (state.index == 1) {
        solutionInput = <div>
            Share your partial solution:
            <Form.Control as="textarea" rows={3} className={styles.createQuizFormInput}
                placeholder="Partial solution here"
                name="partialSolution"
                value={quiz?.partialSolution ?? ''}
                onChange={handleChange} />
        </div>;
    } else if (state.index == 2) {
        solutionInput = <CreateSolutionPanel onTextUpdate={updateSolution} />;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch(
            '/api/uploadQuiz',
            {
                body: JSON.stringify(
                    quiz
                ),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )

        const result = await res.json();
        console.log("quiz update: ", result);
    };

    return <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="problemStatement">
                <Form.Label>Problem</Form.Label>
                <Form.Control as="textarea" rows={3} className={styles.createQuizFormInput}
                    placeholder="problem statement. eg: 1/2 + 1/6 + ... + 1/(40*41) = ?"
                    name="problemStatement"
                    value={quiz?.problemStatement ?? ''}
                    onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formattedSolution">
                <div style={{ display: "inline-block" }}>I need help because:</div>
                <Dropdown className="ml-2" style={{ display: "inline-block" }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {state.text}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {items}
                    </Dropdown.Menu>
                </Dropdown>
            </Form.Group>

            <Form.Group controlId="solution">
                {solutionInput}
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-2">
                Save
            </Button>
        </Form>

    </div>;
}