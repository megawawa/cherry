import React from "react";
import { Button, Card } from "react-bootstrap";
import styles from '../styles/Home.module.css'

export default function FeaturesPanel({ handleChange, state }) {
    return (
        <>
            <Card className={styles.card}>
                <Card.Body>
                    <Card.Title>Student Features</Card.Title>
                    <Card.Text>
                        You can enable student features at any time
            </Card.Text>
                    <Card.Text>
                        - browse quizzes & tests,
            </Card.Text>
                    <Card.Text>
                        - ask questions
            </Card.Text>
                    <Card.Text>
                        - have access to all registered tutors
            </Card.Text>
                    <div className={styles.cardFooter}>
                        <Button variant={state?.isStudent ? "success" : "primary"}
                            onClick={() => {
                                handleChange('student');
                            }}>
                            {state?.isStudent ? "Student Features Enabled"
                                : "Enable Student Features"}</Button>
                        <div className={styles.priceTag}>Free </div>
                    </div>

                </Card.Body>
            </Card>

            <Card className={styles.card}>
                <Card.Body>
                    <Card.Title>Tutor Features</Card.Title>
                    <Card.Text>
                        You can enable tutor features at any time
            </Card.Text>
                    <Card.Text>
                        - answer questions
            </Card.Text>
                    <Card.Text>
                        - create problem sets & quizzes
            </Card.Text>
                    <Card.Text>
                        - your profile would be visible to all the students
            </Card.Text>
                    <div className={styles.cardFooter}>
                        <Button variant={state?.isTutor ? "success" : "primary"}
                            onClick={() => {
                                handleChange('tutor');
                            }}>
                            {state?.isTutor ? "Tutor Features Enabled"
                                : "Enable Tutor Features"}</Button>
                        <div className={styles.priceTag}>Free </div>
                    </div>

                </Card.Body>
            </Card>
        </>
    );
}