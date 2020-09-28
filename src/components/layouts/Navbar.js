import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import DevNetLogo from '../../assets/logo.png';
import '../../index.css';
//material ui
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Checkbox, IconButton } from '@material-ui/core/';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import WbIncandescentOutlinedIcon from '@material-ui/icons/WbIncandescentOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import CancelIcon from '@material-ui/icons/Cancel';

//action
import { logout } from '../../redux/actions/auth';

import Context from '../../context-api/context';

const useNavbarStyles = makeStyles(theme => ({
    header: {
        width: '100%',
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        }
    },
    logoMenuContainer: {
        display: ' flex',
        alignItems: ' center',
        justifyContent: ' space-between',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    logoImg: {
        width: 110
    },
    menuButton: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    linkContainer: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            display: showNav => showNav ? 'flex' : 'none',            //grid or none
            flexDirection: 'column',
            alignItems: 'flex-start',
            '& label': {
                margin: '0 auto'        //dark mode btn center
            }
        }
    },
    authNav: {
        width: 600,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    guestNav: {
        width: 450,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.primary.main,
        fontSize: '1.2em',
        '&:hover': {
            color: theme.palette.secondary.light
        },
        background: 'transparent',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            padding: '10px 0',
            '&:hover': {
                background: theme.palette.action.hover
            }
        }
    },
    authBtnContainer: {
        display: 'flex'
    },
    authBtn: {
        padding: '8px 20px',
        border: `2px solid ${theme.palette.divider}`,
        '&:hover': {
            borderColor: theme.palette.secondary.light,
        },
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            columnGap: '5px',
            width: 'fit-content',
            margin: '10px 0',
        }
    },
    registerBtn: {
        backgroundColor: theme.palette.secondary.dark,
        color: "white",
        '&:hover': {
            color: "white",
            backgroundColor: theme.palette.primary.main,
        }
    }

}))

const Navbar = ({ auth, logout }) => {

    const { state, dispatch } = useContext(Context);

    const handleClick = () => {
        dispatch({ type: "TOGGLE_DARK_MODE" })
    }

    //responsive Nav
    const [showNav, setNav] = useState(false);

    const handleShowNav = () => setNav(!showNav);

    const { isAuthenticated, loading } = auth;

    const { header, nav, logoMenuContainer, logoImg, menuButton, linkContainer, guestNav, authNav,
        navLink, authBtnContainer, authBtn, registerBtn } = useNavbarStyles(showNav);

    const authLinks = (<>
        <Link className={navLink} to="/developers">Developers</Link>
        <Link className={navLink} to="/posts">Posts</Link>
        <Link className={navLink} to="/dashboard">Dashboard</Link>
        <Link onClick={logout} className={`${navLink} ${authBtn}`} to="/login"> <PowerSettingsNewIcon /> Logout</Link>
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
            <div className="head main-container">
                <nav className={nav}>
                    <span className={logoMenuContainer}>
                        <Link to="/">
                            <img src={DevNetLogo} className={logoImg} alt="devnet logo" />
                        </Link>
                        <IconButton className={menuButton} onClick={handleShowNav} color="primary">
                            {showNav ? <CancelIcon /> : <MenuIcon />}
                        </IconButton>
                    </span>

                    <div className={isAuthenticated ? `${linkContainer} ${authNav}` : `${linkContainer} ${guestNav}`}>

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