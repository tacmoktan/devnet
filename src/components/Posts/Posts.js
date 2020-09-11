import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//layouts
import Spinner from '../layouts/Spinner/Spinner';
import PostItem from './PostItem';
import PostForm from '../post-forms/PostForm';

import { getPosts } from '../../redux/actions/post'
import { PropTypes } from 'prop-types';
import { Divider } from '@material-ui/core';



const Posts = ({ getPosts, post: { posts, loading } }) => {

    useEffect(() => {
        getPosts();
    }, [getPosts])

    return (<div className="main-container">
        <PostForm />
        {posts === null || loading ? <Spinner /> :
            <div className="posts" style={{ display: 'grid', rowGap: '20px', margin:'20px 0' }}>
                {posts.map(post => <PostItem post={post} key={post._id} />)}
            </div>
        }
    </div>)
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);