import styles from '../../../styles/BrowseQuiz.module.css'
import React from "react";
import { Card } from "react-bootstrap";
import Link from "next/link";
import { TutorPreviewType } from "../../../libs/user";

function TutorPanel({ tutor }:
    { tutor: TutorPreviewType }) {
    return <div>
        <Card className={styles.card}>
            <Card.Body>
                <Card.Text>
                    {/* TODO @megawawa(2/21/2021) link to profile*/}
                    {/* <Link href={`/profiles/${tutor.id}`}>
                        <a>{tutor.name}</a>
                    </Link> */}
                    {`username: ${tutor.name}`}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>;
}

export default function TutorsPanel({ tutors }:
    { tutors: Array<TutorPreviewType> }) {
    const tutorPanels = tutors?.map((tutor) =>
        <TutorPanel tutor={tutor} key={tutor.id} />);

    return <div className={styles.quizPreviewList}>{tutorPanels}</div>;
}