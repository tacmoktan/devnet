import React, { useState } from 'react';
import { useButtonStyles } from '../../styles/buttons'
import { Button, makeStyles, Dialog } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ProfileForm from '../profile-forms/ProfileForm';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';

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

    //dialog controls
    const [open, setOpen] = useState(false);
    //form specifier
    const [selectedForm, setSelectedForm] = useState('');

    const handleClickOpen = formType => {
        setOpen(true);
        setSelectedForm(formType);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (<>
        <div className={profileActionsContainer}>
            <Button onClick={() => handleClickOpen('editProfile')} name="editProfile" className={`${btn} ${editBtn} ${dashboardBtn}`} >
                <span className={btnLabel}>Edit Profile</span>
                <EditIcon />
            </Button>
            <Button onClick={() => handleClickOpen('addExperience')} name="addExperience" className={`${btn} ${editBtn} ${dashboardBtn}`}>
                <span className={btnLabel}>Add Experience</span>
                <AddCircleIcon />
            </Button>
            <Button onClick={() => handleClickOpen('addEducation')} name="addEducation" className={`${btn} ${editBtn} ${dashboardBtn}`}>
                <span className={btnLabel}>Add Education</span>
                <AddCircleIcon />
            </Button>
        </div>

        <Dialog maxWidth="md" fullWidth={true} onClose={handleClose} open={open}>
            {selectedForm === "editProfile" && <ProfileForm handleClose={handleClose} />}
            {selectedForm === "addExperience" && <AddExperience handleClose={handleClose}/>}
            {selectedForm === "addEducation" && <AddEducation handleClose={handleClose}/>}
        </Dialog>
    </>)
}

export default DashboardActions;