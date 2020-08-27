import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (<>
        <div className="profile-update-container">
            <Link to="/edit-profile" className="profile-update" >Edit Profile</Link>
            <Link to="/profile/add-experience" className="profile-update">Add Experience</Link>
            <Link to="/profile/add-education" className="profile-update">Add Education</Link>
        </div>
    </>)
}

export default DashboardActions;