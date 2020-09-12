import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../redux/actions/post';
import { PropTypes } from 'prop-types';
import { makeStyles, Paper, Typography, Button } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';

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
    },
    postActions: {
        display: 'flex',
        '& div,a': {
            border: `1px solid ${theme.palette.divider}`,
            padding: 5
        }
    },
    likeContainer: {
        display: 'flex',
        width: 'fit-content',
        '& svg': {
            cursor: 'pointer'
        }
    },
    discussionBtn: {
        color: theme.palette.text.primary
    }
}))

const PostItem = ({
    isPostLiked,
    post: { _id, name, user, avatar, likes, comments, date, text },
    auth, addLike, removeLike, deletePost,
    showAction }) => {

    const { post, postProfilePic, postContent, postDate, postActions, likeContainer, discussionBtn } = usePostItemStyles();

    //like control
    const [like, setLike] = useState(isPostLiked);
    //changing state before rendering
    useMemo(() => setLike(isPostLiked), [isPostLiked])


    const handleAddLike = () => {
        setLike(true);
        addLike(_id);
    }

    const handleRemoveLike = () => {
        setLike(false);
        removeLike(_id);
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
                    <div className={postActions}>
                        {/* <Button onClick={() => addLike(_id)}>Like {likes.length > 0 && likes.length} </Button>
                        <Button onClick={() => removeLike(_id)}>Unlike</Button> */}

                        <div className={likeContainer}>
                            {like ? <FavoriteIcon color="primary" fontSize="small" onClick={handleRemoveLike} /> :
                                <FavoriteBorderIcon color="primary" fontSize="small" onClick={handleAddLike} />}
                            {likes.length > 0 && likes.length}
                        </div>
                        <Link className={discussionBtn} to={`/post/${_id}`}>Discussion {comments.length > 0 && `(${comments.length})`}</Link>
                        {
                            auth.user && (auth.user._id === user) && <Button onClick={() => deletePost(_id)} endIcon={<DeleteIcon />}>Delete </Button>
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