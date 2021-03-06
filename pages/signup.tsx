import { Card, Button, Jumbotron } from 'react-bootstrap';
import styles from '../styles/Home.module.css'
import loginStyles from '../styles/Login.module.css'
import SignUpForm from '../components/profile/signUpForm'
import React, { useDebugValue, useState } from 'react';
import FeaturesPanel from '../components/featuresPanel';
import { csrfToken } from 'next-auth/client'
import { useRouter } from 'next/router'
import Image from 'next/image';
import StudentJumbotron from '../components/profile/student/studentJumbotron';
import TutorJumbotron from '../components/profile/tutor/tutorJumbotron';

export type SignUpFormType = {
    name?: string,
    password?: string,
    email?: string,
    isStudent: boolean,
    isTutor: boolean,
}

export default function SignUpPage({ csrfToken }) {
    const router = useRouter();
    const [state, setState] = useState<SignUpFormType>({
        isStudent: router.query?.student != undefined,
        isTutor: router.query?.tutor != undefined
    });
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleCheckMark = (name) => {
        if (name == 'student') {
            setState({
                ...state,
                isStudent: !state.isStudent,
            })
        } else {
            setState({
                ...state,
                isTutor: !state.isTutor,
            })
        }
    }

    return <main>
        <div className={styles.mainNew}>
            {state.isStudent &&
                <StudentJumbotron isIntro={false} />}
            <div className={styles.mainSignUp}>
                <div>
                    <Card className={styles.card + ' p-3'}>
                        <SignUpForm csrfToken={csrfToken} context={router.query}
                            handleChange={handleChange} state={state} />
                    </Card>
                </div>
            </div>
            {state.isTutor &&
                <TutorJumbotron isIntro={false} />}
        </div>
    </main>;
}

SignUpPage.getInitialProps = async (context) => {
    return {
        csrfToken: await csrfToken(context)
    }
}