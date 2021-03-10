import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useAccountContext } from "../components/layout/accountContext";
import MainAccountView from "../components/layout/mainAccountView";

export default function TutorRequestsPage({ current }: {
    current: number,
}) {
    const context = useAccountContext();
    useEffect(() => {
        (async () => {
            console.log("fetching tutorRequest",
                context.tags, context.tutorRequestsIndex);
            const url = `/api/getTutorRequests?` +
                `tags=${JSON.stringify(context.tags ?? [])}` +
                `&current=${context.tutorRequestsIndex ?? 1}`;

            const res = await fetch(
                url,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'GET'
                }
            )

            let results = await res.json();
            console.log("fetched tutorRequests: ", context.tags,
                context.tutorRequestsIndex, results);

            results = results.map((result) => ({
                ...result, requestTime: new Date(result.requestTime)
            }));

            context.update({
                tutorRequests: results,
            });
        })();
    }, [context.tags, context.tutorRequestsIndex]);

    return <MainAccountView activeKey={'browseTutorRequest'} />;
}

export async function getServerSideProps({ params }) {
    return {
        props: {}
    };
}