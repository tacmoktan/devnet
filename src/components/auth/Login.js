import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { login } from '../../redux/actions/auth';
//styles
import { Grid, TextField, Button, Paper, Typography } from '@material-ui/core/';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useAuthFormStyles } from '../../styles/authFormStyles';

const Login = ({ login, isAuthenticated }) => {
    const { externalLink, formAndImageContainer, formContainer, formImage } = useAuthFormStyles();

    useEffect(() => {
        document.title = "DevNet - Sign in"
    }, [])

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })


    const { email, password } = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = e => {
        e.preventDefault();
        login({ email, password })
    }

    if (isAuthenticated)
        return <Redirect to="/dashboard" />

    return (

        <div className="main-container">
            <Grid container
                direction="row"
                alignItems="center"
            >
                <Paper className={formAndImageContainer}>
                    <Grid container>
                        <Grid item xs className={formImage} >

                        </Grid>

                        <Grid item xs className={formContainer}>
                            <div className="form-instruction">Please enter your email and password to login</div>
                            <form onSubmit={handleSubmit}>
                                <TextField variant="outlined" type="email" name="email" label="Email" onChange={handleChange} required />
                                <TextField variant="outlined" type="password" name="password" label="Password" onChange={handleChange} required />
                                <Button variant="contained" color="secondary" type="submit" name="Submit" endIcon={<ArrowRightAltIcon />}>
                                    Login
                                </Button>
                            </form>
                            <div className="form-redirect">
                                Don't have an account?
                                <Link to="/register" className={externalLink}>
                                    <Typography color="primary"> Sign Up </Typography>
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);

