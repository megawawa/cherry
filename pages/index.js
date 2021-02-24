import Head from 'next/head'
import Image from 'next/image'
import { Card, Button, Jumbotron } from 'react-bootstrap'
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

      <main className={styles.mainNew}>
        <Jumbotron style={{ maxHeight: "25vh", minWidth: "100vw" }}>
          <h1>Hello, Student</h1>
          <p>
            <span className={styles.highlightCardText}>Assess</span>
            <span> </span>
           yourself and learn through quizzes and tests. Get your questions answered -- for free
          </p>
          <p>
            <Button variant="primary" href="/signup">Sign Up now</Button>
          </p>
        </Jumbotron>
        <Jumbotron style={{ maxHeight: "25vh", minWidth: "100vw" }}>
          <h1>Hello, Tutor</h1>
          <p>
            <span className={styles.highlightCardText}>Reach</span>
            <span> </span> more students -- for free
          </p>
          <p>
            <Button variant="primary" href="/signup">Sign Up now</Button>
          </p>
        </Jumbotron>
        <Jumbotron style={{ maxHeight: "25vh", minWidth: "100vw" }}>
          <h1>Just browsing?</h1>
          <p>
            <span className={styles.highlightCardText}>Explore</span>
            <span> </span>
                 quizzes, tests and tutors. Sign up as student/tutor when
                you need more features!
          </p>
          <p>
            <Button variant="primary" href="/quizzes">Start exploring</Button>
          </p>
        </Jumbotron>
      </main>
    </>
  )
}

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
