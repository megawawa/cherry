import { Problem, getProblemById } from '../../libs/problem'
import { SolutionPanel } from '../../components/solution'
import Card from 'react-bootstrap/Card'
import styles from '../../styles/Problem.module.css'

export default function ProblemPanel({ problemData }: { problemData: Problem }) {
    return (
        <div className={styles.main}>
            <Card className={styles.panel}>
                <Card.Header className={styles.title}>Exercise </Card.Header>
                <Card.Body>
                    <Card.Text>{problemData?.problemStatement ?? ''}</Card.Text>
                </Card.Body>
            </Card>
            <Card className={styles.panel}>
                <Card.Header className={styles.title}>Solution </Card.Header>
                <Card.Body>
                    <SolutionPanel solution={problemData?.solution} />
                </Card.Body>
            </Card>
        </div>);
}

export async function getStaticProps({ params }) {
    const problemData = await getProblemById(params.id)
    return {
        props: {
            problemData
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: '1' } },
            { params: { id: '2' } }
        ],
        fallback: true,
    };
}