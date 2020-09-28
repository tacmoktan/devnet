import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//action
import setAlert from '../../redux/actions/alert';
import { register } from '../../redux/actions/auth';
import { Paper, Grid, TextField, Button, Typography } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useAuthFormStyles } from '../../styles/authFormStyles';

const Register = ({ setAlert, register, isAuthenticated }) => {

    const { externalLink, formContainer, formImage } = useAuthFormStyles();

    useEffect(() => {
        document.title = "DevNet - Register an Account"
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = formData;

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setAlert('Please enter matching passwords', 'error');
        }
        else {
            register({ name, email, password });
            //setAlert('Registration Successful', 'success');
        }

    }

    if (isAuthenticated)
        return <Redirect to="/dashboard" />

    return (
        <div className="main-container" >
            <Paper >
                <Grid container direction="row">
                    <Grid item xs className={formImage}>

                    </Grid>
                    <Grid item xs className={formContainer}>
                        <div>Create an Account</div>
                        <form className="form" onSubmit={handleSubmit}>
                            <TextField variant="outlined" className="input" type="text" name="name" label="Name" onChange={handleChange} required />
                            <TextField variant="outlined" className="input" type="email" name="email" label="Email" onChange={handleChange} required />
                            <TextField variant="outlined" className="input" type="password" name="password" label="Password" onChange={handleChange} required />
                            <TextField variant="outlined" className="input" type="password" name="confirmPassword" label="Confirm password" onChange={handleChange} required />
                            <Button variant="contained" color="secondary" type="submit" value="Submit" endIcon={<ArrowRightAltIcon />}>
                                Register
                            </Button>
                        </form>
                        <div>
                            Already have an account?
        <Link to="/login" className={externalLink} > <Typography color="primary">Sign In</Typography></Link>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </div>)
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { setAlert, register })(Register);