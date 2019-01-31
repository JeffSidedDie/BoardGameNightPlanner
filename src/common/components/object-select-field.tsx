import * as Formik from 'formik';
import * as React from 'react';
import { Omit } from './omit';

export interface ObjectSelectFieldProperties<T, V> extends Formik.FieldProps<T>, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'form'> {
    readonly values: V[];
    readonly keySelector: (value: V) => string;
    readonly labelSelector: (value: V) => string;
}

export class ObjectSelectField<T, V> extends React.Component<ObjectSelectFieldProperties<T, V>> {

    private selectRef: React.RefObject<HTMLSelectElement> = React.createRef<HTMLSelectElement>();
    private valuesByKeyLookup: Map<string, V>;

    public componentDidUpdate(prevProps: Readonly<ObjectSelectFieldProperties<T, V>>) {
        // Reload value map
        this.valuesByKeyLookup = new Map();
        this.props.values.forEach((v, i) => this.valuesByKeyLookup.set(this.props.keySelector(v), v));

        // Reset inner value if form was reset
        if (prevProps.field.value && !this.props.field.value && this.selectRef.current) {
            this.selectRef.current.value = '';
        }
    }

    public render() {
        return <div className="select">
            <select ref={this.selectRef} id={this.props.field.name} name={this.props.field.name} onChange={this.handleSelectChange}>
                {this.props.values.map((v, i) => <option key={i} value={this.props.keySelector(v)}>{this.props.labelSelector(v)}</option>)}
            </select>
        </div>;
    }

    private handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event && event.currentTarget.value) {
            const value = this.valuesByKeyLookup.get(event.currentTarget.value);
            this.props.form.setFieldValue(this.props.field.name, value);
        }
    }
}