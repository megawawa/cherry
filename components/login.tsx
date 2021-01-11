import { Component, createContext, useContext } from 'react';
import { runInThisContext } from 'vm';

export type LoginContextType = {
    name?: string
    update: (LoginContextType) => void
}

export const LoginContext = createContext<LoginContextType>({
    update: () => { }
})

export class ContextProvider extends Component<any, LoginContextType> {
    update: (loginContext: any) => void;
    constructor(props) {
        super(props);

        this.update = (loginContext) => {
            this.setState(state => ({
                name: loginContext
            }));
        };

        // State also contains the updater function so it will
        // be passed down into the context provider
        this.state = { update: this.update };
    }


    render() {
        // The entire state is passed to the provider
        return (
            <LoginContext.Provider value={this.state}>
                {this.props.children}
            </LoginContext.Provider>
        );
    }
}

export const useLoginContext = () => useContext(LoginContext)

