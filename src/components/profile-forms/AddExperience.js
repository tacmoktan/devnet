import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
//redux
import { connect } from 'react-redux';
import { addExperience } from '../../redux/actions/profile';
import { PropTypes } from 'prop-types';
import { TextField, Checkbox, Button, DialogTitle, Divider, DialogContent } from '@material-ui/core';
import { useUpdateFormStyles } from './updateFormStyles';

const AddExperience = ({ addExperience, history, handleClose }) => {
    const { form, inputContainer, input } = useUpdateFormStyles();

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        from: '',       //Dont put value= null
        to: '',         //Dont put value= null
        current: false
    })


    const { title, company, from, to, current } = formData;

    const [checkboxSelected, setCheckboxSelected] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onCheckBoxSelection = e => {
        setFormData({
            ...formData,
            current: !current,
            to: ''  //resetting property 'to' to initial state
        });
        setCheckboxSelected(!checkboxSelected);
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formData);
        addExperience(formData, history);
    }

    return (<>
        <DialogTitle>Add Experience</DialogTitle>
        <Divider />
        <DialogContent>
            <form className={form} onSubmit={handleSubmit}>
                <div className={inputContainer}>
                    <label>Title</label>
                    <TextField variant="outlined" type="text" className={input} name="title" value={title} onChange={handleChange} required />
                </div>
                <div className={inputContainer}>
                    <label>Company</label>
                    <TextField variant="outlined" type="text" className={input} name="company" value={company} onChange={handleChange} required />
                </div>

                <div className={inputContainer}>From
               <TextField variant="outlined" type="date" className={input} name="from" value={from} onChange={handleChange} required />
                </div>

                <div >
                    current job
                <Checkbox className={input} name="current" value={current} onChange={onCheckBoxSelection} />
                </div>

                <div className={inputContainer}>To
                <TextField variant="outlined" type="date" className={input} name="to" value={to} onChange={handleChange}
                        disabled={checkboxSelected ? true : false} />
                </div>

                <Button color="secondary" variant="contained" type="submit">Add</Button>
                <Button onClick={handleClose} variant="outlined"> Cancel</Button>
            </form>
        </DialogContent>
    </>
    )
}


AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(AddExperience));