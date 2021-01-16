import { Card, Button } from 'react-bootstrap';
import styles from '../styles/Home.module.css'
import loginStyles from '../styles/Login.module.css'
import SignUpForm from '../components/signUpForm'

export default function SignUpPage() {
    return <main className={styles.main + ' ' + loginStyles.background}>
        <div className={loginStyles.grid}>
            <Card className={styles.card + ' p-3'}>
                <SignUpForm />
            </Card>

            <div className={loginStyles.featuresGrid}>
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
                            <Button variant="primary" href="/login">Enable Student Features</Button>
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
                            <Button variant="primary" href="/login">Enable Tutor Features</Button>
                            <div className={styles.priceTag}>Free </div>
                        </div>

                    </Card.Body>
                </Card>
            </div>
        </div>

        <div className={styles.textContainer}>
            <div>
                Welcome, have you quizzed today?
            </div>
        </div>
    </main>;
}