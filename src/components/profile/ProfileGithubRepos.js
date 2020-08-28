import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../redux/actions/profile';
import Spinner from '../layouts/Spinner/Spinner';

const ProfileGithubRepos = ({ githubUsername, getGithubRepos, repos }) => {

    useEffect(() => {
        getGithubRepos(githubUsername)
        console.log(repos)
    }, [getGithubRepos, githubUsername])

    return (
        <div className="profile-github">
            <h1>Github Projects</h1>

            {repos.length === 0 ? <Spinner /> :
                <div className="github-repos__group">
                    {repos.map(repo => (

                        <a key={repo.id} href={repo.html_url} className="github-repo" target="_blank" rel="noopener noreferrer">
                            <b>{repo.name}</b>
                            <p>{repo.description}</p>
                        </a>
                    ))}
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    repos: state.profile.repos
})

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithubRepos);