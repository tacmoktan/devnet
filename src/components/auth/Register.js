import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//action
import setAlert from '../../redux/actions/alert';
import { register } from '../../redux/actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {

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
            setAlert('Password not matched', 'danger');
        }
        else {
            register({ name, email, password });
            //setAlert('Registration Successful', 'success');
        }

    }

    if (isAuthenticated)
        return <Redirect to="/dashboard" />

    return (<>
        <h1>Register</h1>
        <form className="form" onSubmit={handleSubmit}>
            <input className="input" type="text" name="name" placeholder="name" onChange={handleChange} required />
            <input className="input" type="email" name="email" placeholder="email" onChange={handleChange} required />
            <input className="input" type="password" name="password" placeholder="password" onChange={handleChange} required />
            <input className="input" type="password" name="confirmPassword" placeholder="confirm password" onChange={handleChange} required />
            <input className="input submit" type="submit" value="Submit" />
        </form>
        <div>
            Already have an account?
        <Link to="/login">Sign In</Link>
        </div>
    </>)
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