import React, { useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup, Modal } from "react-bootstrap";
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
    const [state, setState] = useState<TutorRequestFormType>({ tags: [] });

    let accountContext = useAccountContext();

    const updateTags = (tags) => {
        setState((state) => (
            {
                ...state,
                tags: tags
            })
        );
    }

    useEffect(() => {
        updateTags(
            accountContext.tags ?? []
        );
    }, [accountContext.tags]);

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleRateChange = (event) => {
        setState({
            ...state,
            rate: {
                type: "hourly",
                number: parseFloat(event.target.value),
            }
        });
    };
    const [session] = useSession();

    return <Modal show={isActive} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Tutor request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form >
                <Form.Group controlId="tutorRequest.message">
                    <Form.Label>Tell us what you are looking for</Form.Label>
                    <div>
                        <TextareaAutosize
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            name="message"
                            placeholder=""
                            rows={5}
                            value={state.message ?? ''}>
                        </TextareaAutosize>
                    </div>
                </Form.Group>

                <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                    Username
                 </Form.Label>
                <InputGroup className="mb-2">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Hourly Rate</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="inlineFormInputGroup" placeholder=""
                        value={state.rate?.number ?? ""}
                        onChange={handleRateChange} />
                </InputGroup>

                <Form.Group controlId="tutorRequest.tags">
                    <Form.Label>Tags</Form.Label>
                    <InputButtonList tags={state.tags} onUpdate={(tagsState) => {
                        updateTags(tagsState);
                    }}
                        name="create-tutor-request" />
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