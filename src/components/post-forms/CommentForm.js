import React, { useState } from 'react';
import { addComment } from '../../redux/actions/post';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

const CommentForm = ({ post: { _id }, addComment }) => {

    const [comment, setComment] = useState({
        text: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        addComment(_id, comment);
        setComment({ text: '' });   // clears textarea 
    }

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <textarea className="comment-input" placeholder="Write a comment" value={comment.text}
                onChange={e => setComment({ text: e.target.value })}></textarea>
            <input type="submit" value="post" className="input-submit" />
        </form >
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    post:PropTypes.object.isRequired
}

export default connect(null, { addComment })(CommentForm);