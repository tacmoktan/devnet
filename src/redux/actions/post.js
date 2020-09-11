import axios from 'axios';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DEL_POST, ADD_POST, GET_POST, ADD_COMMENT, DEL_COMMENT } from "./types";
import setAlert from './alert';

//get all posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts/');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });

    } catch (err) {
        if (err.response) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//like post
export const addLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id: postId, likes: res.data }
        });

    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;
            if(errors)
                errors.forEach(error => dispatch(setAlert(error.msg, 'info')));

            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//unlike post
export const removeLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id: postId, likes: res.data }
        });

    } catch (err) {
        if (err.response) {
            const errors = err.response.data.errors;
            if (errors)
                errors.forEach(error => dispatch(setAlert(error.msg, 'info')));

            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//delete a post by id
export const deletePost = postId => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/${postId}`);

        dispatch({
            type: DEL_POST,
            payload: { id: postId, msg: res.data }
        });


    } catch (err) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//create a post
export const createPost = text => async dispatch => {
    try {
        const res = await axios.post('/api/posts', { text });
        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        dispatch(setAlert('Post created', 'success'));

    } catch (err) {
        if (err.response) {

            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//get a post by id
export const getPost = postId => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${postId}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//add comment
export const addComment = (postId, body) => async dispatch => {
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, body)
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//delete a comment
export const delComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: DEL_COMMENT,
            payload: commentId
        })

        dispatch(setAlert('Comment Deleted', 'success'));

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}