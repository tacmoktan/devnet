import { makeStyles } from "@material-ui/core";

export const useButtonStyles = makeStyles(theme => ({
    btn: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    btnLabel: {
        display: 'block'
    }
}))