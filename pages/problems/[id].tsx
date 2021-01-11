import { Problem, getProblemById } from '../../libs/problem'
import { SolutionPanel } from '../../components/solution'

export default function ProblemPanel({ problemData }: { problemData: Problem }) {
    return (
        <div>
            <div>Problem: </div>
            <div>{problemData?.problemStatement ?? ''}</div>
            <SolutionPanel solution={problemData?.solution}/>
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