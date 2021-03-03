import Head from 'next/head'
import Image from 'next/image'
import { Card, Button, Jumbotron } from 'react-bootstrap'
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/client'
import Link from "next/link";
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

      <main>
        <div className={styles.mainNew}>
          <div style={{ position: "absolute" }}>
            <Image
              src="/front.png"
              alt="Picture of the author"
              width={400}
              height={400}
            />
          </div>
          <Jumbotron className={styles.mainLeft}>
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
              <Link href="/signup" passHref>
                <Button variant="outline-dark" className={styles.button}
                >Sign up Now</Button>
              </Link>
            </div>
          </Jumbotron>
          <Jumbotron className={styles.mainRight}>
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

              <Link href="/signup" passHref>
                <Button variant="outline-dark" className={styles.button}>
                  Sign up Now</Button>
              </Link>
            </div>
          </Jumbotron>
        </div>
        <Jumbotron className={styles.mainFloating}>
          <h1>Just browsing?</h1>
          <p>
            <span><br /> You can always sign up later</span>
          </p>
          <p>
            <span className={styles.highlightCardText}>Explore</span>
            <span>{"  quizzes, tests and tutors "}</span>
          </p>
          <p>
            <Link href="/quizzes" passHref>
              <Button variant="outline-light" className={styles.buttonDark}>
                Explore Now</Button>
            </Link>
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
