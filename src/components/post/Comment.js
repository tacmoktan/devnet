import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { delComment } from '../../redux/actions/post';
import { PropTypes } from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DeleteIcon from '@material-ui/icons/Delete';

const useCommentStyles = makeStyles(theme => ({
    commentItem: {
        display: 'flex',
        padding: 20,
        columnGap: '20px',
        border: `1px solid ${theme.palette.divider}`
    },
    commentProPic: {
        width: 60,
        height: 60,
        borderRadius: '50%',
        [theme.breakpoints.down('xs')]: {
            width: 30,
            height: 30
        }
    },
    commentContainer: {
        width: '100%',
        display: 'grid',
        rowGap: '5px'
    },
    nameDate: {
        display: 'flex',
        columnGap: '10px',
        alignItems: 'center',
        rowGap: '5px',
        [theme.breakpoints.down('xs')]: {
            display: 'grid'
        }
    },
    dateContainer: {
        display: 'flex',
        alignItems: 'center',
        columnGap: '10px',
        color: theme.palette.text.secondary,
        fontSize: '0.8rem',
        '& .clock': {
            fontSize: '0.8rem',
            opacity: 0.5
        }
    },
    deleteComment: {
        width: 'fit-content',
        cursor: 'pointer',
        padding: 0,
        minWidth: 40,
        marginLeft: 'auto'
    }
}))

const Comment = ({ comment: { _id, name, avatar, date, text, user },
    postId, auth, delComment }) => {

    const { commentItem, commentProPic, commentContainer, nameDate, dateContainer, deleteComment } = useCommentStyles();

    return (
        <div className={commentItem}>
            <img src={avatar} alt="profile pic" className={commentProPic} />
            <div className={commentContainer}>
                <div className={nameDate}>
                    <h4>{name}</h4>

                    <div className={dateContainer}>
                        · <Moment fromNow>{date}</Moment> <AccessTimeIcon className="clock" fontSize="small" />
                    </div>

                    {!auth.loading && (auth.user._id === user) &&
                        <Button variant="outlined" title="delete comment" className={deleteComment}
                            onClick={() => delComment(postId, _id)}>
                            <DeleteIcon fontSize="small" color="error" />
                        </Button>}

                </div>


                <p>{text}</p>
            </div >
        </div >)
}

Comment.propTypes = {
    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    delComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { delComment })(Comment);