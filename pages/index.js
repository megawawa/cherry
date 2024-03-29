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
import * as ga from '../libs/gtag'

export default function Home() {
  const [session, loading] = useSession();

  if (loading) {
    return <> </>;
  }

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
          <div className={styles.mainImageLeftFilterContainer}>
            <img className={styles.mainImageLeft}
              src="/front.png"
              alt="Picture of the author" />
            <div className={styles.right} />
          </div>
          <div className={styles.mainImageRightFilterContainer}>
            <img className={styles.mainImageRight}
              src="/front.png"
              alt="Picture of the author" />
            <div className={styles.right} />
          </div>

          <StudentJumbotron isIntro={true} />
          <TutorJumbotron isIntro={true} />
        </div>
        <Jumbotron className={styles.mainFloating}>
          <div className={styles.mainFloatingText}>
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
                <Button variant="outline-light" className={styles.buttonDark} onClick={
                  () => {
                    ga.event({
                      action: "explore",
                      category: "",
                      label: "",
                      value: "",
                    });
                  }}>
                  Explore Now</Button>
              </Link>
            </p>
          </div>
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
