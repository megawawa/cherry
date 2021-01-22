import { useEffect } from "react";
import { useAccountContext } from "../components/layout/accountContext";
import MainAccountView from "../components/layout/mainAccountView";
import { getProblemById, Problem } from "../libs/problem";

export default function CreateQuizPage({ problemData }: { problemData: Problem }) {
    const context = useAccountContext();
    useEffect(() => {
        context.update({
            problemData: problemData
        });
    }, [problemData]);
    return <MainAccountView activeKey={'askQuiz'} />;
}

export async function getStaticProps({ params }) {
    const problemData = await getProblemById(1 /* dummy value */)
    return {
        props: {
            problemData
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { } }
        ],
        fallback: true,
    };
}