
import styles from '../../../styles/Home.module.css'
import { Card, Button, Jumbotron } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';


export default function TutorJumbotron({ isIntro }: {
    isIntro: boolean;
}) {
    return <Jumbotron className={styles.mainRight}>
        <div className={styles.containerRightWrap}>
            <div className={styles.containerRightTextWrap}>
                {isIntro &&
                    <div className={styles.containerRightPaddingLeft} />}
                <div className={styles.containerRight}>
                    <h1>Hello, Tutor</h1>
                    <p></p>
                    <div className={styles.textBox}>
                        <p>
                            <span>
                                We match you with students,  </span>
                        </p>
                        <p>
                            <span>
                                On your terms, </span>
                        </p>
                        <p>
                            <span> {"with "}</span>
                            <span className={styles.highlightCardTextRight}>{" Zero"}</span>
                            <span>{" commission fee"}</span>
                        </p>
                    </div>

                    {isIntro &&
                        <Link href="/signup?tutor=1" passHref>
                            <Button variant="outline-dark" className={styles.button}>
                                Sign up Now</Button>
                        </Link>}
                </div>
            </div>

            {!isIntro &&
                <div className={styles.jumbotronInfoContainer}>
                    <div className={styles.jumbotronInfoContainer}>
                        <Card className={styles.jumbotronInfoCard}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Take personalized </Card.Title>
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
                </div>
            }
        </div>
        <div className={styles.containerRightPaddingRight} />
    </Jumbotron>;
}