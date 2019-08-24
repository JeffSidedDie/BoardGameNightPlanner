import * as Formik from 'formik';
import * as React from 'react';
import { FieldWrapperContext } from './field-wrapper';

interface FieldProperties<T> {
    name: keyof T;
    label: string;
    index?: number;
}

export class Field<T> extends React.Component<FieldProperties<T> & Formik.FieldConfig & React.InputHTMLAttributes<HTMLInputElement>> {

    public render() {
        return <FieldWrapperContext.Consumer>
            {value => {
                const { index, label, name, ...inputProps } = this.props;
                let inputName = '';
                if (value) {
                    inputName += value;
                }
                if (index !== undefined) {
                    inputName += `[${index}]`;
                }
                if (inputName) {
                    inputName += '.';
                }
                inputName += name;

                if (inputProps.type === 'checkbox') {
                    return <div className="field">
                        <label className="checkbox">
                            <Formik.Field id={inputName} name={inputName} {...inputProps} />
                            {label}
                        </label>
                    </div>;
                } else {
                    return <div className="field">
                        <label className="label" htmlFor={inputName}>{label}</label>
                        <div className="control">
                            <Formik.Field className="input" id={inputName} name={inputName} {...inputProps} />
                        </div>
                    </div>;
                }
            }}
        </FieldWrapperContext.Consumer>;
    }
}