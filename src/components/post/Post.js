import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//component
import PostItem from '../Posts/PostItem';
import CommentForm from '../post-forms/CommentForm';
import Comment from './Comment';
import Spinner from '../layouts/Spinner/Spinner';

import { getPost } from '../../redux/actions/post';
import { PropTypes } from 'prop-types';
import { Button, Paper } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Post = ({ post: { post, loading }, getPost, match }) => {

    useEffect(() => {
        getPost(match.params.id)
    }, [getPost, match.params.id]);

    return (
        <div className="main-container">
            {post === null || loading ? <Spinner /> :
                <div className="post">
                    <Button variant="contained" color="secondary" component={Link} to="/posts"
                        style={{ borderRadius: 0 }} startIcon={<ArrowBackIcon />}>
                        Back to posts
                    </Button>
                    <PostItem post={post} showAction={false} />

                    <CommentForm post={post} />

                    {post.comments &&
                        <Paper className="comment-section">
                            {post.comments.map(comment =>
                                <Comment postId={post._id} comment={comment} key={comment._id} />)}
                        </Paper>
                    }
                </div>
            }
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post);