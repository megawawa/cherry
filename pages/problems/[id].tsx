import { Problem, getProblemById } from '../../libs/problem'

export default function ProblemPanel({ problemData }: { problemData: Problem }) {
    return (
        <div>
            <div>Problem: </div>
            <div>{problemData?.body ?? ''}</div>
        </div>);
}

export async function getStaticProps({ params }) {
    const problemData = getProblemById(params.id)
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