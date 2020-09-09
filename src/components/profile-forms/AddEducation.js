import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
//redux
import { connect } from 'react-redux';
import { getCurrentProfile, addEducation } from '../../redux/actions/profile';
import { PropTypes } from 'prop-types';
import { useUpdateFormStyles } from './updateFormStyles';
import { TextField, Checkbox, Button, Typography } from '@material-ui/core';

const AddEducation = ({ getCurrentProfile, addEducation, history }) => {

    const { inputContainer, input } = useUpdateFormStyles();

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        from: '',
        to: '',
        current: false
    })

    const { school, degree, from, to, current } = formData;

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
        addEducation(formData, history);
    }

    return (<div className="main-container">

        <Typography variant="h3">  Add Education </Typography>
        
        <form className="add-experience-form" onSubmit={handleSubmit}>
            <div className={inputContainer}>
                <label>School</label>
                <TextField variant="outlined" type="text" className={input} name="school" value={school} onChange={handleChange} required />
            </div>
            <div className={inputContainer}>
                <label>Degree</label>
                <TextField variant="outlined" type="text" className={input} name="degree" value={degree} onChange={handleChange} required />
            </div>

            <div className={inputContainer}>From
               <TextField variant="outlined" type="date" className={input} name="from" value={from} onChange={handleChange} required />
            </div>

            <div> current
                <Checkbox type="checkbox" className={input} name="current" value={current} onChange={onCheckBoxSelection} />
            </div>

            <div className={inputContainer}>To
                <TextField variant="outlined" type="date" className={input} name="to"  value={to} onChange={handleChange}
                    disabled={checkboxSelected ? 'disabled' : ''} />
            </div>

            <Button variant="outlined" type="submit" className="input">Add</Button>
        </form>
    </div>)
}


AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

export default connect(null, { getCurrentProfile, addEducation })(withRouter(AddEducation));