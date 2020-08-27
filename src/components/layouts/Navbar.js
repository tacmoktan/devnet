import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import DevNetLogo from './logo.png';
//action
import { logout } from '../../redux/actions/auth';

const Navbar = ({ auth, logout }) => {

    const { isAuthenticated, loading } = auth;

    const authLinks = (<>
        <Link className="nav-link" to="/developers">Developers</Link>
        <Link className="nav-link" to="/posts">Posts</Link>
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
        <Link onClick={logout} className="nav-link" to="/login">Logout</Link>
    </>)

    const guestLinks = (<>
        <Link className="nav-link" to="/developers">Developers</Link>
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="nav-link" to="/register">Register</Link>
    </>)

    return (
        <>
            <nav className="nav">
                <Link className="nav-link logo-link" to="/"><img src={DevNetLogo} className="logo-img" alt="devnet logo" /></Link>
                {!loading && isAuthenticated ? authLinks : guestLinks}
            </nav>
        </>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);