import * as React from 'react';
import { Field } from './field';

export interface FieldWrapperProperties<T, TKey extends keyof T = keyof T> {
    name: TKey;
    index?: number;
    children: Array<React.ReactElement<Field<T[TKey]> | FieldWrapper<T[TKey]>>> | React.ReactElement<Field<T[TKey]> | FieldWrapper<T[TKey]>>;
}

export const FieldWrapperContext = React.createContext('');

export class FieldWrapper<T, TKey extends keyof T = keyof T> extends React.Component<FieldWrapperProperties<T, TKey>> {
    static whyDidYouRender = true;

    public render() {
        return <FieldWrapperContext.Consumer>
            {value => {
                let parentName = '';
                if (value) {
                    parentName += value;
                }
                if (this.props.index !== undefined) {
                    parentName += `[${this.props.index}]`;
                }
                if (parentName) {
                    parentName += '.';
                }
                parentName += this.props.name;
                return <FieldWrapperContext.Provider value={parentName}>
                    {this.props.children}
                </FieldWrapperContext.Provider>;
            }}
        </FieldWrapperContext.Consumer>;
    }
}