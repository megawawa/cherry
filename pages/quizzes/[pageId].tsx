import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useAccountContext } from "../../components/layout/accountContext";
import MainAccountView from "../../components/layout/mainAccountView";
import { getProblemPreviewFromTags } from "../../libs/mongoDb";
import { ProblemPreviewType } from "../../libs/quiz";

export default function QuizzesPage({ tags, quizzes, current }: {
    tags: Array<string>,
    quizzes: Array<ProblemPreviewType>,
    current: number,
}) {
    const context = useAccountContext();
    useEffect(() => {
        context.update({
            tags: tags,
            quizzes: quizzes,
            quizzesIndex: current,
        });
    }, [tags, quizzes, current]);
    return <MainAccountView activeKey={'browseQuiz'} />;
}

export async function getServerSideProps({params}) {
    const tags = ['third grade', 'math'];
    const current = parseInt(params.pageId) ?? 1;
    const quizzes = await getProblemPreviewFromTags(tags, current);
    return {
        props: {
            tags: tags,
            quizzes: quizzes,
            current: current,
        }
    };
}