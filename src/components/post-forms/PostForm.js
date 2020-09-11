import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../redux/actions/post';
import { PropTypes } from 'prop-types';
import { TextField, Button, makeStyles } from '@material-ui/core';

const usePostFormStyles = makeStyles(theme => ({
    postForm: {
        rowGap: '5px',
    },
    postTextField: {
        '& .MuiOutlinedInput-root': {
            maxWidth: '100%',
            borderRadius: 0,
        }
    },
    postBtn: {
        borderRadius: 0,
        maxWidth: '100%'
    }
}))

const PostForm = ({ createPost }) => {
    const { postForm, postTextField, postBtn } = usePostFormStyles();

    const [postText, setPostText] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        createPost(postText);
    }

    return (
        <form className={postForm} onSubmit={handleSubmit}>
            <TextField variant="outlined" multiline placeholder="Write something..."
                className={postTextField} color="secondary"
                onChange={e => setPostText(e.target.value)} />
            <Button variant="contained" color="secondary" type="submit" className={postBtn}>Post</Button>
        </form>
    )
}

PostForm.propTypes = {
    createPost: PropTypes.func.isRequired
}

export default connect(null, { createPost })(PostForm);