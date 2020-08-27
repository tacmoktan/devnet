import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
//redux
import { connect } from 'react-redux';
import { addExperience } from '../../redux/actions/profile';
import { PropTypes } from 'prop-types';

const AddExperience = ({ addExperience, history }) => {
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

        <h1>  Add Experience </h1>
        <i>* = required</i>
        <form className="add-experience-form" onSubmit={handleSubmit}>
            <input type="text" className="input" name="title" placeholder="* Title" value={title} onChange={handleChange} required />
            <input type="text" className="input" name="company" placeholder="* Company" value={company} onChange={handleChange} required />

            <div>* From
               <input type="date" className="input" name="from" value={from} onChange={handleChange} required />
            </div>

            <div> current job
                <input type="checkbox" className="input" name="current" value={current} onChange={onCheckBoxSelection} />
            </div>

            <div>To
                <input type="date" className="input" name="to" placeholder="To" value={to} onChange={handleChange}
                    disabled={checkboxSelected ? 'disabled' : ''} />
            </div>

            <input type="submit" className="input" />
        </form>
    </>)
}


AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(AddExperience));