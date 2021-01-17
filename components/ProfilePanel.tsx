import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from '../styles/Profile.module.css'

type ProfileFormType = {
    contact?: string,
    intro?: string,
    email?: string,
    phone?: string,
    otherContact?: string,
}

export default function ProfilePanel() {
    const [state, setState] = useState<ProfileFormType>({});
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
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
                <Form.Control as="textarea" rows={3}
                    placeholder="Introduce yourself"
                    name="intro"
                    value={state.intro ?? ''}
                    onChange={handleChange} />
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

            <Form.Group controlId="phone">
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