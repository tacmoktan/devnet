import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../redux/actions/post';
import { PropTypes } from 'prop-types';
import { makeStyles, Paper, Typography, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const usePostItemStyles = makeStyles(theme => ({
    post: {
        display: 'grid',
        gridTemplateColumns: '10% 90%',
        padding: 20,
        rowGap: '20px',
        columnGap: '20px',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'auto'
        }
    },

    postProfilePic: {
        width: 90,
        height: 90,
        borderRadius: '50%'
    },
    postContent: {
        display: 'grid',
        rowGap: '15px'
    },
    postDate: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.text.secondary,
        columnGap: '10px',
        fontSize: '0.8rem',
        '& .MuiSvgIcon-root': {
            fontSize: '0.8rem'
        }
    }
}))

const PostItem = ({
    post: { _id, name, user, avatar, likes, comments, date, text },
    auth, addLike, removeLike, deletePost,
    showAction }) => {

    const { post, postProfilePic, postContent, postDate } = usePostItemStyles();
    //array of liked userIds
    const likedUserIds = likes.map(like => like.user);

    //like control
    const [like, setLike] = useState(false);
    let alreadyLiked = false;

    if (auth.user && (likedUserIds.includes(auth.user._id))) {
        alreadyLiked = true
        console.log(likedUserIds, auth.user._id)
    }


    const handleChange = () => {
        setLike(!like);

        console.log('like fn', like)

        if (like) {
            addLike(_id)
            console.log('add')
        }
        else {
            removeLike(_id)
            console.log('remove')
        }
        alreadyLiked = like;
        console.log('already liked', alreadyLiked)
    }


    return (
        <Paper className={post}>

            <img src={avatar} alt="profile pic" className={postProfilePic} />

            <div className={postContent}>
                <div>
                    <Typography color="secondary">{name}</Typography>
                    <p className={postDate}>  <Moment fromNow>{date}</Moment> <AccessTimeIcon /> </p>
                </div>

                <div>{text}</div>

                {showAction &&
                    <div className="post-actions">
                        <Button onClick={() => addLike(_id)}>Like {likes.length > 0 && likes.length} </Button>
                        <Button onClick={() => removeLike(_id)}>Unlike</Button>
                        <FormControlLabel
                            control={
                                <Checkbox icon={alreadyLiked ?
                                    <FavoriteIcon color="primary" fontSize="small" /> :
                                    <FavoriteBorderIcon color="primary" fontSize="small" />}
                                    checkedIcon={<FavoriteBorderIcon color="primary" fontSize="small" />}
                                    onChange={handleChange} />}
                            title='like'
                        />
                        <Link className="btn" to={`/post/${_id}`}>Discussion {comments.length > 0 && comments.length}</Link>
                        {
                            auth.user && (auth.user._id === user) && <button onClick={() => deletePost(_id)}>Delete</button>
                        }
                    </div>
                }
            </div>

        </Paper>
    )
}

PostItem.defaultProps = {
    showAction: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);