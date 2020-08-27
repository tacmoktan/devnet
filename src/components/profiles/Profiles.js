import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner/Spinner';
import ProfileCard from './ProfileCard';
//action
import { getAllProfiles } from '../../redux/actions/profile'

const Profiles = ({ profile: { profiles, loading }, getAllProfiles }) => {

    useEffect(() => {
        getAllProfiles();
    }, [getAllProfiles]);

    const profileBlocks = profiles.length === 0 || loading ? <Spinner /> : profiles.map(profileItem =>
        <ProfileCard profileItem={profileItem} key={profileItem._id} />)

    return (<div className="profiles-container">
        {profileBlocks}
    </div>)
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getAllProfiles })(Profiles);

