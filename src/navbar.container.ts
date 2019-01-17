import { connect } from 'react-redux';
import { AppState } from 'src';
import { NavbarComponent, NavbarComponentProperties } from './navbar.component';

function mapStateToProps(state: AppState): Partial<NavbarComponentProperties> {
    return {
        userId: state.auth.userId,
    };
}

export const Navbar = connect(mapStateToProps)(NavbarComponent);