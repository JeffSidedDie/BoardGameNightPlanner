import * as React from 'react';
import { Field } from './field';

export interface FieldWrapperProperties<T, TKey extends keyof T=keyof T> {
    parentName?: string;
    name: TKey;
    index?: number;
    children: Array<React.ReactElement<Field<T[TKey]> | FieldWrapper<T[TKey]>>> | React.ReactElement<Field<T[TKey]> | FieldWrapper<T[TKey]>>;
}

export class FieldWrapper<T, TKey extends keyof T=keyof T> extends React.Component<FieldWrapperProperties<T, TKey>> {

    public render() {
        let parentName = '';
        if (this.props.parentName) {
            parentName += this.props.parentName;
        }
        if (this.props.index !== undefined) {
            parentName += `[${this.props.index}]`;
        }
        if (parentName) {
            parentName += '.';
        }
        parentName += this.props.name;

        return <>
            {React.Children.map(this.props.children, child =>
                React.isValidElement(child) ? React.cloneElement<{ parentName?: string }>(child, { parentName }) : child
            )}
        </>;
    }
}