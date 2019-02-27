import * as Formik from 'formik';
import * as React from 'react';
import { Omit } from './omit';

type FileFieldProperties<T> = Formik.FieldProps<T> & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'form'>;

export class FileField<T> extends React.Component<FileFieldProperties<T>> {

    private inputRef: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

    public componentDidUpdate(prevProps: Readonly<FileFieldProperties<T>>) {
        if (prevProps.field.value && !this.props.field.value && this.inputRef.current) {
            this.inputRef.current.value = '';
        }
    }

    public render() {
        return <input ref={this.inputRef} id={this.props.field.name} name={this.props.field.name} type={this.props.type} onChange={this.handleFileInputChange} />;
    }

    private handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            this.props.form.setFieldValue(this.props.field.name, event.currentTarget.files[0]);
        }
    }
}