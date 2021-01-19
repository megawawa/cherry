import React, { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";


type QuizCreateFormType = {
    problemStatement?: string,
    intro?: string,
    email?: string,
    phone?: string,
    otherContact?: string,
}

export default function CreateQuizPanel() {
    let [state, setState] = useState("Select reason");

    let [quiz, setQuiz] = useState<QuizCreateFormType>();

    const handleChange = (event) => {
        setQuiz({
            ...quiz,
            [event.target.name]: event.target.value
        });
    };

    const prompts = [
        "I don't know how to get started",
        "I am solving it halfway through, and I got stucked",
        "I have standard answer, but I can't understand certain steps",
    ]

    const items = prompts.map((text, index) =>
        <Dropdown.Item onClick={() => { setState(text); }} key={index}>
            {text}
        </Dropdown.Item>
    );

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
                        {state}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {items}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <Button variant="primary" type="submit" className="mt-2">
                Save
            </Button>
        </Form>

    </div>;
}