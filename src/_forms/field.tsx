import * as Formik from 'formik';
import * as React from 'react';

interface IFieldProperties<T> {
    name: keyof T;
    label: string;
}

export class Field<T> extends React.Component<IFieldProperties<T> & Formik.FieldConfig> {

    public render() {
        return <>
            <label htmlFor={this.props.name}>{this.props.label}</label>
            <Formik.Field id={this.props.name} {...this.props} />
        </>;
    }
}