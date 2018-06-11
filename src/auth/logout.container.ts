import { connect, Dispatch } from 'react-redux';
import { IAppState } from 'src';
import { logout } from 'src/auth/auth.actions';
import { ILogoutComponentProperties, LogoutComponent } from 'src/auth/logout.component';
import { IAppAction } from 'src/common/redux';

// This is used to translate the state of the page to the props on the component
function mapStateToProps(state: IAppState): Partial<ILogoutComponentProperties> {
    return {
        userId: state.auth.userId,
    };
}

// This should create proxy wrappers for actions used by the component
function mapDispatchToProps(dispatch: Dispatch<IAppAction>): Partial<ILogoutComponentProperties> {
    return {
        logout: () => {
            dispatch(logout());
        },
    };
}

// Connect function "wires" both of the map functions and returns a wrapper container for the component
export const Logout = connect(mapStateToProps, mapDispatchToProps)(LogoutComponent);