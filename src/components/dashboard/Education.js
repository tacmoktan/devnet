import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { delEducation } from '../../redux/actions/profile';
import { PropTypes } from 'prop-types';

const Education = ({ education, delEducation }) => {
    
    const educations = education.map(edu => (
        <tr className="education" key={edu._id}>
            <td>
                {edu.school}
            </td>
            <td>
                {edu.degree}
            </td>

            <td>
                <Moment date={edu.from} format="YYYY/MM/DD" />
                   {' - '}
                {!edu.current ?
                    <Moment date={edu.to} format="YYYY/MM/DD" /> : 'current'}
            </td>
            <td>
                <button onClick={e => delEducation(edu._id)}>Delete</button>
            </td>
        </tr>
    ))

    return (<section className="section-educations">
        <h1>Education</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>School</th>
                    <th>Degree</th>
                    <th>Years</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {educations}
            </tbody>
        </table>
    </section>)
}


Education.propTypes = {
    delEducation: PropTypes.func.isRequired
}



export default connect(null, { delEducation })(Education);