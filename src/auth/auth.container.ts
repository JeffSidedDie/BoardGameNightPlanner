import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from 'src';
import { AppAction } from 'src/common/redux';
import { loginStart, logout } from './auth.actions';
import { AuthComponent, AuthComponentProperties } from './auth.component';

// This is used to translate the state of the page to the props on the component
function mapStateToProps(state: AppState): Partial<AuthComponentProperties> {
    return {
        userId: state.auth.userId,
    };
}

// This should create proxy wrappers for actions used by the component
function mapDispatchToProps(dispatch: Dispatch<AppAction>): Partial<AuthComponentProperties> {
    return {
        loginStart: (elementId: string) => {
            dispatch(loginStart(elementId));
        },
        logout: () => {
            dispatch(logout());
        },
    };
}

// Connect function "wires" both of the map functions and returns a wrapper container for the component
export const Auth = connect(mapStateToProps, mapDispatchToProps)(AuthComponent);