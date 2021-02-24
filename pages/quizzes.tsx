import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useAccountContext } from "../components/layout/accountContext";
import MainAccountView from "../components/layout/mainAccountView";

export default function QuizzesPage({ current }: {
    current: number,
}) {
    const context = useAccountContext();
    useEffect(() => {
        (async () => {

            if (!context.tags || !context.quizzesIndex) {
                const sanitizedTags = context.tags ?? [];
                const sanitizedIndex = context.quizzesIndex ?? 1;
                context.update({
                    tags: sanitizedTags,
                    quizzesIndex: sanitizedIndex,
                });
                return;
            }

            console.log("fetching quiz", context.tags, context.quizzesIndex);
            const url = `/api/getQuiz?` +
                `tags=${JSON.stringify(context.tags)}&current=${context.quizzesIndex}`;

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
                quizzesIndex: context.quizzesIndex,
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