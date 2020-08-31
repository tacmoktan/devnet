import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner/Spinner';
import ProfileCard from './ProfileCard';
//action
import { getAllProfiles } from '../../redux/actions/profile'
import { PropTypes } from 'prop-types';

const Profiles = ({ profile: { profiles, loading, error }, getAllProfiles }) => {

    useEffect(() => {
        getAllProfiles();
    }, [getAllProfiles]);

    const profileBlocks = error ? <h1>{error.msg}</h1> : (
        profiles.length === 0 || loading ? <Spinner /> : (
            profiles.map(profileItem =>
                <ProfileCard profileItem={profileItem} key={profileItem._id} />))
    )

    return (<div className="profiles-container">
        {profileBlocks}
    </div>)
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getAllProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getAllProfiles })(Profiles);

