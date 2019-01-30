import { connect } from 'react-redux';
import { AppState } from 'src';
import { NavbarComponent, NavbarComponentProperties } from './navbar.component';

function mapStateToProps(state: AppState): Partial<NavbarComponentProperties> {
    return {
        userId: state.auth.userId,
        userIsAdmin: state.auth.isAdmin,
    };
}

export const Navbar = connect(mapStateToProps)(NavbarComponent);