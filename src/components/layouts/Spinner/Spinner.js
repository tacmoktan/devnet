import React from 'react';
import loaderGif from './loader.gif';
import { makeStyles } from '@material-ui/core';

const useLoaderStyles = makeStyles(theme => ({
    loaderContainer: {
        padding: 20,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loader: {
        width: 250,
    }
}))

const Spinner = () => {

    const { loaderContainer, loader } = useLoaderStyles();

    return (<div className={loaderContainer}>
        <img src={loaderGif} alt="spinning loader" className={loader} />
    </div>)
}



export default Spinner;