import {
    GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, ADD_EXPERIENCE, ADD_EDUCATION,
    DEL_EXPERIENCE, DEL_EDUCATION, GET_ALL_PROFILES, GET_REPOS, NO_REPOS
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: null,
    repos: []
}

const profile = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {

        case GET_PROFILE:
        case ADD_EXPERIENCE:
        case ADD_EDUCATION:
        case DEL_EXPERIENCE:
        case DEL_EDUCATION:
            return {
                ...state,
                profile: payload,
                loading: false
            }

        case GET_ALL_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }

        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }

        case NO_REPOS:
            return {
                ...state,
                repos:[]
            }

        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                profile: null,
                loading: false
            }

        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                error:null
            }

        default:
            return state

    }
}

export default profile;