import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import styles from '../../styles/BrowseQuiz.module.css'

export default function GetSubTopicComponent({ tags, updateTags, name }: {
    tags: Array<string>,
    updateTags: (string) => void,
    name: string,
}) {
    const [subTopics, updateSubTopics] = useState<Array<string>>(["third grade"]);

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
        fetchAndUpdateTopics(tags ?? []);
    }, [tags]);

    return <div>
        {subTopics?.length > 0 && (
            <span className={styles.subHeader}>
                Too many results? Select additional topic:
            </span>
        )}
        {subTopics.map((topic, index) => (
            <Card className={styles.card} key={name + '-' + index}>
                <Card.Body>
                    <Card.Text>
                        <a style={{ textDecoration: "underline" }}
                            onClick={() => {
                                updateTags(topic);
                            }}>{topic}</a>
                    </Card.Text>
                </Card.Body>
            </Card>))}
    </div>
}