import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useAccountContext } from "./layout/accountContext";
import InputButtonList from "./libs/inputButtonList";
import { PaginationFooter } from "./libs/paginationFooter";
import QuizzesPanel from "./quiz/quizPanel";
import styles from '../styles/BrowseQuiz.module.css'

export default function BrowseQuizPanel() {
    let state = useAccountContext();

    const router = useRouter();

    const buttons = state.tags?.map((tag) =>
        <Button variant="secondary" className="ml-2"
            key={tag}>{tag}</Button>);

    const [subTopics, updateSubTopics] = useState<Array<string>>(["third grade"]);

    const handleUpdateIndex = (index) => {
        state.update({
            quizzesIndex: index
        });
    };

    const fetchAndUpdateTopics = async (tags) => {
        const url = `/api/getSubTopics?` +
            `tags=${JSON.stringify(tags)}`;

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
        console.log("fetched subtopics: ", tags, result);
        if (res.status != 200) {
            console.log("fetching subtopic failed");
            updateSubTopics([]);
            return;
        }
        updateSubTopics(result);
    }

    useEffect(() => {
        fetchAndUpdateTopics(state.tags ?? []);
    }, [state.tags]);

    return <div style={{ display: "flex", flexDirection: "column", minHeight: "80vh"}}>
        <div>
            Selected topics
            <InputButtonList tags={state.tags ?? []} onUpdate={(tagsState) => {
                state.update({
                    tags: tagsState
                });
                fetchAndUpdateTopics(tagsState);
            }} />
        </div>
        <div>
            Popular sub-topics
            {subTopics.map((topic) => (
            <Card className={styles.card}>
                <Card.Body>
                    <Card.Text>
                        <a style={{ textDecoration: "underline" }}
                            onClick={() => {
                                if (!state.tags) {
                                    state.update({
                                        tags: [topic]
                                    });
                                    return;
                                }

                                let hasDuplicate = false;
                                for (let i = 0; i < state.tags.length; i++) {
                                    if (state.tags[i] == topic) {
                                        hasDuplicate = true;
                                        break;
                                    }
                                }

                                if (!hasDuplicate) {
                                    state.update({
                                        tags: state.tags?.concat([topic])
                                    });
                                }
                            }}>{topic}</a>
                    </Card.Text>
                </Card.Body>
            </Card>))}
        </div>
        <QuizzesPanel quizzes={state.quizzes} displayUser={true} />
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
    </div>;
}