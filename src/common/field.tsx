import * as Formik from 'formik';
import * as React from 'react';

interface FieldProperties<T> {
    name: keyof T;
    label: string;
}

export class Field<T> extends React.Component<FieldProperties<T> & Formik.FieldConfig> {

    public render() {
        return <div className="field">
            <label className="label" htmlFor={this.props.name}>{this.props.label}</label>
            <div className="control">
                <Formik.Field className="input "id={this.props.name} {...this.props} />
            </div>
        </div>;
    }
}