import { connect } from 'react-redux';
import { AppState } from 'src';
import { NavbarComponent, NavbarComponentProperties } from './navbar.component';

// This is used to translate the state of the page to the props on the component
function mapStateToProps(state: AppState): Partial<NavbarComponentProperties> {
    return {
        userId: state.auth.userId,
    };
}
// Connect function "wires" both of the map functions and returns a wrapper container for the component
export const Navbar = connect(mapStateToProps)(NavbarComponent);