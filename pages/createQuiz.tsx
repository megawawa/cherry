import { useEffect } from "react";
import { useAccountContext } from "../components/layout/accountContext";
import MainAccountView from "../components/layout/mainAccountView";
import { Problem } from "../libs/problem";

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