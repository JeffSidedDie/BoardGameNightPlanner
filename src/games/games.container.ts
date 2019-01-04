import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'src';
import { AppAction } from 'src/common/redux';
import { GamesComponent, GamesComponentProperties } from './games.component';

// This is used to translate the state of the page to the props on the component
function mapStateToProps(state: AppState): Partial<GamesComponentProperties> {
    return {
        userId: state.auth.userId,
    };
}

// This should create proxy wrappers for actions used by the component
function mapDispatchToProps(dispatch: ThunkDispatch<AppState, {}, AppAction>): Partial<GamesComponentProperties> {
    return {
    };
}

// Connect function "wires" both of the map functions and returns a wrapper container for the component
export const Games = connect(mapStateToProps, mapDispatchToProps)(GamesComponent);