import * as Formik from 'formik';
import * as React from 'react';

export interface ObjectSelectFieldProperties<T> extends Formik.FieldProps<T>, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'form'> {
    readonly values: T[];
    readonly keySelector: (value: T) => string;
    readonly labelSelector: (value: T) => string;
}

export class ObjectSelectField<T> extends React.Component<ObjectSelectFieldProperties<T>> {
    static whyDidYouRender = true;

    private selectRef: React.RefObject<HTMLSelectElement> = React.createRef<HTMLSelectElement>();
    private valuesByKeyLookup: Map<string, T> = new Map();

    public componentDidUpdate(prevProps: Readonly<ObjectSelectFieldProperties<T>>) {
        // Reload value map
        this.valuesByKeyLookup.clear();
        this.props.values.forEach((v, i) => this.valuesByKeyLookup.set(this.props.keySelector(v), v));

        // Reset inner value if form was reset
        if (prevProps.field.value && !this.props.field.value && this.selectRef.current) {
            this.selectRef.current.value = '';
        }
    }

    public render() {
        const currentKey = this.props.keySelector(this.props.field.value);

        return <div className="select">
            <select ref={this.selectRef} id={this.props.field.name} name={this.props.field.name} onChange={this.handleSelectChange} value={currentKey}>
                {!currentKey && <option></option> /* blank option if value doesn't exist in options */}
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