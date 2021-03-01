import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from '../../styles/Profile.module.css'
import { uploadProfileForUser, getUserProfile, createTutorRequestForUser, TutorRequestFormType } from "../../libs/user";
import TextareaAutosize from 'react-autosize-textarea';
import { useSession } from 'next-auth/client';
import { useAccountContext } from "../layout/accountContext";
import InputButtonList from "../libs/inputButtonList";



export default function TutorRequestModal({ isActive, onClose, onSave }: {
    isActive: boolean,
    onClose: () => void,
    onSave: () => void,
}) {
    const [state, setState] = useState<TutorRequestFormType>({});

    let accountContext = useAccountContext();

    const [tags, setTags] = useState<Array<string>>([]);

    useEffect(() => {
        setTags(accountContext.tags ?? []);
    }, [accountContext.tags])

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };
    const [session] = useSession();

    return <Modal show={isActive} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form >
                <Form.Group controlId="tutorRequest.message">
                    <Form.Label>Self-introduction</Form.Label>
                    <div>
                        <TextareaAutosize
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            name="intro"
                            placeholder="Introduce yourself"
                            rows={5}
                            value={state.message ?? ''}>
                        </TextareaAutosize>
                    </div>
                </Form.Group>


                <Form.Group controlId="tutorRequest.tags">
                    <Form.Label>tags</Form.Label>
                    <InputButtonList tags={tags ?? []} onUpdate={(tagsState) => {
                        setTags(tagsState);
                    }} />
                </Form.Group>
            </Form>

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                Close
          </Button>
            <Button variant="primary" onClick={async () => {
                await createTutorRequestForUser(state);
                onSave();
            }}>
                Save Changes
          </Button>
        </Modal.Footer>
    </Modal>;
}