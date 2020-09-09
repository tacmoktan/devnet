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
//style
import { Typography, makeStyles, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useButtonStyles } from '../../styles/buttons';

const useDashboardStyles = makeStyles(theme => ({
    dashboardContainer: {
        display: 'grid',
        rowGap: '60px'
    }
}))

const Dashboard = ({ auth: { user }, profile: { profile, loading }, getCurrentProfile, delAccount }) => {

    const { dashboardContainer } = useDashboardStyles();
    const { btn, btnLabel, delBtn } = useButtonStyles();

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return (
        <div className={`main-container ${dashboardContainer}`}>
            <div>
                <Typography variant="h4" >Welcome, </Typography>
                <Typography variant="h1" color="primary">{user && user.name} </Typography>
            </div>
            {loading && profile === null ? <Spinner />
                :
                <>
                    {
                        profile != null ?
                            <>
                                <DashboardActions />
                                <Experience experience={profile.experience} />
                                <Education education={profile.education} />

                                <Button className={`${btn} ${delBtn}`} onClick={() => delAccount()}>
                                    <span className={btnLabel}>Delete Account</span>
                                    <DeleteIcon />
                                </Button>
                            </>
                            :
                            <div>
                                You don't seem to have a profile. Please setup a profile
                        <Button variant="outlined" component={Link} to="/create-profile" className="create-profile btn">Create Profile</Button>
                            </div>
                    }
                </>}
        </div>)
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