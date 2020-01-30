import * as Formik from 'formik';
import * as React from 'react';
import { FieldWrapperContext } from './field-wrapper';
import { useField } from 'formik';

interface TypedFieldProperties<T> {
    name: keyof T;
    label: string;
    index?: number;
    type: string;
}

export const TypedField = <T,>(props: TypedFieldProperties<T>): React.ReactNode => {
    const fieldWrapper = React.useContext(FieldWrapperContext);
    let inputName = '';
    if (fieldWrapper) {
        inputName += fieldWrapper;
    }
    if (props.index !== undefined) {
        inputName += `[${props.index}]`;
    }
    if (inputName) {
        inputName += '.';
    }
    inputName += props.name;

    const [field, meta, helpers] = useField({ name: inputName, type: props.type });

    if (props.type === 'checkbox') {
        return <div className="field">
            <label className="checkbox">
                <input id={inputName} name={inputName} {...field} />
                {props.label}
            </label>
        </div>;
    } else {
        return <div className="field">
            <label className="label" htmlFor={inputName}>{props.label}</label>
            <div className="control">
                <input className="input" id={inputName} name={inputName} {...field} />
            </div>
        </div>;
    }
}