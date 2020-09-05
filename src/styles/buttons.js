import { makeStyles } from "@material-ui/core";

export const useButtonStyles = makeStyles(theme => ({
    btn: {
        display: 'flex',
        justifyContent: 'space-evenly',
        '& .MuiButton-label': {         //creates space between label and icon
            display: 'grid',
            justifyContent: 'center',
            gridTemplateColumns: 'auto auto',
            columnGap: '10px'
        }
    },
    btnLabel: {
        display: 'block'
    }
}))