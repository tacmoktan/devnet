import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = ({ profileItem: { user, company, skills, status } }) => {

    return (
        <div className="profile-card">
            <img src={user.avatar} alt="user avatar" className="profile-pic" />
            <div className="profile-info">
                <h1 className="profile-name">{user.name}</h1>
                <div>
                    <span className="profile-status">{status}</span> at <span className="profile-company">{company}</span>
                </div>
                <ul className="profile-skills">
                    <h4>SKills</h4>
                    {skills.map((skill, i) => <li key={'skill_' + i}>{skill}</li>)}
                </ul>

                <Link to={`/developers/${user._id}`} >View Profile</Link>
            </div>
        </div>
    )
}


export default ProfileCard;