import 'react-datetime/css/react-datetime.css';

import * as Formik from 'formik';
import { Moment } from 'moment';
import * as React from 'react';
import Datetime from 'react-datetime';

type DateTimeFieldProperties<T> = Formik.FieldProps<T> & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'form'>;

export class DateTimeField<T> extends React.Component<DateTimeFieldProperties<T>> {

    private datetimeRef: React.RefObject<Datetime> = React.createRef<Datetime>();

    // public componentDidUpdate(prevProps: Readonly<DateTimeFieldProperties<T>>) {
    //     if (prevProps.field.value && !this.props.field.value && this.datetimeRef.current && this.datetimeRef.current.props.onChange) {

    //     }
    // }

    public render() {
        return <Datetime
            ref={this.datetimeRef}
            value={this.props.field.value}
            onChange={this.handleFileInputChange}
            inputProps={{
                className: 'input',
                id: this.props.field.name,
                name: this.props.field.name,
            }}
        />;
        // return <input ref={this.inputRef} id={this.props.field.name} name={this.props.field.name} type={this.props.type} onChange={this.handleFileInputChange} />;
    }

    private handleFileInputChange = (value: Moment | string) => {
        this.props.form.setFieldValue(this.props.field.name, value);
    }
}