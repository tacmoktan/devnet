import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { useButtonStyles } from '../../styles/buttons';

const useProfileInfosStyles = makeStyles(theme => ({
    bioWebsite: {
        display: 'grid',
        alignItems: 'center',
        alignContent: 'center',
        rowGap: '20px'
    },
    bioBlock: {
        position: 'relative',
    },
    quote: {
        position: 'absolute',
        fontSize: '4em',
        top: '-30px',
        left: '-40px',
        opacity: 0.2,
        color: theme.palette.secondary.light,
        [theme.breakpoints.down("md")]: {
            fontSize: '3em',
            top: '-20px',
            left: '-25px',
        },
    },
    bioLabel: {
        display: 'inline-block',
        color: theme.palette.primary.main
    }
}));

const ProfileInfos = ({ bio, website, social }) => {
    const { bioWebsite, bioBlock, quote, bioLabel } = useProfileInfosStyles();
    const { btn, btnLabel } = useButtonStyles();

    return (
        <div className={bioWebsite}>
            {bio &&
                <div className={bioBlock}>
                    <FormatQuoteIcon color="secondary" className={quote} />
                    <Typography variant="h4" className={bioLabel}>Bio</Typography>
                    <Typography variant="subtitle1">{bio}</Typography>
                </div>
            }
            {
                website &&
                <a href={website} target="_blank" rel="noopener noreferrer">
                    <Button variant="outlined" color="primary" className={btn}  >
                        <span className={btnLabel} style={{ textTransform: 'capitalize', fontFamily: 'avenir' }}>View Website</span>
                        <OpenInNewIcon />
                    </Button>
                </a>
            }



        </div >
    )
}

export default ProfileInfos;