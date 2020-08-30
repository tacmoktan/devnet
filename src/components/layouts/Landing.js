import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import onlineFriend from '../../assets/hero-images/online_friends.png';
//styles
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const Landing = ({ isAuthenticated }) => {

    const useLandingStyles = makeStyles(theme => ({
        landing: {
            width: '100%',
            display: 'flex',
            justifyContent:'space-between',
            alignItems:'center'
        },
        landingHeroImage: {
            maxWidth: '700px',
            width: '100%',
            marginLeft: 'auto',
            display: 'block',
        },
        landingTextContainer: {
            maxWidth: 500
        }

    }));

    const { landing, landingHeroImage, landingTextContainer } = useLandingStyles();

    if (isAuthenticated)
        return <Redirect to='/dashboard' />

    return (
        <div className="blocks-container">
            <div className={landing} >
                <div className={landingTextContainer}>
                    <Typography variant="h1" >Meet IT Proffesionals & Discuss Ideas.</Typography>
                    <Typography >Connect with professional developers working on several IT industries. Share posts, discuss ideas and grow your developers circle.</Typography>
                </div>

                <div>
                    <img src={onlineFriend} className={landingHeroImage} alt="landing page pic" />
                </div>
            </div>
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