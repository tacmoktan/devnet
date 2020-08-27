import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
//component
import Spinner from '../layouts/Spinner/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
//action
import { getCurrentProfile, delAccount } from '../../redux/actions/profile';

const Dashboard = ({ auth: { user }, profile: { profile, loading }, getCurrentProfile, delAccount }) => {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    
    return (<>
        <h1>Dashboard</h1>
        Welcome <i> {user && user.name} </i> !!   <br />
        {loading && profile === null ? <Spinner />
            :
            <>
                {
                    profile != null ?
                        <>
                            <DashboardActions />
                            <Experience experience={profile.experience} />
                            <Education education={profile.education} />

                            <button className="btn btn-delete" onClick={() => delAccount()}>Delete My Account</button>
                        </>
                        :
                        <div>
                            You don't seem to have a profile. Please setup a profile
                        <Link to="/create-profile" className="create-profile btn">Create Profile</Link>
                        </div>
                }
            </>}
    </>)
}

Dashboard.propType = {
    getCurrentProfile: PropTypes.func.isRequired,
    delAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, delAccount })(Dashboard);