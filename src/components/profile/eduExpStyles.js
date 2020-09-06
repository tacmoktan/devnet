import { makeStyles } from "@material-ui/core";
import { Gilroy } from '../../fonts/fonts';

export const useStyles = makeStyles(theme => ({
    container: {
        display: 'grid',
        alignContent: 'flex-start',
        alignItems: 'center',
        rowGap: '30px'
    },
    itemContainer: {
        position: 'relative',
        display: 'grid',
        rowGap: '30px',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 28,
            width: 8,
            height: '100%',
            background: theme.palette.secondary.main
        }
    }
}))

export const useItemstyles = makeStyles(theme => ({
    itemBlock: {
        display: 'grid',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gridTemplateColumns: 'auto auto',
        columnGap: '10px',
        position: 'relative'
    },
    iconBlock: {
        borderRadius: '50%',
        border: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.default,
        color: theme.palette.secondary.light,
        height: 65,
        width: 65,
        padding: 10,
        textAlign: 'center',
        '& svg': {
            fontSize: '2.5rem'
        }
    },
    fontPrimaryStyle: {
        fontFamily: Gilroy.fontFamily,
        color: theme.palette.secondary.light
    },
    fontSecondaryStyle: {
        color: theme.palette.text.secondary
    }

}))