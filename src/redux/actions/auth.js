import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, CLEAR_PROFILE } from './types';
import axios from 'axios';
import setAlert from './alert';

export const loadUser = () => async dispatch => {

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }

}

//register
export const register = ({ name, email, password }) => dispatch => {

    const body = JSON.stringify({ name, email, password });

    const config = {
        headers: { 'Content-Type': 'application/json' }
    }

    axios.post('/api/user', body, config)
        .then(response => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            })

            dispatch(loadUser());
        })
        .catch(err => {
            const errors = err.response.data.errors;

            if (errors)
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

            dispatch({
                type: REGISTER_FAIL
            })
        })
}

//login
export const login = ({ email, password }) => async dispatch => {

    const body = { email, password };

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());

    } catch (err) {
        if (err.message)
            dispatch(setAlert(err.message, 'danger'))

        if (err.response) {
            const errors = err.response.data.errors;

            if (errors)
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL
        })
    }
}

//logout
export const logout = () => dispatch => {

    dispatch({ type: LOG_OUT })

    dispatch({ type: CLEAR_PROFILE })
}