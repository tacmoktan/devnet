import { makeStyles } from "@material-ui/core";

export const useButtonStyles = makeStyles(theme => ({
    btn: {

    },
    editBtn: {
        background: theme.palette.info.main,
        color: 'white',
        '&:hover': {
            background: theme.palette.info.dark,
        }
    },
    dashboardBtn: {
        borderRadius: 5
    },
    delBtn: {
        background: theme.palette.error.main,
        color: 'white',
        '&:hover': {
            background: theme.palette.error.dark,
        }
    }
}))