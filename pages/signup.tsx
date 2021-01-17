import { Card, Button } from 'react-bootstrap';
import styles from '../styles/Home.module.css'
import loginStyles from '../styles/Login.module.css'
import SignUpForm from '../components/signUpForm'
import React from 'react';
import FeaturesPanel from '../components/featuresPanel';

export default function SignUpPage() {
    return <main className={styles.main + ' ' + loginStyles.background}>
        <div className={loginStyles.grid}>
            <Card className={styles.card + ' p-3'}>
                <SignUpForm />
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