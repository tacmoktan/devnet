import React from 'react';
import { Typography } from '@material-ui/core';
import EducationItem from './EducationItem';
import { useStyles } from './eduExpStyles';

const ProfileEducation = ({ education }) => {
    const { container, itemContainer } = useStyles();
    return (
        <div className={container}>
            <Typography variant="h4" color="primary">Education</Typography>
            
            <div className={itemContainer}>
                {
                    education.map( (edu, index) => <EducationItem {...edu} key={index} />)
                }
            </div>
        </div>
    )
}

export default ProfileEducation;