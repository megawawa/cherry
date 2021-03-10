import React from "react";
import { useSession } from 'next-auth/client'
import { TutorRequestFormType } from "../../../libs/user";
import { Card } from "react-bootstrap";


export default function TutorRequestView({ tutorRequest, tutorRequestId }: {
    tutorRequestId?: string,
    tutorRequest: TutorRequestFormType,
}) {
    const [session] = useSession();

    return <div>
        <Card>
            <Card.Header>Tutor request </Card.Header>
            <Card.Body>
                <Card.Title>
                    Tutor request
                    </Card.Title>
                <Card.Text>
                    <p>{tutorRequest.message}</p>
                    <p>{
                        tutorRequest.requestTime.toLocaleDateString(
                            "en-US", {
                            weekday: "long",
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        })
                    }</p>
                </Card.Text>
            </Card.Body>
        </Card>
    </div>;
}