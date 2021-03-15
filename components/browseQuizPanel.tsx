import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useAccountContext } from "./layout/accountContext";
import InputButtonList from "./libs/inputButtonList";
import { PaginationFooter } from "./libs/paginationFooter";
import QuizzesPanel from "./quiz/quizPanel";
import styles from '../styles/BrowseQuiz.module.css'
import Link from "next/link";
import TutorRequestModal from "./profile/tutorRequestModal";
import GetSubTopicComponent from "./libs/subTopics";
import { addTag, getIfFollowTagsFromUser, submitFollowTagsFromUser } from "../libs/tags";

export default function BrowseQuizPanel() {
    let state = useAccountContext();

    const handleUpdateIndex = (index) => {
        console.log("updating for index", index);
        state.update({
            quizzesIndex: index
        });
    };

    const [show, setShow] = useState<boolean>(false);

    const updateTags = (tag: string) => {
        state.update({
            tags: addTag(state.tags, tag)
        });
    }

    const [followed, setFollowed] = useState<boolean>();

    useEffect(() => {
        (async () => {
            const isFollowed = await getIfFollowTagsFromUser(
                state.tags, "follow-quizzes");
            setFollowed(isFollowed);
        })();
    }, [state.tags]);

    const onFollowClick = () => {
        setFollowed(!followed);
        submitFollowTagsFromUser(state.tags, "follow-quizzes");
    }

    return <>
        <TutorRequestModal isActive={show}
            onClose={setShow.bind(this, false)}
            onSave={() => {
                setShow(false);
            }} />
        <div style={{ display: "flex", flexDirection: "column", minHeight: "80vh" }}>
            <div className={styles.quizPreviewList}>
                <div>
                    <span className={styles.mainHeader}>Selected topics</span>
                    <InputButtonList tags={state.tags ?? []} onUpdate={(tagsState) => {
                        state.update({
                            tags: tagsState
                        });
                    }}
                        name="quiz-topic" />

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
                        <Button variant="primary" style={
                            {
                                marginRight: "1rem",
                            }}
                            onClick={setShow.bind(this, true)}>
                            Find a tutor</Button>
                        <Link href="/createQuiz" passHref>
                            <Button variant="primary">
                                Need help on quiz?</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <GetSubTopicComponent
                tags={state.tags} updateTags={updateTags}
                name="browse-quiz" cachedSubTopics={state.subTopics} />
            <QuizzesPanel quizzes={state.quizzes} displayUser={true}
                onClick={onFollowClick}
                followed={followed} />
            <div style={{
                justifyContent: "flex-end",
                flexDirection: "column",
                flex: "1 1 auto",
                display: "flex",
                marginTop: "1rem",
            }}>
                <PaginationFooter
                    current={state.quizzesIndex ?? 1}
                    onUpdateIndex={handleUpdateIndex} />
            </div>
        </div >
    </>;
}