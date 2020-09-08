import React from 'react';
import { Typography } from '@material-ui/core';
import {useStyles} from './eduExpStyles';
import ExperienceItem from './ExperienceItem';

const ProfileExperience = ({ experience }) => {
    const { container, itemContainer } = useStyles();
    return (
        <div className={container}>
            <Typography variant="h4" color="primary">Work Experience</Typography>

            <div className={itemContainer}>
                {
                    experience.map( (exp, index) => <ExperienceItem {...exp} key={index} />)
                }
            </div>

        </div>
    )
}

export default ProfileExperience;