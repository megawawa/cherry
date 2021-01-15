import { useState } from 'react';
import { LoginContext } from './login'
import { useRouter } from 'next/router'
import { Form, Button } from 'react-bootstrap';

type LoginFormType = {
    name?: string,
    password?: string,
    email?: string,
}

export default function LoginForm() {
    const [state, setState] = useState<LoginFormType>({});
    const router = useRouter();
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (update, event) => {
        update(state.name);
        router.push('/');
        event.preventDefault();
    }

    return (<LoginContext.Consumer>
        {({ name, update }) => (
            <Form onSubmit={handleSubmit.bind(this, update)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text" placeholder="Enter name"
                        name="name"
                        value={state.name ?? name ?? ''}
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
                <Button variant="primary" type="submit">
                    Create account
                </Button>
            </Form>

        )}
    </LoginContext.Consumer>);
}


