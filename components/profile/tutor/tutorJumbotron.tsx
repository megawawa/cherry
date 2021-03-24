
import styles from '../../../styles/Home.module.css'
import { Card, Button, Jumbotron } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';


export default function TutorJumbotron({ isIntro }: {
    isIntro: boolean;
}) {
    return <Jumbotron className={styles.mainRight}>
        <div className={styles.containerRightWrap}>
            <div className={styles.containerTextWrap}>
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
                            <span>
                                {" "}&nbsp;</span>
                        </p>
                        <p>
                            <span> {"with "}</span>
                            <span className={styles.highlightCardTextRight}>{" Zero"}</span>
                            <span>{" commission fee"}</span>
                        </p>
                    </div>

                    {isIntro &&
                        <Link href="/signup?tutor=1" passHref>
                            <Button variant="outline-light" className={styles.buttonRight}>
                                Sign up Now</Button>
                        </Link>}
                </div>
            </div>

            {!isIntro &&
                <div className={styles.jumbotronInfoContainer}>
                    <div className={styles.jumbotronInfoContainer}>
                        <Card className={styles.jumbotronInfoCardDark}>
                            <div className={styles.jumbotronRightImageContainer}>
                                <Image src="/create-tutor-profile.svg"
                                    width={50} height={50} />
                            </div>
                            <Card.Body>
                                <Card.Title>1. Create your profile </Card.Title>
                                <Card.Text>
                                    Your profile is the first thing students see. Show everyone
                                    a bit about yourself. What is your interest? What is your contact preference?
                         </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className={styles.jumbotronInfoCardDark}>
                            <div className={styles.jumbotronRightImageContainer}>
                                <Image src="/build-profile.svg"
                                    width={50} height={50} />
                            </div>
                            <Card.Body>
                                <Card.Title>2. Build up your profile</Card.Title>
                                <Card.Text>
                                    Contribute to the community by submitting quizzes, answering students' questions
                                    and addressing their comments.
                                    Build up your profile in this process!
                         </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className={styles.jumbotronInfoCardDark}>
                            <div className={styles.jumbotronRightImageContainer}>
                                <Image src="/talk.svg"
                                    width={50} height={50} />
                            </div>
                            <Card.Body>
                                <Card.Title>3. Match With Students</Card.Title>
                                <Card.Text>
                                    Tell us your rate and preference and we will match students with you.
                                    Well estalished profile would increase your match success rate.
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