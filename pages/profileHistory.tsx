import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useAccountContext } from "../components/layout/accountContext";
import MainAccountView from "../components/layout/mainAccountView";
import { getProblemPreviewFromUser } from "../libs/mongoDb/quiz/problem";
import { ProblemPreviewType } from '../libs/quiz';
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
    if (!session?.user?.id) {
        return {
            props: {
                quizzes: [],
            }
        };
    }
    const quizzes = await getProblemPreviewFromUser(session?.user?.id);
    return {
        props: {
            quizzes: quizzes,
        }
    };
}