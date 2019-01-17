import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from 'src';
import { AppAction } from 'src/common/redux';
import { AuthRouteComponent, AuthRouteComponentProperties } from './authRoute.component';

function mapStateToProps(state: AppState): Partial<AuthRouteComponentProperties> {
    return {
        userId: state.auth.userId,
    };
}

function mapDispatchToProps(dispatch: Dispatch<AppAction>): Partial<AuthRouteComponentProperties> {
    return {
    };
}

export const AuthRoute: React.ComponentClass<AuthRouteComponentProperties> = connect(mapStateToProps, mapDispatchToProps)(AuthRouteComponent);