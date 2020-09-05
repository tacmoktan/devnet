import React from 'react';
import Moment from 'react-moment';
import SchoolIcon from '@material-ui/icons/School';
import { makeStyles } from '@material-ui/core';

const useItemstyles = makeStyles(theme => ({
    itemBlock: {
        display: 'grid',
        justifyContent: 'flex-start',
        alignItems:'center',
        gridTemplateColumns: 'auto auto',
        columnGap: '10px'
    },
    iconBlock: {
        borderRadius: '50%',
        border: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.default,
        color: theme.palette.secondary.light,
        height: 65,
        width: 65,
        padding: 6,
        '& svg': {
            fontSize: '3rem'
        }
    }
}))


const EducationItem = ({ school, degree, to, from }) => {
    const { itemBlock, iconBlock } = useItemstyles();

    return (
        <div className={itemBlock}>
            <div className={iconBlock}>
                <SchoolIcon />
            </div>
            <div>
                <div>
                    {degree} at {school}
                </div>
                <Moment date={from} format="YYYY/MM/DD" /> -  <Moment date={to} format="YYYY/MM/DD" />
            </div>

        </div>
    )
}

export default EducationItem;