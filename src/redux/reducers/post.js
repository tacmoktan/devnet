import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DEL_POST, ADD_POST, ADD_COMMENT, DEL_COMMENT, GET_POST } from '../actions/types';

const initialState = {
    post: null,
    posts: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case GET_POSTS:
            return ({
                ...state,
                posts: payload,
                loading: false,
                post: null               //clears any previous post so that when accessing a post by id, it loads properly 
            })

        case GET_POST:
            return ({
                ...state,
                post: payload,
                loading: false
            })

        case POST_ERROR:
            return ({
                ...state,
                error: payload,
                loading: false
            })

        case UPDATE_LIKES:
            return ({
                ...state,
                posts: state.posts.map(post =>
                    post._id === payload.id ? { ...post, likes: payload.likes } : post),
                loading: false
            })

        case DEL_POST:
            return ({
                ...state,
                posts: state.posts.filter(post => post._id !== payload.id),
                loading: false
            })

        case ADD_POST:
            return ({
                ...state,
                posts: [payload, ...state.posts, ],
                loading: false
            })

        case ADD_COMMENT:
            return ({
                ...state,
                post: {
                    ...state.post,
                    comments: payload
                },
                loading: false
            })

        case DEL_COMMENT:
            return ({
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload)
                },
                loading: false
            })

        default:
            return state;
    }
}