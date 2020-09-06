import React from 'react';
import Moment from 'react-moment';
import WorkSharpIcon from '@material-ui/icons/WorkSharp';
import {useItemstyles} from './eduExpStyles';

const ExperienceItem = ({ company, title, to, from, current }) => {
    const { itemBlock, iconBlock, fontPrimaryStyle, fontSecondaryStyle } = useItemstyles();

    return (
        <div className={itemBlock}>
            <div className={iconBlock}>
                <WorkSharpIcon />
            </div>
            <div className="info-details">
                <div className="info">
                    <span className={fontPrimaryStyle} >{title}</span>  at <span className={fontPrimaryStyle} >{company}</span>
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

export default ExperienceItem;