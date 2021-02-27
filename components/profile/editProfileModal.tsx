import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from '../../styles/Profile.module.css'
import { uploadProfileForUser, getUserProfile, ProfileFormType } from "../../libs/user";
import TextareaAutosize from 'react-autosize-textarea';
import { useSession } from 'next-auth/client';

export default function EditProfileModal({ isActive, onClose, profile, onSave }: {
    isActive: boolean,
    onClose: () => void,
    onSave: () => void,
    profile: ProfileFormType,
}) {
    const [state, setState] = useState<ProfileFormType>(profile ?? {});
    useEffect(() => {
        setState(profile ?? {});
    }, [profile]);

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
            <Form>
                <Form.Group controlId="preferredContact">
                    <Form.Label>Preferred ways of contact</Form.Label>
                    <Form.Control
                        type="text" placeholder="eg: email > phone"
                        name="contact"
                        value={state.contact ?? ''}
                        onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="intro">
                    <Form.Label>Self-introduction</Form.Label>
                    <div>
                        <TextareaAutosize
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            name="intro"
                            placeholder="Introduce yourself"
                            rows={5}
                            value={state.intro ?? ''}>
                        </TextareaAutosize>
                    </div>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email" placeholder="Enter email"
                        name="email"
                        value={state.email ?? ''}
                        onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="phone"
                        placeholder="***-***-****"
                        name="phone"
                        value={state.phone ?? ''}
                        onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="contact">
                    <Form.Label>Other contact</Form.Label>
                    <Form.Control type="text"
                        placeholder="other contact"
                        name="otherContact"
                        value={state.otherContact ?? ''}
                        onChange={handleChange} />
                </Form.Group>

                <div>Your information would be visible to registered users.</div>
            </Form>

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                Close
          </Button>
            <Button variant="primary" onClick={async () => {
                await uploadProfileForUser(state);
                onSave();
            }}>
                Save Changes
          </Button>
        </Modal.Footer>
    </Modal>;
}