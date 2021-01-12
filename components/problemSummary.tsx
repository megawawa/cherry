import styles from '../styles/Problem.module.css'
import Card from 'react-bootstrap/Card'

export default function ProblemSummaryCard() {
    return (
        <Card className={styles.panel}>
            <Card.Header className={styles.title}>Summary </Card.Header>
            <Card.Body>
                <Card.Text> 13/30 past attempts are successful</Card.Text>
            </Card.Body>
        </Card>);
}