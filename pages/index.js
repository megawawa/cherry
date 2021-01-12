import Head from 'next/head'
import { Card } from 'react-bootstrap'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container + ' ' + styles.background}>
      <Head>
        <title>Seeking Quiz -- Quiz and Learn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>
            Welcome, have you quizzed today?
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
