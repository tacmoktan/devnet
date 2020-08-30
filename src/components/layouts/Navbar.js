import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import DevNetLogo from '../../assets/logo.png';
import '../../index.css';
//material ui
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';

//action
import { logout } from '../../redux/actions/auth';
import Context from '../../context-api/context';


const Navbar = ({ auth, logout }) => {

    const { dispatch } = useContext(Context);

    const handleClick = () => {
        dispatch({ type: "TOGGLE_DARK_MODE" })
    }

    const { isAuthenticated, loading } = auth;

    const authLinks = (<>
        <Link className="nav-link" to="/developers">Developers</Link>
        <Link className="nav-link" to="/posts">Posts</Link>
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
        <Link onClick={logout} className="nav-link" to="/login">Logout</Link>
    </>)

    const guestLinks = (<>
        <Link className="nav-link" to="/developers">Developers</Link>
        <div className="auth-btn-container">
            <Link className="nav-link auth-btn login-btn" to="/login"> <LockRoundedIcon /> <pre>Login</pre></Link>
            <Link className="nav-link auth-btn register-btn" to="/register"> <AccountBoxRoundedIcon />    <pre>Register</pre></Link>
        </div>
    </>)

    return (

        <div className="header">
            <nav className="nav blocks-container">
                <Link className="logo-link" to="/"><img src={DevNetLogo} className="logo-img" alt="devnet logo" /></Link>
                <div className="link-container">
                    <button onClick={handleClick} > toggle </button>
                    {!loading && isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        </div>
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