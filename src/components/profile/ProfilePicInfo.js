import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';

const useProfilePicStyles = makeStyles(theme => ({
    profilePic: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'grid',
        alignContent: 'flex-end',
        textAlign: 'center',
    },
    profilePicInfo: {
        color: 'white',
        background: `linear-gradient(0deg, ${theme.palette.secondary.dark}, transparent)`,
        padding: '30px 10px',
        display: 'grid',
        rowGap: '10px',
    },
    statusCompany: {
        lineHeight: 1.5,
        opacity: 0.75,
        '& div': {
            fontWeight: 'bold'
        }
    },
    profileStatus: {
        textTransform: 'uppercase'
    },
    profileCompany: {

    },
    profileAddress: {
        opacity: 0.75,
        display: 'flex',
        justifyContent: 'center'
    },
    socials: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    socialLink: {
        '& .MuiSvgIcon-root': {
            color: 'white',
            opacity: 0.5,
            '&:hover': {
                opacity: 0.8
            }
        }
    }
}));

const ProfilePicInfo = ({ user, address, status, company, social }) => {

    const { profilePic, profilePicInfo, profileAddress, statusCompany, profileStatus, profileCompany, socials, socialLink } = useProfilePicStyles();
    return (
        <div className={profilePic} style={{ backgroundImage: `url(${user.avatar})`, height: 550 }}>

            <div className={profilePicInfo}>
                <Typography variant="h4">{user.name}</Typography>

                <Typography variant="subtitle1" className={profileAddress}> <RoomIcon /> {address}</Typography>

                <Typography variant="subtitle1" className={statusCompany}>
                    <div className={profileStatus}> {status} </div> at
                    <div className={profileCompany} > {company}</div>
                </Typography>

                {
                    social &&
                    <div className={socials}>
                        {social.facebook &&
                            <a href={social.facebook} className={socialLink} target="_blank" rel="noopener noreferrer"> <FacebookIcon /> </a>}
                        {social.linkedin &&
                            <a href={social.linkedin} className={socialLink} target="_blank" rel="noopener noreferrer"> <LinkedInIcon /> </a>}
                        {social.youtube &&
                            <a href={social.youtube} className={socialLink} target="_blank" rel="noopener noreferrer"> <YouTubeIcon /> </a>}
                    </div>
                }
            </div>
        </div>
    )
}

export default ProfilePicInfo;