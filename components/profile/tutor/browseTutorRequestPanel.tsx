import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useAccountContext } from "../../layout/accountContext";
import InputButtonList from "../../libs/inputButtonList";
import { PaginationFooter } from "../../libs/paginationFooter";
import styles from '../../../styles/BrowseQuiz.module.css'
import Link from "next/link";
import GetSubTopicComponent from "../../libs/subTopics";
import { addTag } from "../../../libs/tags";
import TutorRequestsPanel from "./tutorRequestPanel";

// TODO (@megawawa, 03/09/2021) change styles

export default function BrowseTutorRequestPanel() {
    let state = useAccountContext();

    const handleUpdateIndex = (index) => {
        console.log("updating for index", index);
        state.update({
            tutorRequestsIndex: index
        });
    };
    const updateTags = (tag: string) => {
        state.update({
            tags: addTag(state.tags, tag)
        });
    }

    return <>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "80vh" }}>
            <div className={styles.quizPreviewList}>
                <div>
                    <span className={styles.mainHeader}>Selected topics</span>
                    <InputButtonList tags={state.tags ?? []} onUpdate={(tagsState) => {
                        state.update({
                            tags: tagsState
                        });
                    }}
                        name="tutor-request-topic" />

                    <div style={{
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        display: "flex",
                        marginTop: "1rem",
                    }}>
                        <Button variant="primary" style={
                            {
                                marginRight: "1rem",
                            }}>
                            Take a test</Button>
                        <Link href="/createQuiz?tutor=1" passHref>
                            <Button variant="primary" style={
                                {
                                    marginRight: "1rem",
                                }}>
                                Create quiz</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <GetSubTopicComponent
                tags={state.tags} updateTags={updateTags}
                name="browse-tutor-request" cachedSubTopics={state.subTopics} />
            <TutorRequestsPanel tutorRequests={state.tutorRequests} displayUser />
            <div style={{
                justifyContent: "flex-end",
                flexDirection: "column",
                flex: "1 1 auto",
                display: "flex",
                marginTop: "1rem",
            }}>
                <PaginationFooter
                    current={state.tutorRequestsIndex ?? 1}
                    onUpdateIndex={handleUpdateIndex} />
            </div>
        </div >
    </>;
}