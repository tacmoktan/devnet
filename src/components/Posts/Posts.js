import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//layouts
import Spinner from '../layouts/Spinner/Spinner';
import PostItem from './PostItem';
import PostForm from '../post-forms/PostForm';

import { getPosts } from '../../redux/actions/post'
import { PropTypes } from 'prop-types';
import { Typography } from '@material-ui/core';
import useHeroStyles from '../../styles/heroImageStyles';


const Posts = ({ getPosts, post: { posts, loading }, auth }) => {

    const { heroImageTitle } = useHeroStyles();

    useEffect(() => {
        getPosts();
    }, [getPosts])

    return (
        <>  
        <div className={heroImageTitle}>
            <Typography variant="h1" color="secondary" > Discussion </Typography>
            <Typography variant="h1" color="primary" > Forum </Typography>
        </div>
            <div className="main-container">
                <PostForm />
                {posts === null || loading ? <Spinner /> :
                    <div className="posts" style={{ display: 'grid', rowGap: '20px', margin: '20px 0' }}>
                        {posts.map((post, i) => {
                            //to check if current user has already liked the post or not
                            const likedUserIds = post.likes.map(like => like.user);
                            let isPostLiked = auth.user && (likedUserIds.includes(auth.user._id)) ? true : false;

                            return <PostItem post={post} key={post._id} isPostLiked={isPostLiked} />
                        })}
                    </div>
                }
            </div>
        </>)
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
})

export default connect(mapStateToProps, { getPosts })(Posts);