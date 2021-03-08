import { SolutionPanel } from '../../components/quiz/solution'
import CreateSolutionPanel from "../../components/quiz/createSolutionPanel";
import ProblemSummaryCard from '../../components/quiz/problemSummary';
import { EditableView } from '../../components/libs/editableView';

import styles from '../../styles/Problem.module.css'

import { Problem, parseTextToSolution } from '../../libs/problem';
import { CommentsList, QuizCreateFormType } from '../../libs/quiz';
import { getProblemDetailViewFromId } from '../../libs/mongoDb/quiz/problem';
import { useSession } from 'next-auth/client';

import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'


export default function ProblemPanel({ problemData, submitUserName }:
    { problemData: Problem, submitUserName: string }) {
    let [session] = useSession();
    const editable = (submitUserName == session?.user?.name);
    let [quiz, setQuiz] = useState<QuizCreateFormType>({
        problemStatement: problemData?.problemStatement ?? '',
        solution: problemData?.solution ?? '',
    });

    // solution panel has its own comment list.
    let [commentList, setCommentList] = useState<CommentsList>([]);

    const handleChange = (event) => {
        setQuiz({
            ...quiz,
            [event.target.name]: event.target.value
        });
    };

    let [cachedQuiz, setCachedQuiz] = useState<QuizCreateFormType>(
        quiz
    );

    /* rollback to checkpoint */
    const handleCancel = () => {
        setQuiz(cachedQuiz);
    }

    /* commit checkpoint */
    const handleSave = async () => {
        setCachedQuiz(quiz);
        const res = await fetch(
            '/api/editQuiz',
            {
                body: JSON.stringify(
                    {
                        ...quiz,
                        "id": problemData.id,
                        "submitUserName": session?.user?.name,
                    }
                ),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )
    }

    const handleGetComment = async (stepId: number) => {
        const url = `/api/getComments?` +
            `problemId=${JSON.stringify(problemData.id)}&stepId=${stepId}`;

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
        console.log("fetched comment: ", problemData.id,
            stepId, result);

        if (res.status == 200) {
            setCommentList((commentList) => {
                const dup = commentList.slice(0);
                dup[stepId] = result;
                return dup;
            });
        }
    }

    const handleUploadComment = async (
        stepIndex: number, commentIndex: number, comment: string) => {
        console.log("upload comment", stepIndex, commentIndex, comment);
        const res = await fetch(
            '/api/editComment',
            {
                body: JSON.stringify(
                    {
                        stepIndex: stepIndex,
                        commentIndex: commentIndex,
                        comment: comment,
                        userId: session.user.id,
                        solutionId: problemData.id,
                    }
                ),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )
    }

    const updateSolution = (value) => {
        setQuiz({
            ...quiz,
            solution: value
        });
    };

    return (
        <div className={styles.main}>
            <Card className={styles.panel}>
                <Card.Header className={styles.title}>Exercise </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <EditableView
                            defaultView={
                                <div>
                                    {quiz?.problemStatement ?? ''}
                                </div>}
                            editView={
                                <Form.Control as="textarea" rows={3} className={styles.createQuizFormInput}
                                    placeholder={quiz?.problemStatement ?? ''}
                                    name="problemStatement"
                                    value={quiz?.problemStatement ?? ''}
                                    onChange={handleChange} />
                            }
                            onCancel={handleCancel}
                            onSave={handleSave}
                            editable={editable} />
                    </Card.Text>
                </Card.Body>
            </Card>
            <ProblemSummaryCard />
            <Card className={styles.panel}>
                <Card.Header className={styles.title}>Solution </Card.Header>
                <Card.Body>
                    <EditableView
                        defaultView={
                            <SolutionPanel solution={parseTextToSolution(quiz?.solution ?? "")}
                                commentsList={commentList}
                                onUploadComment={handleUploadComment}
                                onHandleGetComment={handleGetComment} />}
                        editView={
                            <CreateSolutionPanel onSolutionTextUpdate={updateSolution}
                                value={quiz?.solution ?? ""}
                                commentsList={commentList}
                                onUploadComment={handleUploadComment}
                                onHandleGetComment={handleGetComment} />
                        }
                        onCancel={handleCancel}
                        onSave={handleSave}
                        editable={editable} />
                </Card.Body>
            </Card>
        </div>);
}

export async function getServerSideProps({ params }) {
    const problemData = await getProblemDetailViewFromId(params.id);
    return {
        props: {
            problemData: {
                problemStatement: problemData?.problemStatement ?? "",
                solution: problemData?.solution ?? "",
                summary: problemData.summary,
                id: params.id,
            },
            submitUserName: problemData.submitUserName,
        }
    }
}