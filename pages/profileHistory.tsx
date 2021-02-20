import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useAccountContext } from "../components/layout/accountContext";
import MainAccountView from "../components/layout/mainAccountView";
import { getProblemPreviewFromUser, ProblemPreviewType } from "../libs/mongoDb";
import { getSession } from 'next-auth/client'

export default function QuizzesPage({ quizzes }: {
    quizzes: Array<ProblemPreviewType>
}) {
    const context = useAccountContext();
    useEffect(() => {
        context.update({
            quizzes: quizzes
        });
    }, [quizzes]);
    return <MainAccountView activeKey={'answeredQuizHistory'} />;
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const quizzes = await getProblemPreviewFromUser(session.user.name);
    return {
        props: {
            quizzes: quizzes,
        }
    };
}