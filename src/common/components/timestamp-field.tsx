import 'react-datetime/css/react-datetime.css';

import * as firebase from 'firebase/app';
import * as Formik from 'formik';
import moment from 'moment';
import { Moment } from 'moment';
import * as React from 'react';
import Datetime from 'react-datetime';

type TimestampFieldProperties<T> = Formik.FieldProps<T> & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'form'>;

export class TimestampField<T> extends React.Component<TimestampFieldProperties<T>> {

    private datetimeRef: React.RefObject<Datetime> = React.createRef<Datetime>();

    // public componentDidUpdate(prevProps: Readonly<DateTimeFieldProperties<T>>) {
    //     if (prevProps.field.value && !this.props.field.value && this.datetimeRef.current && this.datetimeRef.current.props.onChange) {

    //     }
    // }

    public render() {
        const date = (this.props.field.value as firebase.firestore.Timestamp).toDate();
        const m = moment(date);

        return <Datetime
            ref={this.datetimeRef}
            value={m}
            onChange={this.handleInputChange}
            inputProps={{
                className: 'input',
                id: this.props.field.name,
                name: this.props.field.name,
            }}
        />;
        // return <input ref={this.inputRef} id={this.props.field.name} name={this.props.field.name} type={this.props.type} onChange={this.handleFileInputChange} />;
    }

    private handleInputChange = (value: Moment | string) => {
        if (typeof value === 'object') {
            const date = value.toDate();
            const timestamp = firebase.firestore.Timestamp.fromDate(date);
            this.props.form.setFieldValue(this.props.field.name, timestamp);
        }
    }
}