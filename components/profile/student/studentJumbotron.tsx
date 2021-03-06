import styles from '../../../styles/Home.module.css'
import { Card, Button, Jumbotron } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';

export default function StudentJumbotron({ isIntro }: {
    isIntro: boolean;
}) {
    return <Jumbotron className={styles.mainLeft}>
        <div className={styles.containerLeftWrap}>
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
            {!isIntro &&
                <div className={styles.jumbotronInfoContainer}>
                    <Card className={styles.jumbotronInfoCard}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                         </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className={styles.jumbotronInfoCard}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                         </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className={styles.jumbotronInfoCard}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                         </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            }
        </div>
    </Jumbotron>;
}