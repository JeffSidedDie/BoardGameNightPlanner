import 'react-datetime/css/react-datetime.css';

import * as firebase from 'firebase/app';
import * as Formik from 'formik';
import moment from 'moment';
import { Moment } from 'moment';
import * as React from 'react';
import Datetime from 'react-datetime';
import { useField } from 'formik';

interface TimestampFieldProperties<T> {
    name: keyof T;
    label: string;
}
// type TimestampFieldProperties = Formik.FieldProps<firebase.firestore.Timestamp> & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'form'>;

export const TimestampField = <T,>(props: TimestampFieldProperties<T>) => {
    const [field, meta, helpers] = useField<firebase.firestore.Timestamp>(props.name as string);

    const handleInputChange = (value: Moment | string) => {
        if (typeof value === 'object') {
            const date = value.toDate();
            const timestamp = firebase.firestore.Timestamp.fromDate(date);
            helpers.setValue(timestamp);
        }
    };

    const date = field.value.toDate();
    const m = moment(date);

    return <>
        <label className="label" htmlFor={props.name as string}>{props.label}</label>
        <Datetime
            value={m}
            onChange={handleInputChange}
            inputProps={{
                className: 'input',
                id: field.name,
                name: field.name,
            }}
        />
    </>;
};
TimestampField.whyDidYouRender = true;