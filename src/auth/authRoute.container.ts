import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from 'src';
import { AppAction } from 'src/common/redux';
import { AuthRouteComponent, AuthRouteComponentProperties } from './authRoute.component';

// This is used to translate the state of the page to the props on the component
function mapStateToProps(state: AppState): Partial<AuthRouteComponentProperties> {
    return {
        userId: state.auth.userId,
    };
}

// This should create proxy wrappers for actions used by the component
function mapDispatchToProps(dispatch: Dispatch<AppAction>): Partial<AuthRouteComponentProperties> {
    return {
    };
}

// Connect function "wires" both of the map functions and returns a wrapper container for the component
export const AuthRoute: React.ComponentClass<AuthRouteComponentProperties> = connect(mapStateToProps, mapDispatchToProps)(AuthRouteComponent);