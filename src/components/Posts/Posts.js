import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//layouts
import Spinner from '../layouts/Spinner/Spinner';
import PostItem from './PostItem';
import PostForm from '../post-forms/PostForm';

import { getPosts } from '../../redux/actions/post'
import { PropTypes } from 'prop-types';


const Posts = ({ getPosts, post: { posts, loading } }) => {

    useEffect(() => {
        getPosts();
    }, [getPosts])

    return (<>
        <PostForm />
        {posts === null || loading ? <Spinner /> :
            <div className="posts">
                {posts.map(post => <PostItem post={post} key={post._id} />)}
            </div>
        }
    </>)
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);