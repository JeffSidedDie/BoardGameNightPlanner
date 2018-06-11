import { connect, Dispatch } from 'react-redux';
import { IAppState } from 'src';
import { AuthComponent, IAuthComponentProperties } from 'src/auth/auth.component';
import { IAppAction } from 'src/common/redux';

// This is used to translate the state of the page to the props on the component
function mapStateToProps(state: IAppState): Partial<IAuthComponentProperties> {
    return {
        userId: state.auth.userId,
    };
}

// This should create proxy wrappers for actions used by the component
function mapDispatchToProps(dispatch: Dispatch<IAppAction>): Partial<IAuthComponentProperties> {
    return {
    };
}

// Connect function "wires" both of the map functions and returns a wrapper container for the component
export const Auth = connect(mapStateToProps, mapDispatchToProps)(AuthComponent);