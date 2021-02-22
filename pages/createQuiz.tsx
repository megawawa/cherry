import { useEffect } from "react";
import { useAccountContext } from "../components/layout/accountContext";
import MainAccountView from "../components/layout/mainAccountView";
import { Problem } from "../libs/problem";
import { csrfToken } from 'next-auth/client'
import { useRouter } from "next/router";

export default function CreateQuizPage({ problemData, csrfToken }: {
    problemData: Problem, csrfToken: string
}) {
    const context = useAccountContext();
    useEffect(() => {
        context.update({
            problemData: problemData
        });
    }, [problemData]);
    const router = useRouter();

    if (router.query?.tutor) {
        return <MainAccountView activeKey={'createQuiz'} />;
    }

    return <MainAccountView activeKey={'askQuiz'} />;
}

export async function getStaticProps(context) {
    return {
        props: {
            problemData: {
                summary: "",
                id: "",
            },
            csrfToken: await csrfToken(context)
        }
    }
}
