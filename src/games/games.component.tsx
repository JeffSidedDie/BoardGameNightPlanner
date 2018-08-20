import * as React from 'react';

export interface IGamesComponentProperties {
    readonly userId: string;
}

export class GamesComponent extends React.Component<IGamesComponentProperties> {

    public render() {
        return <>
            <form>
                <label htmlFor="exampleEmailInput">Your email</label>
                <input className="u-full-width" type="email" placeholder="test@mailbox.com" id="exampleEmailInput" />
            </form>
        </>;
    }
}