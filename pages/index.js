import Head from 'next/head'
import { Card, Button } from 'react-bootstrap'
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/client'
import MainAccountView from "../components/layout/mainAccountView";

export default function Home() {
  const [session] = useSession();

  if (session?.user?.name) {
    return <MainAccountView activeKey={'sampleLocked'} />;
  }

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
                Create your profile to browse quizzes & tests, ask questions
                online or find a tutor
          </Card.Text>
              <div className={styles.cardFooter}>
                <Button variant="primary" href="/signup">Start Learning</Button>
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
                  Build up your profile by answering students' questions,
                  creating your own problem sets, and contributing
                  quizzes.
              </Card.Text>
              <div className={styles.cardFooter}>
                <Button variant="primary" href="/signup">Start Tutoring</Button>
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
                you need more features!
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
            <span>Welcome, </span>
            <span>have you quizzed today?</span>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.infoCard}>
              <span className={styles.infoNumber}>10k+ </span>
              <span className={styles.infoItem}>Problems</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoNumber}>100+ </span>
              <span className={styles.infoItem}>Tutors</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoNumber}>1k+ </span>
              <span className={styles.infoItem}>Students</span>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
