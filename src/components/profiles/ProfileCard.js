import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
//styles
import { Paper, makeStyles, Button, Chip } from '@material-ui/core';
//fonts
import { Gilroy, Avenir } from '../../fonts/fonts';


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
        fontFamily: Avenir.fontFamily,
        fontSize: '2em'
    },
    profileStatus: {
        fontFamily: Gilroy.fontFamily,
        textTransform: 'uppercase',
        opacity: 0.3,
    },
    skillsLabel: {
        fontFamily: Avenir.fontFamily,
        fontSize: '1.2em'
    },
    profileSkill: {
        margin: '3px 5px',
        fontFamily: Gilroy.fontFamily,
        cursor: 'pointer',
        '&:hover': {
            borderColor: theme.palette.secondary.light,
            color: theme.palette.secondary.light
        }
    }
}))

const ProfileCard = ({ profileItem: { user, company, skills, status } }) => {

    const { profileCard, profilePic, profileName, profileStatus, skillsLabel, profileSkill } = useProfileStyles();

    return (
        <Paper className={profileCard} >
            <img src={user.avatar} alt="user avatar" className={profilePic} />
            <div>
                <h2 className={profileName}>{user.name}</h2>
                <div className={profileStatus}>{status}</div> {/* at <span className="profile-company">{company}</span> */}
            </div>
            <div className="profile-skills">
                <h3 className={skillsLabel}>SKills</h3>
                {skills.map((skill, i) =>
                    i < 4 ? <Chip key={'skill_' + i} variant="outlined" color="primary" className={profileSkill} label={skill} />
                        : <></>)}
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