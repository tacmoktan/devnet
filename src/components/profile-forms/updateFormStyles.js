import { makeStyles } from "@material-ui/core";

export const useUpdateFormStyles = makeStyles(theme => ({
    form: {
        padding:'30px 10px'
    },
    inputContainer: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns:'minmax(250px, 25%) minmax(250px, 75%)',
        [theme.breakpoints.down('sm')]:{
            gridTemplateColumns:'auto'
        }
    },
    input: {
        '& .MuiOutlinedInput-root': {
            maxWidth: '100%',
            borderRadius: 5,
            width: '100%'
        },
    },
    socialLinkContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        rowGap: '20px',
        '& label': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        }
    }

}))