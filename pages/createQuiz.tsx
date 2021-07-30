import { useEffect } from "react";
import { useAccountContext } from "../components/layout/accountContext";
import MainAccountView from "../components/layout/mainAccountView";
import { Problem } from "../libs/problem";
import { useRouter } from "next/router";

export default function CreateQuizPage({ problemData }: {
    problemData: Problem
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

export async function getStaticProps() {
    return {
        props: {
            problemData: {
                summary: "",
                id: "",
            },
        }
    }
}
