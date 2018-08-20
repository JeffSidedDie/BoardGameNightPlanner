import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from 'src';
import { IAppAction } from 'src/common/redux';
import { GamesComponent, IGamesComponentProperties } from './games.component';

// This is used to translate the state of the page to the props on the component
function mapStateToProps(state: IAppState): Partial<IGamesComponentProperties> {
    return {
        userId: state.auth.userId,
    };
}

// This should create proxy wrappers for actions used by the component
function mapDispatchToProps(dispatch: ThunkDispatch<IAppState, {}, IAppAction>): Partial<IGamesComponentProperties> {
    return {
    };
}

// Connect function "wires" both of the map functions and returns a wrapper container for the component
export const Games = connect(mapStateToProps, mapDispatchToProps)(GamesComponent);