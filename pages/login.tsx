import { Card, Button } from 'react-bootstrap';
import styles from '../styles/Home.module.css'
import loginStyles from '../styles/Login.module.css'
import LoginForm from '../components/profile/loginForm'

export default function LoginPage() {
    return <main className={styles.main + ' ' + loginStyles.background}>
        <div className={loginStyles.grid}>
            <Card className={styles.card + ' p-3'}>
                <LoginForm />
            </Card>
        </div>
    </main >;
}