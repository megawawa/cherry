import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import styles from '../../styles/BrowseQuiz.module.css'
import { useAccountContext } from "../layout/accountContext";

export default function GetSubTopicComponent({ tags, updateTags, name,
    cachedSubTopics }: {
        tags: Array<string>,
        updateTags: (string) => void,
        name: string,
        cachedSubTopics?: Array<string>,
    }) {
    let [subTopics, updateSubTopics] = useState<Array<string>>(
        cachedSubTopics ?? []
    );

    let state = useAccountContext();

    const updateAndSyncSubTopics = (subtopics: Array<string>) => {
        state.update({
            subTopics: subtopics
        });
        updateSubTopics(subtopics);
    }

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
            updateAndSyncSubTopics([]);
            return;
        }
        updateAndSyncSubTopics(result);
    }

    useEffect(() => {
        fetchAndUpdateTopics(tags ?? []);
    }, [tags]);

    return <>{subTopics?.length > 0 && (
        <div className={styles.quizPreviewList}>
            <span className={styles.subHeader}>
                Too many results? Select sub-topic:
                </span>
            <div>
                {subTopics.map((topic, index) => (
                    <Button key={name + '-' + index}
                        onClick={() => {
                            updateTags(topic);
                        }} className="m-2" variant="secondary">{topic}
                    </Button>))}
            </div>
        </div>)
    }</>;
}