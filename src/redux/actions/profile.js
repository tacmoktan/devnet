import axios from 'axios';
import {
    GET_PROFILE, PROFILE_ERROR, ADD_EXPERIENCE, ADD_EDUCATION,
    DEL_EXPERIENCE, DEL_EDUCATION, DEL_ACCOUNT, CLEAR_PROFILE, GET_ALL_PROFILES, GET_REPOS, NO_REPOS
} from './types';

import setAlert from './alert';

//GET current profile
export const getCurrentProfile = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//create or edit profile
export const createProfile = (formData, history, editProfile = false) => async dispatch => {

    try {

        const res = await axios.post('api/profile', formData);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(editProfile ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!editProfile)
            history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//add experience
export const addExperience = (formData, history) => async dispatch => {

    try {
        const res = await axios.put('/api/profile/experience', formData);

        dispatch({
            type: ADD_EXPERIENCE,
            payload: res.data
        });

        dispatch(setAlert('Experience Updated', 'success'));

        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//add education
export const addEducation = (formData, history) => async dispatch => {

    try {
        const res = await axios.put('/api/profile/education', formData);

        dispatch({
            type: ADD_EDUCATION,
            payload: res.data
        });

        dispatch(setAlert('Education Updated', 'success'));

        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//delete experience by id
export const delExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: DEL_EXPERIENCE,
            payload: res.data
        })

        dispatch(setAlert('Experience removed', 'successs'));

    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//delete education by id
export const delEducation = id => async dispatch => {

    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: DEL_EDUCATION,
            payload: res.data
        })

        dispatch(setAlert('Education removed', 'success'));
    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}

//delete account, profile, posts
export const delAccount = () => async dispatch => {

    if (window.confirm("You will DELETE your account permanently, there's no UNDO")) {          //ok = true
        try {
            await axios.delete('/api/profile')

            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: DEL_ACCOUNT })

            dispatch(setAlert('Account Permanently Deleted', 'error'));

        } catch (err) {

            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//get all profiles
export const getAllProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('/api/profile/all');

        dispatch({
            type: GET_ALL_PROFILES,
            payload: res.data
        })

    } catch (err) {
        console.log(err.response);
        const errors = err.response.data.errors;

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//get profile by user id
export const getProfileByUserId = userId => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {

        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })


    } catch (err) {

        const errors = err.response.data.errors;

        if (errors)
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//get github repos by github username
export const getGithubRepos = githubUsername => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${githubUsername}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })

    } catch (err) {
        const message = err.message.includes('404') ? 'Github Profile not found' : ''

        dispatch({
            type: NO_REPOS,
            payload: { msg: message ? message : err.response.statusText, status: err.response.status }
        })
    }
}