import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useAccountContext } from "../components/layout/accountContext";
import MainAccountView from "../components/layout/mainAccountView";

export default function QuizzesPage({ current }: {
    current: number,
}) {
    const context = useAccountContext();
    useEffect(() => {
        (async () => {
            console.log("fetching quiz", context.tags, context.quizzesIndex);
            const url = `/api/getQuizzes?` +
                `tags=${JSON.stringify(context.tags ?? [])}&current=${context.quizzesIndex ?? 1}`;

            const res = await fetch(
                url,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'GET'
                }
            )

            const result = await res.json();
            console.log("fetched quiz: ", context.tags,
                context.quizzesIndex, result);

            context.update({
                quizzes: result,
            });
        })();
    }, [context.tags, context.quizzesIndex]);

    return <MainAccountView activeKey={'browseQuiz'} />;
}

export async function getServerSideProps({ params }) {
    return {
        props: {}
    };
}