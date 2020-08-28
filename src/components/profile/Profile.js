import React, { useEffect } from 'react';
import Spinner from '../layouts/Spinner/Spinner';
import ProfileTop from './ProfileTop';
import ProfileSkills from './ProfileSkills';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithubRepos from './ProfileGithubRepos';

import { Link } from 'react-router-dom';

import { getProfileByUserId } from '../../redux/actions/profile';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

const Profile = ({ profile: { profile, loading }, getProfileByUserId, match, auth }) => {

    useEffect(() => {
        getProfileByUserId(match.params.id);
    }, [getProfileByUserId, match.params.id]);

    return (
        (profile === null || loading) ? <Spinner /> :
            <div>
                <Link to="/developers" className="btn">Back to Developers</Link>
                <div className="profile-details">
                    <ProfileTop {...profile} />
                    <ProfileSkills skills={profile.skills} />
                    {profile.experience && <ProfileExperience experience={profile.experience} />}
                    {profile.education && <ProfileEducation education={profile.education} />}
                    {profile.github && <ProfileGithubRepos githubUsername={profile.github} />}
                </div>
                {auth.user && (profile.user._id === auth.user._id)
                    && <Link to="/edit-profile" className="btn">Edit Profile</Link>}

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