import { Component, createContext, useContext } from 'react';
import { ProblemPreviewType } from '../../libs/mockDb';

export type AccountContextType = {
    name?: string,
    tags?: Array<string>,
    quizzes?: Array<ProblemPreviewType>,
    update: (AccountContextType) => void
}

export const AccountContext = createContext<AccountContextType>({
    update: () => { }
})

export class AccountContextProvider extends Component<any, AccountContextType> {
    update: (AccountContext: any) => void;
    constructor(props) {
        super(props);

        this.update = (accountContext) => {
            this.setState(state => Object.assign({},
                state, accountContext));
        };

        // State also contains the updater function so it will
        // be passed down into the context provider
        this.state = { update: this.update };
    }


    render() {
        // The entire state is passed to the provider
        return (
            <AccountContext.Provider value={this.state}>
                {this.props.children}
            </AccountContext.Provider>
        );
    }
}

export const useAccountContext = () => useContext(AccountContext)

