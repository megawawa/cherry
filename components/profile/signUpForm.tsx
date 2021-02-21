import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import { useSession } from 'next-auth/client';


export default function SignUpForm({ csrfToken, error, handleChange, state }) {
    const router = useRouter();

    const [session] = useSession();

    return (
        <Form method='post' action='/api/auth/callback/credentials'>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken}></input>
            <input name='isNewUser' type='hidden' defaultValue={1}></input>
            <input name='isStudent' type='hidden' defaultValue={state.isStudent}></input>
            <input name='isTutor' type='hidden' defaultValue={state.isTutor}></input>
            <Form.Group controlId="formBasicName">
                <Form.Label>Display name</Form.Label>
                <Form.Control
                    type="text" placeholder="Enter name"
                    name="name"
                    value={state.name ?? session?.user?.name ?? ''}
                    onChange={handleChange} />
                <Form.Text className="text-muted">
                    This is the name you would show for everyone
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email" placeholder="Enter email"
                    name="email"
                    value={state.email ?? ''}
                    onChange={handleChange} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password" placeholder="Password"
                    name="password"
                    value={state.password ?? ''}
                    onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            { error?.signUpError &&
                (
                    <Form.Group controlId="errorPrompt">
                        <Form.Text style={{ color: "red" }}>
                            User name already exists
                        </Form.Text>
                    </Form.Group>)}
            <Button variant="primary" type="submit">
                Create account
                </Button>
        </Form>

    );
}


