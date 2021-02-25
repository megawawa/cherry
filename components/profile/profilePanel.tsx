import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from '../../styles/Profile.module.css'
import { uploadProfileForUser, getUserProfile, ProfileFormType } from "../../libs/user";
import TextareaAutosize from 'react-autosize-textarea';

export default function ProfilePanel() {
    const [state, setState] = useState<ProfileFormType>({});
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const syncState = async () => {
        // already initialized interest. sync interest to db
        if (state.contact != undefined
            && state.intro != undefined
            && state.email != undefined
            && state.otherContact != undefined
            && state.phone != undefined) {
            uploadProfileForUser(state);
            return;
        }

        // fetch interest from db
        let userProfile = await getUserProfile();
        userProfile.contact = state.contact ??
            userProfile.contact ?? "";
        userProfile.intro = state.intro ??
            userProfile.intro ?? "";
        userProfile.email = state.email ??
            userProfile.email ?? "";
        userProfile.otherContact = state.otherContact ??
            userProfile.otherContact ?? "";
        userProfile.phone = state.phone ??
            userProfile.phone ?? "";

        setState(userProfile);
    };

    useEffect(() => {
        syncState();
    }, [state]);

    const handleSubmit = (event) => {
        event.preventDefault();
        syncState();
    }

    return <div className={styles.profilePanel}>
        <Form onSubmit={handleSubmit.bind(this)}>
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

            <Button variant="primary" type="submit" className="mt-2">
                Save
            </Button>
        </Form>
    </div>;
}