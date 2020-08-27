import React from 'react';

const ProfileSkills = ({ skills }) => {

    return (
        <div className="profile-skills">
            <h3>Skills</h3>
            <ul className="profile-skills">
                {skills.map((skill, index) => <li key={index}>{skill}</li>)}
            </ul>
        </div>
    )
}

export default ProfileSkills;