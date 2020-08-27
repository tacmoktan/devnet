import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { delComment } from '../../redux/actions/post';

const Comment = ({ comment: { _id, name, avatar, date, text, user },
    postId, auth, delComment }) => {

    return (
        <div className="comment">
            <img src={avatar} alt="profile pic" className="profile-pic" />
            <h4>{name}</h4>
            <Moment fromNow>{date}</Moment>
            <div>{text}</div>
            {!auth.loading && (auth.user._id === user) && <button onClick={() => delComment(postId, _id)}>Delete</button>}
        </div>)
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { delComment })(Comment);