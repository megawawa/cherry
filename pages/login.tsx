import { Card, Button } from 'react-bootstrap';
import styles from '../styles/Home.module.css'
import loginStyles from '../styles/Login.module.css'
import LoginForm from '../components/profile/loginForm'
import { csrfToken } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function LoginPage({ csrfToken }) {
    const router = useRouter();
    return <main className={styles.main + ' ' + loginStyles.background}>
        <div className={loginStyles.grid}>
            <Card className={styles.card + ' p-3'}>
                <LoginForm csrfToken={csrfToken} error={router.query} />
            </Card>
        </div>
    </main >;
}

LoginPage.getInitialProps = async (context) => {
    return {
        csrfToken: await csrfToken(context)
    }
}