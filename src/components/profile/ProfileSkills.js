import React from 'react';
import { Typography, makeStyles, Chip } from '@material-ui/core';
import { Avenir } from '../../fonts/fonts';

const useSkillsStyles = makeStyles(theme => ({
    skillBlock: {
        display: 'grid',
        alignItems: 'center',
        alignContent:'center',
        background: theme.palette.primary.main,
        color: 'white'
    },
    profileSkill: {
        margin: '3px 5px',
        fontFamily: Avenir.fontFamily,
    }
}))

const ProfileSkills = ({ skills }) => {
    const { skillBlock, profileSkill } = useSkillsStyles();

    return (
        <div className={skillBlock}>
            <Typography variant="h4"> Skills</Typography>
            <div className="profile-skills">
                {skills.map((skill, i) =>
                    <Chip key={'skill_' + i} className={profileSkill} color="secondary" label={skill} />
                )}
            </div>
        </div>
    )
}

export default ProfileSkills;