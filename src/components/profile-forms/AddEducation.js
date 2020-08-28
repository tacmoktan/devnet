import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
//redux
import { connect } from 'react-redux';
import { getCurrentProfile, addEducation } from '../../redux/actions/profile';
import { PropTypes } from 'prop-types';

const AddEducation = ({ getCurrentProfile, addEducation, history }) => {
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

    return (<>

        <h1>  Add Education </h1>
        <i>* = required</i>
        <form className="add-experience-form" onSubmit={handleSubmit}>
            <input type="text" className="input" name="school" placeholder="* School" value={school} onChange={handleChange} required />
            <input type="text" className="input" name="degree" placeholder="* Degree" value={degree} onChange={handleChange} required />

            <div>* From
               <input type="date" className="input" name="from" value={from} onChange={handleChange} required />
            </div>

            <div> current
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


AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

export default connect(null, { getCurrentProfile, addEducation })(withRouter(AddEducation));