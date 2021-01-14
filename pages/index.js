import Head from 'next/head'
import { Card, Button } from 'react-bootstrap'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Seeking Quiz -- Quiz and Learn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main + ' ' + styles.background}>
        <div className={styles.grid}>
          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>I am a student</Card.Title>
              <Card.Text>
                Want to <span className={styles.highlightCardText}>
                  gain more</span><span> knowledge</span>?
                Create your profile to browse quizzes, tests, ask questions
                online or find a tutor
          </Card.Text>
              <div className={styles.cardFooter}>
                <Button variant="primary">Start Learning</Button>
                <div className={styles.priceTag}>Free </div>
              </div>

            </Card.Body>
          </Card>

          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>I am a tutor</Card.Title>
              <Card.Text>
                Want to <span className={styles.highlightCardText}>
                  reach more</span><span> students</span>?
                  Build up your profile by answering students questions,
                  creating your own problem sets, and contributing
                  quizzes.
              </Card.Text>
              <div className={styles.cardFooter}>
                <Button variant="primary">Start Tutoring</Button>
                <div className={styles.priceTag}>Free </div>
              </div>
            </Card.Body>
          </Card>

          <Card className={styles.card}>
            <Card.Body>
              <Card.Title>Just browsing? </Card.Title>
              <Card.Text>
                No worries! <span className={styles.highlightCardText}>Explore</span>
                <span> </span>
                 quizzes, tests and tutors. Sign up when
                you want more features!
          </Card.Text>
          <div className={styles.cardFooter}>
                <Button variant="primary">Start exploring</Button>
                <div className={styles.priceTag}> Free</div>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className={styles.textContainer}>
          <div>
            Welcome, have you quizzed today?
        </div>
        </div>
      </main>
    </>
  )
}
