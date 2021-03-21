import styles from '../../../styles/BrowseQuiz.module.css'
import React, { useState } from "react";
import { Card, Button, Form, FormCheck, DropdownButton, Dropdown } from "react-bootstrap";
import Link from "next/link";
import { TutorRequestFormType } from "../../../libs/user";

// TODO (@megawawa, 03/09/2021) change styles

export function TutorRequestPanel({ tutorRequest, displayUser }:
    { tutorRequest: TutorRequestFormType, displayUser: boolean }) {
    return <div>
        <Card className={styles.card}>
            <Card.Body>
                <Card.Text>
                    <Link href={`/tutorRequests/${tutorRequest.id}`}>
                        <a>{tutorRequest.message ?? ""}</a>
                    </Link>
                    {displayUser &&
                        (<div>
                            Submitted by user: {" "}
                            <Link href={`/profile/${tutorRequest.userid}`}>
                                <a>{tutorRequest.submitUserName}</a>
                            </Link>
                        </div>)}
                    <div>
                        {tutorRequest.rate?.number && "$"}
                        {tutorRequest.rate?.number}
                        {tutorRequest.rate?.number && "/hour"}
                    </div>
                    <div>
                        {tutorRequest.requestTime.toLocaleDateString(
                            "en-US", {
                            weekday: "long",
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        })}
                    </div>
                    <div className={styles.tagsList}>
                        {tutorRequest.tags.map((tag) =>
                            <div className={styles.tag}>
                                {tag}
                            </div>
                        )}
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    </div>;
}

export default function TutorRequestsPanel({ tutorRequests, displayUser }:
    { tutorRequests: Array<TutorRequestFormType>, displayUser: boolean }) {
    const tutorRequestsPanel =
        (tutorRequests?.length > 0) ? (
            tutorRequests?.map((tutorRequest) =>
                <TutorRequestPanel tutorRequest={tutorRequest} key={tutorRequest.id} displayUser={displayUser} />)
        ) : (<div>
            You have reached the end of the tutor request list.
            Express your interest
            and get notified when we have new tutor request!
        </div>);

    return <div className={styles.quizPreviewList}>
        <div className={styles.quizPreviewListHeader}>
            <span className={styles.mainHeader}>Tutor Requests
            </span>
            <div style={{
                justifyContent: "flex-end",
                flexDirection: "row",
                display: "flex",
                marginTop: "1rem",
            }}>
                <Button id="follow" variant="primary">
                    Follow</Button>
            </div>
        </div>
        {tutorRequestsPanel}</div>;
}