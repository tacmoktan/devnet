import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import EducationItem from './EducationItem';

const useStyles = makeStyles(theme => ({
    container: {
        display:'grid',
        alignContent:'center',
        alignItems:'center',
        rowGap:'20px'
    }
}))

const ProfileEducation = ({ education }) => {
    const { container } = useStyles();
    return (
        <div className={container}>
            <Typography variant="h4" color="primary">Education</Typography>
            {
                education.map(edu => <EducationItem {...edu} />)
            }
        </div>
    )
}

export default ProfileEducation;