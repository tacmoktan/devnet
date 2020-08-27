import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { login } from '../../redux/actions/auth';

const Login = ({ login, isAuthenticated }) => {
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
        <>
            <h1>Login</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input className="input" type="email" name="email" placeholder="email" onChange={handleChange} required />
                <input className="input" type="password" name="password" placeholder="password" onChange={handleChange} required />
                <input className="input submit" type="submit" name="Submit" />
            </form>
            <div>
                Don't have an account?
            <Link to="/register" >Sign Up</Link>
            </div>
        </>
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

