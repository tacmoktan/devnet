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
    singleProfileContainer: {
        display: 'grid',
        rowGap: '30px'
    },
    profileDetails: {
        display: 'grid',
        gridTemplateColumns: 'minmax(250px, 25%) minmax(250px, 75%)',
        [theme.breakpoints.down(700)]: {
            gridTemplateColumns: 'auto',
            // gridTemplateColumns: 'repeat(auto-fit, minmax(250px, auto))  '
        }
    },
    profileInfoBlock: {
        display: 'grid',
        '& > div': {
            padding: 60,
            [theme.breakpoints.down("md")]: {
                padding: 40,
            },
            [theme.breakpoints.down("sm")]: {
                padding: 20,
            }
        }
    },
    educationExperience: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        [theme.breakpoints.down(800)]: {
            gridTemplateColumns: 'auto',
        },
    },

}))

const Profile = ({ profile: { profile, loading }, getProfileByUserId, match, auth }) => {

    const { singleProfileContainer, profileDetails, profileInfoBlock, educationExperience } = useProfileStyles();
    const { btn, btnLabel } = useButtonStyles();

    useEffect(() => {
        getProfileByUserId(match.params.id);
    }, [getProfileByUserId, match.params.id]);


    return (
        (profile === null || loading) ? <Spinner /> :
            <div className="main-container">
                <div className={`${singleProfileContainer} block-container`}>
                    <Button variant="contained" color="secondary" component={RouterLink} to="/developers" className={btn}
                        style={{
                            borderRadius: 0,
                            maxWidth: 285,
                        }}
                    >
                        <ArrowBackIcon />
                        <span className={btnLabel} >Back to developers</span>
                    </Button>
                    <Paper className={profileDetails}>
                        <ProfilePicInfo {...profile} />
                        <div className={profileInfoBlock} >
                            <ProfileInfos {...profile} />
                            <ProfileSkills skills={profile.skills} />
                        </div>
                    </Paper>
                    <Paper className={`${educationExperience} ${profileInfoBlock}`}>
                        {profile.education && <ProfileEducation education={profile.education} />}

                        {profile.experience && <ProfileExperience experience={profile.experience} />}
                    </Paper>

                    <Paper className={profileInfoBlock}>
                        {profile.github && <ProfileGithubRepos githubUsername={profile.github} />}
                    </Paper>
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