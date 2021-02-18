import { Problem, getProblemById, parseTextToSolution } from '../../libs/problem'
import { SolutionPanel } from '../../components/quiz/solution'
import Card from 'react-bootstrap/Card'
import styles from '../../styles/Problem.module.css'
import ProblemSummaryCard from '../../components/quiz/problemSummary';
import { getProblemDetailViewFromId } from '../../libs/mongoDb';

export default function ProblemPanel({ problemData }: { problemData: Problem }) {
    return (
        <div className={styles.main}>
            <Card className={styles.panel}>
                <Card.Header className={styles.title}>Exercise </Card.Header>
                <Card.Body>
                    <Card.Text>{problemData?.problemStatement ?? ''}</Card.Text>
                </Card.Body>
            </Card>
            <ProblemSummaryCard />
            <Card className={styles.panel}>
                <Card.Header className={styles.title}>Solution </Card.Header>
                <Card.Body>
                    <SolutionPanel solution={problemData?.solution} />
                </Card.Body>
            </Card>
        </div>);
}

export async function getStaticProps({ params }) {
    const problemData = await getProblemDetailViewFromId(params.id);
    return {
        props: {
            problemData: {
                problemStatement: problemData?.problemStatement ?? "",
                solution: parseTextToSolution(problemData?.solution ?? ""),
                summary: problemData.summary,
                id: 0,
            }
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: '60225e6b98a1d61be8ba7f7c' } },
        ],
        fallback: true,
    };
}