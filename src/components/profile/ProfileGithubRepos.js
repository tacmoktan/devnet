import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../redux/actions/profile';
import Spinner from '../layouts/Spinner/Spinner';
import { PropTypes } from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const useGithubStyles = makeStyles(theme => ({
    profileGithub: {
        display: 'grid',
        rowGap: '30px'
    },
    repoGroup: {
        display: 'grid',
        rowGap: '20px'
    },
    githubRepo: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
        border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
        [theme.breakpoints.down(600)]:{
            flexDirection: 'column',
            rowGap: '10px',
        },
        '&:hover':{
            borderColor: theme.palette.text.secondary
        }
    },
    repoName: {
        color: theme.palette.secondary.light,
        fontWeight: 'bold',
        fontSize:'1.1rem'
    },
    repoDescription: {
        color: theme.palette.text.secondary
    },
    ratings: {
        color: "white",
        textAlign: 'center',
        '& > div': {
            width: 100,
            border: `1px solid ${theme.palette.divider}`,
            padding: 2,
        }

    },
    stars: {
        background: theme.palette.secondary.light
    },
    watchers: {
        background: "black"
    },
    forks: {
        color: theme.palette.text.primary
    }
}))

const ProfileGithubRepos = ({ githubUsername, getGithubRepos, repos }) => {

    const { profileGithub, repoGroup, githubRepo, repoName, repoDescription, ratings, stars, watchers, forks } = useGithubStyles();

    useEffect(() => {
        getGithubRepos(githubUsername)
    }, [getGithubRepos, githubUsername])

    return (
        <div className={profileGithub}>
            <Typography variant="h4" color="primary">Github Projects <GitHubIcon /></Typography>

            {repos.length === 0 ? <Spinner /> :
                <div className={repoGroup}>
                    {repos.map(repo => (

                        <a key={repo.id} href={repo.html_url} className={githubRepo} target="_blank" rel="noopener noreferrer">
                            <div >
                                <b className={repoName}>{repo.name}</b>
                                <p className={repoDescription}>{repo.description}</p>
                            </div>

                            <div className={ratings}>
                                <div className={stars}> Stars: {repo.stargazers_count}</div>
                                <div className={watchers}> Watchers: {repo.watchers_count}</div>
                                <div className={forks}> Forks: {repo.forks_count}</div>
                            </div>
                        </a>
                    ))}
                </div>
            }
        </div>
    )
}

ProfileGithubRepos.propTypes = {
    repos: PropTypes.array.isRequired,
    getGithubRepos: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    repos: state.profile.repos
})

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithubRepos);