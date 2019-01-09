import * as Formik from 'formik';
import * as React from 'react';

export class Form<T> extends React.Component<Formik.FormikConfig<T>> {

    private formikRef: React.RefObject<Formik.Formik<T>> = React.createRef<Formik.Formik<T>>();

    public render() {
        return <Formik.Formik ref={this.formikRef} {...this.props}>
            <Formik.Form>
                {this.props.children}
            </Formik.Form>
        </Formik.Formik>;
    }

    public resetForm() {
        if (this.formikRef.current) {
            this.formikRef.current.resetForm();
        }
    }
}