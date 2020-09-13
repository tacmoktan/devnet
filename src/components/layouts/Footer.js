import React from 'react';
import logoPng from '../../assets/logo.png';
import { makeStyles } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';

const useFooterStyles = makeStyles(theme => ({
    footer: {
        display: 'grid',
        padding: 20,
        rowGap: '40px',
        justifyItems: 'center'
    },
    logoContainer: {
        position: 'relative',
        width: '100%',
        textAlign: 'center',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            width: '100%',
            height: 1,
            backgroundColor: theme.palette.text.secondary
        }
    },
    footerLogo: {
        width: 300,
        padding: '0px 20px',
        position: 'relative',
        backgroundColor: theme.palette.background.default,
    },
    socialLinksContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 180,
        marginTop: '-25px',
        '& a': {
            color: theme.palette.secondary.light,
            '&:hover': {
                color: theme.palette.secondary.dark,
            }
        }
    },
    copyrightText: {
        position: 'relative',
        marginTop: 25,
        paddingTop: 25,
        color: theme.palette.secondary.main,
        fontWeight:'bold',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            height: 40,
            width: 1,
            backgroundColor: theme.palette.text.secondary
        }
    }
}));

const Footer = () => {
    const { footer, logoContainer, footerLogo, socialLinksContainer, copyrightText } = useFooterStyles();
    return (
        <>
            <div className={footer}>
                <div className={logoContainer}>

                    <img src={logoPng} alt="devnet logo" className={footerLogo} />
                </div>
                <div className={socialLinksContainer}>
                    <a href='https://www.linkedin.com/' target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon />
                    </a>
                    <a href='https://www.facebook.com/' target="_blank" rel="noopener noreferrer">
                        <FacebookIcon />
                    </a>
                    <a href='https://www.youtube.com/' target="_blank" rel="noopener noreferrer">
                        <YouTubeIcon />
                    </a>
                </div>

                <div className={copyrightText}>
                    &copy; 2020 | DevNet
                </div>
            </div>
        </>
    )
}

export default Footer;