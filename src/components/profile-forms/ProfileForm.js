import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../redux/actions/profile';
import { PropTypes } from 'prop-types';

const ProfileForm = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {

    const initialState = {
        bio: '',
        address: '',
        company: '',
        website: '',
        github: '',         //github username
        status: '',
        skills: '',
        facebook: '',
        linkedin: '',
        youtube: ''
    }

    const [formData, setFormData] = useState(initialState)

    const { bio, address, company, website, github, status, skills, facebook, linkedin, youtube } = formData;

    useEffect(() => {
        if (!profile)
            getCurrentProfile();

        //to update profile if user has a profile
        if (!loading && profile) {

            const profileData = { ...initialState };
            for (const key in profile) {
                if (key in profileData)
                    profileData[key] = profile[key]

            }

            for (const key in profile.social) {
                if (key in profileData)
                    profileData[key] = profile.social[key]
            }

            if (Array.isArray(profile.skills))
                profileData.skills = profile.skills.join(', ');

            setFormData(profileData);
        }


    }, [getCurrentProfile, profile, loading]);


    const [showSocialLinks, setShowSocialLinks] = useState(false);

    const handleChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formData);
        createProfile(formData, history, profile ? true : false);
    }

    const handleShowSocialLinks = e => setShowSocialLinks(!showSocialLinks);

    const statusOptions = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile App Developer', 'Networking Administrator',
        'Database Administrator', 'QA Officer', 'SEO Engineer']

    return <>
        < i >* = required</i >
        <form onSubmit={handleSubmit}>
            <input type="text" className="input" name="bio" placeholder="Bio" value={bio} onChange={handleChange} />
            <input type="text" className="input" name="address" placeholder="Address" value={address} onChange={handleChange} />
            <input type="text" className="input" name="company" placeholder="Company" value={company} onChange={handleChange} />
            <input type="text" className="input" name="website" placeholder="Website URL" value={website} onChange={handleChange} />
            <input type="text" className="input" name="github" placeholder="Github Username" value={github} onChange={handleChange} />

            <select className="input" defaultValue={status} name="status" onChange={handleChange} required>
                <option className="option" value="" disabled >* Status</option>

                {statusOptions.map((statusOption, i) =>
                    <option key={`statusOption_` + i} className="option" value={statusOption}>{statusOption}</option>)
                }
            </select>

            <div className="skills">
                <h5>Enter skills separated by commas <i>(e.g. HTML, CSS)</i></h5>
                <input type="text" className="input" name="skills" placeholder="* Skills" value={skills} onChange={handleChange} required />
            </div>

            <div onClick={handleShowSocialLinks} className="social-link-toggle btn">Add Social Links</div> (optional)
            {showSocialLinks &&
                (< div className="social-media">
                    <input type="text" className="input" name="facebook" placeholder="facebook URL" value={facebook} onChange={handleChange} />
                    <input type="text" className="input" name="linkedin" placeholder="linkedin URL" value={linkedin} onChange={handleChange} />
                    <input type="text" className="input" name="youtube" placeholder="youtube URL" value={youtube} onChange={handleChange} />
                </div>)
            }

            <input type="submit" className="input" />
            <Link to="/dashboard" className="btn">
                Go Back
            </Link>

        </form>
    </>
}

ProfileForm.propTypes = {
    profile: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(ProfileForm));