import React, { useEffect } from 'react';
import Spinner from '../layouts/Spinner/Spinner';
import ProfilePicInfo from './ProfilePicInfo';
import ProfileInfos from './ProfileInfos';
import ProfileSkills from './ProfileSkills';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithubRepos from './ProfileGithubRepos';
import { Link as RouterLink } from 'react-router-dom';
import { getProfileByUserId } from '../../redux/actions/profile';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
//styles
import { makeStyles, Button, Paper } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useButtonStyles } from '../../styles/buttons';

const useProfileStyles = makeStyles(theme => ({
    profileDetails: {
        display: 'grid',
        gridTemplateColumns: 'minmax(250px, 25%) minmax(250px, 75%)',
        [theme.breakpoints.down(700)]: {
            gridTemplateColumns: 'auto',
            // gridTemplateColumns: 'repeat(auto-fit, minmax(250px, auto))  '
        }
    },
    educationExperience: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        '& > div': {
            padding: 60
        }
    },
    otherProfileInfo: {
        display: 'grid',
        '& > div': {
            padding: 60
        }
    },

}))

const Profile = ({ profile: { profile, loading }, getProfileByUserId, match, auth }) => {

    const { profileDetails, otherProfileInfo, educationExperience } = useProfileStyles();
    const { btn, btnLabel } = useButtonStyles();

    useEffect(() => {
        getProfileByUserId(match.params.id);
    }, [getProfileByUserId, match.params.id]);


    return (
        (profile === null || loading) ? <Spinner /> :
            <div className="main-container">
                <div className="block-container">
                    <Button variant="contained" color="secondary" component={RouterLink} to="/developers" className={btn}
                        style={{
                            borderRadius: 0,
                        }}
                    >
                        <ArrowBackIcon />
                        <span className={btnLabel} >Back to developers</span>
                    </Button>
                    <Paper className={profileDetails}>
                        <ProfilePicInfo {...profile} />
                        <div className={otherProfileInfo} >
                            <ProfileInfos {...profile} />
                            <ProfileSkills skills={profile.skills} />
                        </div>
                    </Paper>
                    <Paper className={educationExperience}>
                        {profile.education && <ProfileEducation education={profile.education} />}

                        {profile.experience && <ProfileExperience experience={profile.experience} />}

                    </Paper>
                    {profile.github && <ProfileGithubRepos githubUsername={profile.github} />}
                    {auth.user && (profile.user._id === auth.user._id)
                        && <RouterLink to="/edit-profile" className="btn">Edit Profile</RouterLink>}
                </div>
            </div>
    )
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    getProfileByUserId: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileByUserId })(Profile);