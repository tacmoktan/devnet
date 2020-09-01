import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import onlineFriend from '../../assets/hero-images/online_friends.png';
//styles
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

const Landing = ({ isAuthenticated }) => {

    const useLandingStyles = makeStyles(theme => ({
        landingHeroImage: {
            maxWidth: '700px',
            width: '100%',
            marginLeft: 'auto',
            display: 'block',
        },
        landingTextContainer: {
            display: 'grid',
            rowGap: '20px'
        },
        landingTextDescription: {
            fontSize: '2em'
        }

    }));

    const { landingHeroImage, landingTextContainer, landingTitle, landingTextDescription } = useLandingStyles();

    if (isAuthenticated)
        return <Redirect to='/dashboard' />

    return (
        <div className="blocks-container">
            <Grid container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item className={landingTextContainer} xs>
                    <div className={landingTitle}>
                        <Typography variant="h1" > Meet IT </Typography>
                        <Typography variant="h1" color="primary" >Proffesionals</Typography>
                        <Typography variant="h1" > & Discuss </Typography>
                        <Typography variant="h1" color="secondary" >Ideas.</Typography>
                    </div>
                    <Typography className={landingTextDescription}>Connect with professionals of IT industry, share posts, discuss ideas and grow your circle.</Typography>
                    <Button variant="contained" color="secondary" component={RouterLink} to="/login">
                        GET STARTED  <DoubleArrowIcon />
                    </Button>
                </Grid>

                <Grid item xs>
                    <img src={onlineFriend} className={landingHeroImage} alt="landing page pic" />
                </Grid>
            </Grid>
        </div >
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);