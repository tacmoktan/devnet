import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../redux/actions/profile';
import { PropTypes } from 'prop-types';
import { TextField, Button, Select, MenuItem, Typography, Paper, Switch } from '@material-ui/core';
import { useUpdateFormStyles } from './updateFormStyles';

const ProfileForm = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {

    const { inputContainer, input, socialLinkContainer } = useUpdateFormStyles();

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

    return <div className="main-container">
        <Typography variant="h6"> * = required</ Typography >
        <Paper style={{ padding: 40 }}>
            <form onSubmit={handleSubmit}>
                <div className={inputContainer}>
                    <label>bio</label>
                    <TextField multiline rowsMax={6} variant="outlined" type="text" className={input}
                        name="bio" value={bio} onChange={handleChange} />
                </div>
                <div className={inputContainer}>
                    <label>address</label>
                    <TextField variant="outlined" type="text" className={input} name="address" value={address} onChange={handleChange} />
                </div>

                <div className={inputContainer}>
                    <label>company</label>
                    <TextField variant="outlined" type="text" className={input} name="company" value={company} onChange={handleChange} />
                </div>
                <div className={inputContainer}>
                    <label>website</label>
                    <TextField variant="outlined" type="text" className={input} name="website" value={website} onChange={handleChange} />
                </div>
                <div className={inputContainer}>
                    <label>github Username</label>
                    <TextField variant="outlined" type="text" className={input} name="github" value={github} onChange={handleChange} />
                </div>

                <div className={inputContainer}>
                    <label>status*</label>
                    <div className={input} >

                        <Select variant="outlined" value={status} name="status" onChange={handleChange} required>
                            {statusOptions.map((statusOption, i) =>
                                <MenuItem key={`statusOption_` + i} className="option" value={statusOption}>{statusOption}</MenuItem>)
                            }
                        </Select>
                    </div>
                </div>

                <div className={inputContainer}>
                    <label>Enter skills separated by commas* <i>(e.g. HTML, CSS)</i></label>
                    <TextField variant="outlined" type="text" className={input} name="skills" placeholder="* Skills" value={skills} onChange={handleChange} required />
                </div>

                <div>
                    <p>Add social links (optional)</p>
                    <Switch
                        checked={showSocialLinks}
                        onChange={handleShowSocialLinks}
                        name="socialLinksSwitch"
                        color="primary"
                    />

                    {showSocialLinks &&
                        (< div className={socialLinkContainer}>
                            <label>facebook
                        <TextField variant="outlined" type="text" className={input} name="facebook" value={facebook} onChange={handleChange} />
                            </label>
                            <label>linkedin
                        <TextField variant="outlined" type="text" className={input} name="linkedin" value={linkedin} onChange={handleChange} />
                            </label>
                            <label>youtube
                        <TextField variant="outlined" type="text" className={input} name="youtube" value={youtube} onChange={handleChange} />
                            </label>
                        </div>)
                    }
                </div>
                <Button color="primary" variant="outlined" type="submit" className="btn">Submit</Button>
                <Button variant="outlined" component={Link} to="/dashboard" className="btn">
                    Go Back
            </Button>

            </form>
        </Paper>
    </div >
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