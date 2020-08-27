import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../redux/actions/post';
import { PropTypes } from 'prop-types';

const PostItem = ({
    post: { _id, name, user, avatar, likes, comments, date, text },
    auth, addLike, removeLike, deletePost,
    showAction }) => {

    return (
        <div className="post">
            <img src={avatar} alt="profile pic" className="profile-pic" />
            <h3>{name}</h3>
            <i>  <Moment fromNow>{date}</Moment> </i>
            <div>{text}</div>

            {showAction &&
                <div className="post-actions">
                    <button onClick={() => addLike(_id)}>Like {likes.length > 0 && likes.length} </button>
                    <button onClick={() => removeLike(_id)}>Unlike</button>
                    <Link className="btn" to={`/post/${_id}`}>Discussion {comments.length > 0 && comments.length}</Link>
                    {
                        auth.user && (auth.user._id === user) && <button onClick={() => deletePost(_id)}>Delete</button>
                    }
                </div>
            }

        </div>
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