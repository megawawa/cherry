import { useState } from 'react';
import { LoginContext } from '../components/login'
import { useRouter } from 'next/router'

type NameFormType = {
    name?: string
}

export default function NameForm() {
    const [state, setState] = useState<NameFormType>({});
    const router = useRouter();
    const handleChange = (event) => {
        setState({ name: event.target.value });
    }

    const handleSubmit = (update, event) => {
        alert('A name was submitted: ' + state.name);
        console.log(update);
        update(state.name);
        router.push('/');
        event.preventDefault();
    }

    return (<LoginContext.Consumer>
        {({ name, update }) => (
            <form onSubmit={handleSubmit.bind(this, update)}>
                <label>
                    Name:
                <input type="text" value={state.name ?? name ?? ''}
                        onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )}
    </LoginContext.Consumer>);
}