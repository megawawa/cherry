import { Card, Button } from 'react-bootstrap';
import styles from '../styles/Home.module.css'
import loginStyles from '../styles/Login.module.css'
import SignUpForm from '../components/profile/signUpForm'
import React from 'react';
import FeaturesPanel from '../components/featuresPanel';
import { csrfToken } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function SignUpPage({ csrfToken }) {
    const router = useRouter();
    return <main className={styles.main + ' ' + loginStyles.background}>
        <div className={loginStyles.grid}>
            <Card className={styles.card + ' p-3'}>
                <SignUpForm csrfToken={csrfToken} error={router.query}/>
            </Card>

            <div className={loginStyles.featuresGrid}>
                <FeaturesPanel />
            </div>
        </div>

        <div className={styles.textContainer}>
            <div>
                Welcome, have you quizzed today?
            </div>
        </div>
    </main>;
}

SignUpPage.getInitialProps = async (context) => {
    return {
        csrfToken: await csrfToken(context)
    }
}