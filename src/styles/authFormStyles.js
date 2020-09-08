import { makeStyles } from '@material-ui/core/styles';

export const useAuthFormStyles = makeStyles(theme => ({
    formAndImageContainer: {
        width: '100%',
    },
    formContainer: {
        display: 'grid',
        alignContent: 'center',
        alignItems: 'center',
        rowGap: '20px',
        padding: 60,
        minWidth: 500,
        '& > div': {
            fontSize: '1.2em'
        },
        [theme.breakpoints.down(600)]: {
            padding: 20,
            minWidth: 280,
        }
    },
    formImage: {
        backgroundImage: 'url(https://images.pexels.com/photos/691710/pexels-photo-691710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)',
        backgroundSize: 'cover',
        minHeight: '150px',
        minWidth: 280
        /* backgroundColor: '#3d6b847a', */
    },
    externalLink: {
        display: 'inline-block',
        margin: '0 10px',
        width: 'fit-content',
        '& p': {
            fontWeight: 'bold',
            fontSize: '1.2em'
        },
        '&:hover': {
            '& p': {
                color: theme.palette.secondary.light
            }
        }
    }
}))