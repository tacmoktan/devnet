import React from 'react';

const ProfileTop = ({ user, bio, address, status, company, website, social }) => {
    return (
        <div className="profile-top">
            <img src={user.avatar} alt="profile pic" className="profile-pic" />
            <h1>{user.name}</h1>
            {bio &&
                <>
                    <h3>Bio</h3>
                    <p>{bio}</p>
                </>
            }

            {address &&
                <>
                    <b>Address</b>
                    <p>{address}</p>
                </>
            }

            <div>{status} at {company}</div>

            {website &&
                <div>
                    <h3>Website</h3>
                    <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
                </div>
            }

            {social &&
                <div>
                    <h3>Socials</h3>
                    <span className="social-link">{social.facebook && <a href={social.facebook} target="_blank" rel="noopener noreferrer"> fb </a>}</span>
                    <span className="social-link">{social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer"> li </a>}</span>
                    <span className="social-link">{social.youtube && <a href={social.youtube} target="_blank" rel="noopener noreferrer"> yt </a>}</span>
                </div>
            }

        </div>
    )
}

export default ProfileTop;