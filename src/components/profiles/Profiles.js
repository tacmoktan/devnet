import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner/Spinner';
import ProfileCard from './ProfileCard';
//action
import { getAllProfiles } from '../../redux/actions/profile'
import { PropTypes } from 'prop-types';
//styles
import { Typography, makeStyles } from '@material-ui/core';
import useHeroStyles from '../../styles/heroImageStyles';

const useProfileStyles = makeStyles(theme => ({
    profilesContainer: {
        display: 'grid',
        justifyContent: 'space-between',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        rowGap: '40px',
        columnGap: '40px',
        width: '100%',
        padding: '20px 0'
    }
}))


const Profiles = ({ profile: { profiles, loading, error }, getAllProfiles }) => {

    const { profilesContainer } = useProfileStyles();
    const { heroImageTitle } = useHeroStyles();

    useEffect(() => {
        getAllProfiles();
    }, [getAllProfiles]);

    const profileBlocks = error ? <h1>{error.msg}</h1> : (
        profiles.length === 0 || loading ? <Spinner /> : (
            profiles.map(profileItem =>
                <ProfileCard profileItem={profileItem} key={profileItem._id} />))
    )

    return (
        <>
            <div className={heroImageTitle}>
                <Typography variant="h1" color="secondary" > Professional </Typography>
                <Typography variant="h1" color="primary" > Developers </Typography>
            </div>
            <div className="main-container">
                <div className={profilesContainer}>
                    {profileBlocks}
                </div>
            </div>
        </>)
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getAllProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getAllProfiles })(Profiles);

