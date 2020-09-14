import React, { useState } from 'react';
import { addComment } from '../../redux/actions/post';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import { usePostFormStyles } from './postFormStyles';


const CommentForm = ({ post: { _id }, addComment }) => {
    const { commentForm, commentTextField, postBtn, } = usePostFormStyles();

    const [comment, setComment] = useState({
        text: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        addComment(_id, comment);
        setComment({ text: '' });   // clears textarea 
    }

    return (
        <form className={commentForm} onSubmit={handleSubmit}>
            <TextField variant="outlined" multiline className={commentTextField}
                placeholder="Write a comment..." value={comment.text}
                onChange={e => setComment({ text: e.target.value })} />
            <Button type="submit" variant="contained" color="secondary" className={postBtn} disabled={comment.text ? false : true}>Comment</Button>
        </form >
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

export default connect(null, { addComment })(CommentForm);