import React from 'react';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import { Typography } from '@material-ui/core';

const ProfileExperience = ({ experience }) => {
    return (
        <div className="profile-experience">
            <Typography variant="h4" color="primary">Experience</Typography>

            <WorkOutlineIcon />

        </div>
    )
}

export default ProfileExperience;