import React from 'react';
import { Link } from 'react-router-dom';
import { useButtonStyles } from '../../styles/buttons'
import { Button, makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useActionStyles = makeStyles(theme => ({
    profileActionsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        rowGap: '20px'
    }
}))
const DashboardActions = () => {
    const { profileActionsContainer } = useActionStyles();
    const { btn, btnLabel, editBtn, dashboardBtn } = useButtonStyles();
    return (<>
        <div className={profileActionsContainer}>
            <Button component={Link} to="/edit-profile" className={`${btn} ${editBtn} ${dashboardBtn}`} >
                <span className={btnLabel}>Edit Profile</span>
                <EditIcon />
            </Button>
            <Button component={Link} to="/profile/add-experience" className={`${btn} ${editBtn} ${dashboardBtn}`}>
                <span className={btnLabel}>Add Experience</span>
                <AddCircleIcon />
            </Button>
            <Button component={Link} to="/profile/add-education" className={`${btn} ${editBtn} ${dashboardBtn}`}>
                <span className={btnLabel}>Add Education</span>
                <AddCircleIcon />
            </Button>
        </div>
    </>)
}

export default DashboardActions;