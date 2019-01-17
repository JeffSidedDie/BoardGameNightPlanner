import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from 'src';
import { AppAction } from 'src/common/redux';
import { loginStart, logout } from './auth.actions';
import { AuthComponent, AuthComponentProperties } from './auth.component';

function mapStateToProps(state: AppState): Partial<AuthComponentProperties> {
    return {
        userId: state.auth.userId,
    };
}

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

export const Auth = connect(mapStateToProps, mapDispatchToProps)(AuthComponent);