import * as Formik from 'formik';
import * as React from 'react';

export class Form<T> extends React.Component<Formik.FormikConfig<T>> {
    public render() {
        return <Formik.Formik {...this.props}>
            <Formik.Form>
                {this.props.children}
            </Formik.Form>
        </Formik.Formik>;
    }
}