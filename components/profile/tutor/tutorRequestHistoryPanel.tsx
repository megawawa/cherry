import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/client'
import { Card } from "react-bootstrap";
import { TutorRequestFormType } from "../../../libs/user";
import { TutorRequestPanel } from "./tutorRequestPanel";
import { useAccountContext } from "../../layout/accountContext";

export default function TutorRequestHistoryPanel({ displayUser }:
    {
        displayUser: boolean,
    }) {
    const [session] = useSession();
    const state = useAccountContext();

    useEffect(() => {
        (async () => {
            console.log("fetching tutor request for user");
            const url = `/api/getTutorRequests`;

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
            console.log("fetching tutor request for user: ", results);

            if (res.status != 200) {
                return;
            }
            results = results.map((result) => ({
                ...result, requestTime: new Date(result.requestTime)
            }));

            state.update({ submittedTutorRequests: results });
        })();
    }, []);

    const tutorRequestsPanel =
        (state.submittedTutorRequests?.length > 0) ? (
            state.submittedTutorRequests?.map((tutorRequest) =>
                <TutorRequestPanel tutorRequest={tutorRequest} key={tutorRequest.id} displayUser={displayUser} />)
        ) : (<div>
            You haven't submitted any tutor requests yet.
        </div>);


    return <Card>
        <Card.Header>Submitted TutorRequests</Card.Header>
        <Card.Body>
            {tutorRequestsPanel}
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>;
}