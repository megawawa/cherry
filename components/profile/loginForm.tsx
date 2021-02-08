import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

type LoginFormType = {
    name?: string,
    password?: string,
    email?: string,
}

export default function LoginForm({ csrfToken, error }) {
    const [state, setState] = useState<LoginFormType>({});
    const router = useRouter();
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Form method='post' action='/api/auth/callback/credentials'>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken}></input>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email" placeholder="Enter email"
                    name="email"
                    value={state.email ?? ''}
                    onChange={handleChange} />
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
            { error?.loginError &&
                (
                    <Form.Group controlId="errorPrompt">
                        <Form.Text style={{ color: "red" }}>
                            Invalid email or password
                        </Form.Text>
                    </Form.Group>)}
            <Button variant="primary" type="submit">
                Sign in
                </Button>
        </Form>);
}


