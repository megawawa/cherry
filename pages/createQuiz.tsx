import { useEffect } from "react";
import { useAccountContext } from "../components/layout/accountContext";
import MainAccountView from "../components/layout/mainAccountView";
import { getProblemById, Problem } from "../libs/problem";
import { csrfToken } from 'next-auth/client'

export default function CreateQuizPage({ problemData, csrfToken }: {
    problemData: Problem, csrfToken: string
}) {
    const context = useAccountContext();
    useEffect(() => {
        context.update({
            problemData: problemData
        });
    }, [problemData]);
    return <MainAccountView activeKey={'askQuiz'} />;
}

export async function getInitialProps({ params }) {
    const problemData = await getProblemById(1 /* dummy value */)
    return {
        props: {
            problemData,
        }
    }
}
