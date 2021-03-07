import styles from '../../../styles/Home.module.css'
import { Card, Button, Jumbotron } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';

export default function StudentJumbotron({ isIntro }: {
    isIntro: boolean;
}) {
    return <Jumbotron className={styles.mainLeft}>
        <div className={styles.containerLeftPaddingLeft} />
        <div className={styles.containerLeftWrap}>
            <div className={styles.containerTextWrap}>
                <div className={styles.containerLeft}>
                    <h1>Hello, Student</h1>
                    <p></p>
                    <div className={styles.textBox}>
                        <p>
                            <span>
                                Take personalized quizzes, </span>
                        </p>
                        <p>
                            <span>
                                Get answers,</span>
                        </p>
                        <p>
                            <span>
                                Pick tutors,</span>
                        </p>
                        <p>
                            <span>{"for "}</span>
                            <span className={styles.highlightCardText}>Free</span>
                        </p>
                    </div>
                    {isIntro &&
                        <Link href="/signup?student=1" passHref>
                            <Button variant="outline-dark" className={styles.button}
                            >Sign up Now</Button>
                        </Link>}
                </div>
                <div className={styles.containerLeftPaddingRight} />
            </div>
            {!isIntro &&
                <div className={styles.jumbotronInfoContainer}>
                    <Card className={styles.jumbotronInfoCard}>
                        <div className={styles.jumbotronLeftImageContainer}>
                            <Image src="/test.svg"
                                width={50} height={50} />
                        </div>
                        <Card.Body>
                            <Card.Title>1. Take quiz & self-test</Card.Title>
                            <Card.Text>
                                <p>Select topics you are interested in, and take quizzes
                                & tests!
                                </p>
                                <p>We will tailor quiz selection based on your past
                                performance.
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className={styles.jumbotronInfoCard}>
                        <div className={styles.jumbotronLeftImageContainer}>
                            <Image src="/ask-question.svg"
                                width={50} height={50} />
                        </div>
                        <Card.Body>
                            <Card.Title>2. Find solution</Card.Title>
                            <Card.Text>
                                <p>
                                    Need solution? Don't understand certain steps?
                                    Check out past discussions, or just ask!
                                </p>

                                <p>
                                    Comment on where you need help, and we have tutors
                                    answer for you, for free.
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className={styles.jumbotronInfoCard}>
                        <div className={styles.jumbotronLeftImageContainer}>
                            <Image src="/find-tutor.svg"
                                width={50} height={50} />
                        </div>
                        <Card.Body>
                            <Card.Title>3. Find tutor</Card.Title>
                            <Card.Text>
                                <p>Still have questions? Want to book a tutor session?
                                Find tutor based on your own rate and schedule.
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            }
        </div>
    </Jumbotron>;
}