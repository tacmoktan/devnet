import axios from 'axios';
import store from '../../store';
import { LOG_OUT } from '../actions/types';

//to check if Token is expired, if yes logout the user
axios.interceptors.response.use(
    res => res,
    err => {
        if (err.toString().includes('Network Error')){
            throw err
        }
            

        if (err.response.data.msg === 'Token is not invalid') {
            store.dispatch({
                type: LOG_OUT
            })
        }

        return Promise.reject(err);
    }
)

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token);
    }
    else {
        delete axios.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token')
    }

}