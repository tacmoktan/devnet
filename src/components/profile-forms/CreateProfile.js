import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../redux/actions/profile';

const CreateProfile = ({ profile: { profile, loading }, createProfile, history }) => {

    const [formData, setFormData] = useState({
        bio:'',
        address:'',
        company: '',
        website: '',
        github: '',
        status: '',
        skills: '',
        facebook: '',
        linkedin: '',
        youtube: ''
    })

    const [showSocialLinks, setShowSocialLinks] = useState(false);

    const handleChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formData);
        createProfile(formData, history);
    }


    const handleShowSocialLinks = e => setShowSocialLinks(!showSocialLinks);

    const statusOptions = ['Frontend Development', 'Backend Development', 'Full Stack Development', 'Mobile Development', 'Networking',
        'Database Administrator', 'QA Officer', 'SEO']

    return <>
        < i >* = required</i >
        <form onSubmit={handleSubmit}>
            <input type="text" className="input" name="bio" placeholder="bio" onChange={handleChange} />
            <input type="text" className="input" name="address" placeholder="address" onChange={handleChange} />
            <input type="text" className="input" name="company" placeholder="Company" onChange={handleChange} />
            <input type="text" className="input" name="website" placeholder="Website URL" onChange={handleChange} />
            <input type="text" className="input" name="github" placeholder="Github Username" onChange={handleChange} />

            <select className="input" defaultValue="" name="status" onChange={handleChange} required>
                <option className="option" value="" disabled >* Status</option>

                {statusOptions.map((status, i) =>
                    <option key={`status_` + i} className="option" value={status}>{status}</option>)
                }
            </select>

            <div className="skills">
                <h5>Enter skills separated by commas <i>(e.g. HTML, CSS)</i></h5>
                <input type="text" className="input" name="skills" placeholder="* Skills" onChange={handleChange} required />
            </div>

            <div onClick={handleShowSocialLinks} className="social-link-toggle">Add Social Links</div> (optional)
            {showSocialLinks &&
                (< div className="social-media">
                    <input type="text" className="input" name="facebook" placeholder="facebook URL" onChange={handleChange} />
                    <input type="text" className="input" name="linkedin" placeholder="linkedin URL" onChange={handleChange} />
                    <input type="text" className="input" name="youtube" placeholder="youtube URL" onChange={handleChange} />
                </div>)
            }

            <input type="submit" className="input" />

        </form>
    </>
}


const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));