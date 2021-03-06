import React from 'react';
import Moment from 'react-moment';
import SchoolIcon from '@material-ui/icons/School';
import { useItemstyles } from './eduExpStyles';

const EducationItem = ({ school, degree, to, from, current }) => {
    const { itemBlock, iconBlock, fontPrimaryStyle, fontSecondaryStyle } = useItemstyles();

    return (
        <div className={itemBlock}>
            <div className={iconBlock}>
                <SchoolIcon />
            </div>
            <div className="info-details" >
                <div className="info">
                    <span className={fontPrimaryStyle} >{degree}</span>  at <span className={fontPrimaryStyle} >{school}</span>
                </div>
                <div className={fontSecondaryStyle}>
                    <Moment date={from} format="MMM Do, YYYY" /> -  {
                        !current ? <Moment date={to} format="MMM Do, YYYY" /> : 'present'
                    }
                </div>
            </div>

        </div>
    )
}

export default EducationItem;