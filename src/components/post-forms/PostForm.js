import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../redux/actions/post';
import { PropTypes } from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import { usePostFormStyles } from './postFormStyles';

const PostForm = ({ createPost }) => {
    const { postForm, postTextField, postBtn } = usePostFormStyles();

    const [postText, setPostText] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        createPost(postText);
        setPostText('');
    }

    return (
        <form className={postForm} onSubmit={handleSubmit}>
            <TextField variant="outlined" multiline placeholder="Write something..."
                className={postTextField}  value={postText}
                onChange={e => setPostText(e.target.value)} required />
            <Button variant="contained" color="secondary" type="submit" className={postBtn}>Post</Button>
        </form>
    )
}

PostForm.propTypes = {
    createPost: PropTypes.func.isRequired
}

export default connect(null, { createPost })(PostForm);