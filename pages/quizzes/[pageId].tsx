import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useAccountContext } from "../../components/layout/accountContext";
import MainAccountView from "../../components/layout/mainAccountView";
import { ProblemPreviewType } from "../../libs/quiz";

export default function QuizzesPage({ current }: {
    current: number,
}) {
    const context = useAccountContext();
    useEffect(() => {
        (async () => {
            
            if (!context.tags) {
                context.update({
                    tags: [],
                });
                return;
            }

            console.log("fetching quiz", context.tags, context.quizzesIndex);
            const url = `/api/getQuiz?` +
                `tags=${JSON.stringify(context.tags)}&current=${current}`;

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
            console.log("fetched quiz: ", context.tags, current, result);

            context.update({
                quizzes: result,
                quizzesIndex: current,
            });
        })();
    }, [context.tags, context.quizzesIndex]);

    return <MainAccountView activeKey={'browseQuiz'} />;
}

export async function getServerSideProps({ params }) {
    const current = parseInt(params.pageId) ?? 1;
    return {
        props: {
            current: current,
        }
    };
}