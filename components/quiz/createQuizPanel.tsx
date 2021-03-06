import { useRouter } from 'next/router';
import { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";

import CreateSolutionPanel from "./createSolutionPanel";
import styles from '../../styles/Problem.module.css';
import { QuizCreateFormType } from '../../libs/quiz';
import InputButtonList from '../libs/inputButtonList';
import { useAccountContext } from '../layout/accountContext';
import { triggerAsyncId } from 'async_hooks';
import { parseTextToSolution } from '../../libs/problem';


export default function CreateQuizPanel({ isTutor }: { isTutor: boolean }) {
    // if isTutor, need to go to mode 2 -- directly providing solution
    let [state, setState] = useState({ text: "Select reason", index: isTutor ? 2 : -1 });

    let accountState = useAccountContext();

    const router = useRouter();

    let [quiz, setQuiz] = useState<QuizCreateFormType>();

    const handleChange = (event) => {
        setQuiz({
            ...quiz,
            [event.target.name]: event.target.value
        });
    };

    const updateSolution = (value: string) => {
        setQuiz({
            ...quiz,
            solution: value
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
        // disallow comment editing when creating quiz
        solutionInput = <CreateSolutionPanel onSolutionTextUpdate={updateSolution}
            commentsList={[]} />;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch(
            '/api/uploadQuiz',
            {
                body: JSON.stringify(
                    {
                        quiz: quiz,
                        tags: accountState.tags ?? [],
                    }
                ),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )

        const result = await res.json();
        console.log("quiz update: ", result);
        router.push('/profile');
    };

    const isValidProblemStatement = () => {
        return (quiz?.problemStatement ?? '') != '';
    }

    const isValidTags = () => {
        return accountState?.tags?.length >= 2 && (accountState?.tags?.length <= 8);
    }

    const isValidSolution = () => {
        // we are doing double parsing text to solution here:
        // once here, and once in createSolutionPanel
        // however performance is not a big concern.
        if (state.index != 2) {
            return true;
        }
        return parseTextToSolution(quiz?.solution ?? ' ')?.steps?.length > 0;
    }

    return <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId={`problemStatement_${isTutor}`}>
                <Form.Label>Problem</Form.Label>
                <Form.Control
                    isValid={isValidProblemStatement()}
                    isInvalid={!isValidProblemStatement()}
                    as="textarea" rows={3} className={styles.createQuizFormInput}
                    placeholder="problem statement. eg: 1/2 + 1/6 + ... + 1/(40*41) = ?"
                    name="problemStatement"
                    value={quiz?.problemStatement ?? ''}
                    onChange={handleChange} />
                {!isValidProblemStatement() && (
                    <Form.Text style={{ color: "red" }}>
                        Problem statement couldn't be empty
                    </Form.Text>)}
            </Form.Group>

            {!isTutor &&
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
                </Form.Group>}

            <Form.Group controlId="solution">
                {solutionInput}
            </Form.Group>

            <div>
                Tags:
                <InputButtonList tags={accountState.tags ?? []}
                    onUpdate={(tagsState) => {
                        accountState.update({
                            tags: tagsState
                        });
                    }}
                    valid={isValidTags()}
                    name="create-quiz-panel" />
                {!isValidTags() && (
                    (accountState?.tags?.length >= 8) ? (
                        <Form.Text style={{ color: "red" }}>
                            Too many tags
                        </Form.Text>) :
                        <Form.Text style={{ color: "red" }}>
                            Please provide at least 2 tags to make the quiz easier to find.
                            Good tags would cover the quiz topic/concept, e.g. "math", "linear algebra", "metrix multiplication"
                    </Form.Text>)}
            </div>

            <Button variant="primary" type="submit" className="mt-2"
                disabled={!isValidProblemStatement() || !isValidTags()
                    || !isValidSolution()}>
                Submit
            </Button>
        </Form>

    </div >;
}