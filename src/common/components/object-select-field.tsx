import * as Formik from 'formik';
import * as React from 'react';

export interface ObjectSelectFieldCustomProperties<T, V extends {}> {
    readonly values: V[];
    readonly keySelector: (value: V) => string;
    readonly labelSelector: (value: V) => string;
}

type ObjectSelectFieldProperties<T, V extends {}> = ObjectSelectFieldCustomProperties<T, V> & Formik.FieldProps<T>;

export class ObjectSelectField<T, V> extends React.Component<ObjectSelectFieldProperties<T, V>> {

    private selectRef: React.RefObject<HTMLSelectElement> = React.createRef<HTMLSelectElement>();
    private valuesByKeyLookup: Map<string, V> = new Map();

    constructor(props: ObjectSelectFieldProperties<T, V>) {
        super(props);
    }

    public componentDidMount() {
        this.props.values.forEach((v, i) => this.valuesByKeyLookup.set(this.props.keySelector(v), v));
    }

    public componentDidUpdate(prevProps: Readonly<ObjectSelectFieldProperties<T, V>>) {
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

    private handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement> | null) => {
        if (event && event.currentTarget.value) {
            const game = this.valuesByKeyLookup.get(event.currentTarget.value);
            this.props.form.setFieldValue(this.props.field.name, game);
        }
    }
}