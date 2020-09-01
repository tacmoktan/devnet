import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import DevNetLogo from '../../assets/logo.png';
import '../../index.css';
//material ui
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Checkbox } from '@material-ui/core/';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import WbIncandescentOutlinedIcon from '@material-ui/icons/WbIncandescentOutlined';

//action
import { logout } from '../../redux/actions/auth';

import Context from '../../context-api/context';

const useNavbarStyles = makeStyles(theme => ({
    header: {
        width: '100%'
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0'
    },
    logoImg: {
        width: 110
    },
    linkContainer: {
        width: '450px',
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        fontFamily: theme.typography.h1.fontFamily,
        color: theme.palette.primary.main,
        fontSize: '1.2em',
        '&:hover': {
            color: theme.palette.secondary.light
        }
    },
    authBtnContainer: {
        display: 'flex'
    },
    authBtn: {
        padding: '8px 20px',
        border: `2px solid ${theme.palette.secondary.light}`,
    },
    registerBtn: {
        backgroundColor: theme.palette.secondary.dark,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.contrastText,
        }
    }

}))

const Navbar = ({ auth, logout }) => {

    const { state, dispatch } = useContext(Context);

    const handleClick = () => {
        dispatch({ type: "TOGGLE_DARK_MODE" })
    }

    const { isAuthenticated, loading } = auth;

    const { header, nav, logoImg, linkContainer, navLink, authBtnContainer, authBtn, registerBtn } = useNavbarStyles();

    const authLinks = (<>
        <Link className={navLink} to="/developers">Developers</Link>
        <Link className={navLink} to="/posts">Posts</Link>
        <Link className={navLink} to="/dashboard">Dashboard</Link>
        <Link onClick={logout} className={navLink} to="/login">Logout</Link>
    </>)

    const guestLinks = (<>
        <Link className={navLink} to="/developers">Developers</Link>
        <div className={authBtnContainer}>
            <Link className={`${navLink} ${authBtn} login-btn`} to="/login" > <LockRoundedIcon /> Login</Link>
            <Link className={`${navLink} ${authBtn} ${registerBtn}`} to="/register"> <AccountBoxRoundedIcon />  Register</Link>
        </div>
    </>)

    return (

        <div className={header}>
            <div className="blocks-container">
                <nav className={nav}>
                    <Link className="logo-link" to="/"><img src={DevNetLogo} className={logoImg} alt="devnet logo" /></Link>
                    <div className={linkContainer}>

                        <FormControlLabel
                            control={<Checkbox icon={<WbIncandescentOutlinedIcon color="primary" fontSize="small" />}
                                checkedIcon={<WbIncandescentIcon color="primary" fontSize="small" />}
                                onChange={handleClick} />}
                            title={state.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        />

                        {!loading && isAuthenticated ? authLinks : guestLinks}
                    </div>
                </nav>
            </div>
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