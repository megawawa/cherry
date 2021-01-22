import React, { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import CreateSolutionPanel from "./createSolutionPanel";


type QuizCreateFormType = {
    problemStatement?: string,
    intro?: string,
    email?: string,
    phone?: string,
    otherContact?: string,
    partialSolution?: string,
}

export default function CreateQuizPanel() {
    let [state, setState] = useState({ text: "Select reason", index: -1 });

    let [quiz, setQuiz] = useState<QuizCreateFormType>();

    const handleChange = (event) => {
        setQuiz({
            ...quiz,
            [event.target.name]: event.target.value
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
            <Form.Control as="textarea" rows={3} style={{ maxWidth: "70vw" }}
                placeholder="Partial solution here"
                name="partialSolution"
                value={quiz?.partialSolution ?? ''}
                onChange={handleChange} />
        </div>;
    } else if (state.index == 2) {
        solutionInput = <CreateSolutionPanel />;
    }

    return <div>
        <Form onSubmit={() => { }}>
            <Form.Group controlId="phone">
                <Form.Label>Problem</Form.Label>
                <Form.Control as="textarea" rows={3} style={{ maxWidth: "70vw" }}
                    placeholder="problem statement. eg: 1/2 + 1/6 + ... + 1/(40*41) = ?"
                    name="problemStatement"
                    value={quiz?.problemStatement ?? ''}
                    onChange={handleChange} />
            </Form.Group>

            <div>
                <div style={{ display: "inline-block" }}>I need help because:</div>
                <Dropdown className="ml-2" style={{ display: "inline-block" }}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {state.text}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {items}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {solutionInput}

            <Button variant="primary" type="submit" className="mt-2">
                Save
            </Button>
        </Form>

    </div>;
}