import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { delExperience } from '../../redux/actions/profile';
import { PropTypes } from 'prop-types';

const Experience = ({ experience, delExperience }) => {

    const experiences = experience.map(exp => (
        <tr className="experience" key={exp._id}>
            <td>
                {exp.title}
            </td>
            <td>
                {exp.company}
            </td>

            <td>
                <Moment date={exp.from} format="YYYY/MM/DD" />
                {' - '}
                {!exp.current ?
                    <Moment date={exp.to} format="YYYY/MM/DD" /> : 'present'}
            </td>
            <td>
                <button onClick={() => delExperience(exp._id)}>Delete</button>
            </td>
        </tr>
    ));

    return (<section className="section-experiences">
        <h1>Experience</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Years</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {experiences}
            </tbody>
        </table>
    </section>)
}

Experience.propTypes = {
    delExperience: PropTypes.func.isRequired,
    experience: PropTypes.array.isRequired
}

export default connect(null, { delExperience })(Experience);