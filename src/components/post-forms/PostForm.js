import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../redux/actions/post';
import { PropTypes } from 'prop-types';

const PostForm = ({ createPost }) => {

    const [postText, setPostText] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        createPost(postText);
    }

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <textarea placeholder="Create a post" onChange={e => setPostText(e.target.value)}></textarea>
            <input type="submit" value="post" />
        </form>
    )
}

PostForm.propTypes = {
    createPost: PropTypes.func.isRequired
}

export default connect(null, { createPost })(PostForm);