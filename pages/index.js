import Head from 'next/head'
import Image from 'next/image'
import { Card, Button, Jumbotron, Fade } from 'react-bootstrap'
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/client'
import React, { useState } from "react";
import Link from "next/link";
import MainAccountView from "../components/layout/mainAccountView";
import StudentJumbotron from '../components/profile/student/studentJumbotron';
import TutorJumbotron from '../components/profile/tutor/tutorJumbotron';

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
          <StudentJumbotron isIntro={true} />
          <TutorJumbotron isIntro={true} />
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
