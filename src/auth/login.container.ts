import { connect, Dispatch } from 'react-redux';
import { IAppState } from 'src';
import { loginStart } from 'src/auth/auth.actions';
import { ILoginComponentProperties, LoginComponent } from 'src/auth/login.component';
import { IAppAction } from 'src/common/redux';

// This is used to translate the state of the page to the props on the component
function mapStateToProps(state: IAppState): Partial<ILoginComponentProperties> {
    return {
    };
}

// This should create proxy wrappers for actions used by the component
function mapDispatchToProps(dispatch: Dispatch<IAppAction>): Partial<ILoginComponentProperties> {
    return {
        loginStart: (elementId: string) => {
            dispatch(loginStart(elementId));
        },
    };
}

// Connect function "wires" both of the map functions and returns a wrapper container for the component
export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);