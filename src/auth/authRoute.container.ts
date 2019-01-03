import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAppState } from 'src';
import { IAppAction } from 'src/common/redux';
import { AuthRouteComponent, IAuthRouteComponentProperties } from './authRoute.component';

// This is used to translate the state of the page to the props on the component
function mapStateToProps(state: IAppState): Partial<IAuthRouteComponentProperties> {
    return {
        userId: state.auth.userId,
    };
}

// This should create proxy wrappers for actions used by the component
function mapDispatchToProps(dispatch: Dispatch<IAppAction>): Partial<IAuthRouteComponentProperties> {
    return {
    };
}

// Connect function "wires" both of the map functions and returns a wrapper container for the component
export const AuthRoute: React.ComponentClass<IAuthRouteComponentProperties> = connect(mapStateToProps, mapDispatchToProps)(AuthRouteComponent);