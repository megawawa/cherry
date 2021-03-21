import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/client'
import { Card } from "react-bootstrap";
import { TutorRequestFormType } from "../../../libs/user";
import { TutorRequestPanel } from "./tutorRequestPanel";

export default function TutorRequestHistoryPanel({ displayUser }:
    {
        displayUser: boolean,
    }) {
    const [session] = useSession();

    const [tutorRequests, setTutorRequests] = useState<Array<TutorRequestFormType>>([]);

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

            setTutorRequests(results);
        })();
    }, []);

    const tutorRequestsPanel =
        (tutorRequests?.length > 0) ? (
            tutorRequests?.map((tutorRequest) =>
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