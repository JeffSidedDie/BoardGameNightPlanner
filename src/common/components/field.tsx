import * as Formik from 'formik';
import * as React from 'react';

interface FieldProperties<T> {
    parentName?: string;
    name: keyof T;
    label: string;
    index?: number;
}

export class Field<T> extends React.Component<FieldProperties<T> & Formik.FieldConfig & React.HTMLAttributes<HTMLInputElement>> {

    public render() {
        const { parentName, index, label, name, ...inputProps } = this.props;
        let inputName = '';
        if (parentName) {
            inputName += parentName;
        }
        if (index !== undefined) {
            inputName += `[${index}]`;
        }
        if (inputName) {
            inputName += '.';
        }
        inputName += name;

        return <div className="field">
            <label className="label" htmlFor={inputName}>{label}</label>
            <div className="control">
                <Formik.Field className="input" id={inputName} name={inputName} {...inputProps} />
            </div>
        </div>;
    }
}