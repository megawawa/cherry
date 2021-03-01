
import React from "react";

import { useSession } from 'next-auth/client'
import { Card } from "react-bootstrap";


export default function ProfileSummaryView() {
    const [session] = useSession();

    // only works if userId is provided in param or user is logged in
    return <Card className="text-center">
        <Card.Header>Featured</Card.Header>
        <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
                With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>;
}
