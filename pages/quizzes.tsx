import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useAccountContext } from "../components/layout/accountContext";
import MainAccountView from "../components/layout/mainAccountView";
import { getProblemFromTags, ProblemPreviewType } from "../libs/mockDb";

export default function QuizzesPage({ tags, quizzes }: {
    tags: Array<string>,
    quizzes: Array<ProblemPreviewType>
}) {
    const context = useAccountContext();
    useEffect(() => {
        context.update({
            tags: tags,
            quizzes: quizzes
        });
    }, [tags, quizzes]);
    return <MainAccountView activeKey={'browseQuiz'} />;
}

export async function getStaticProps(context) {
    const tags = ['third grade', 'math'];
    const quizzes = await getProblemFromTags(tags);
    return {
        props: {
            tags: tags,
            quizzes: quizzes,
        }
    };
}