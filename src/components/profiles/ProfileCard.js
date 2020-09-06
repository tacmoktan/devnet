import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
//styles
import { Paper, makeStyles, Button, Chip, Typography } from '@material-ui/core';
//fonts
import { Gilroy } from '../../fonts/fonts';

const useProfileStyles = makeStyles(theme => ({
    profileCard: {
        display: 'grid',
        alignItems: 'center',
        justifyItems: 'center',
        padding: '40px 20px',
        textAlign: 'center',
        rowGap: '15px'
    },
    profilePic: {
        width: '100px',
        borderRadius: '50%',
        display: 'block',
        margin: '0 auto',
        boxShadow: `0 8px 10px 2px ${theme.palette.divider}`
    },
    profileName: {
        fontSize: '2em'
    },
    profileStatus: {
        textTransform: 'uppercase',
        opacity: 0.3,
        fontWeight: 'bold'
    },
    skillsLabel: {
        fontSize: '1.2em'
    },
    profileSkill: {
        margin: '3px 5px',
        fontFamily: Gilroy.fontFamily,
    }
}))

const ProfileCard = ({ profileItem: { user, skills, status } }) => {

    const { profileCard, profilePic, profileName, profileStatus, skillsLabel, profileSkill } = useProfileStyles();

    return (
        <Paper className={profileCard} >
            <img src={user.avatar} alt="user avatar" className={profilePic} />
            <div>
                <div className={profileName}>{user.name}</div>
                <div className={profileStatus}>{status}</div> {/* at <span className="profile-company">{company}</span> */}
            </div>
            <div className="profile-skills">
                <Typography variant="h4" className={skillsLabel}>SKills</Typography>
                {skills.map((skill, i) =>
                    i < 4 && <Chip key={'skill_' + i} variant="outlined" color="primary" className={profileSkill} label={skill} />
                )}
            </div>

            <Button variant="contained" color="secondary" style={{ padding: '10px 20px' }} component={RouterLink} to={`/developers/${user._id}`} >
                View Profile
            </Button >

        </Paper>
    )
}

ProfileCard.propTypes = {
    profileItem: PropTypes.object.isRequired
}

export default ProfileCard;