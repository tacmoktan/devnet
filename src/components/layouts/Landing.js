import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import landingPic from './online_friends.png';

const Landing = ({ isAuthenticated }) => {

    if (isAuthenticated)
        return <Redirect to='/dashboard' />


    return (
        <div className="landing">
            <h1>Landing</h1>
            <img src={landingPic} className="landing-hero-image" alt="landing page pic"/>
        </div>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);