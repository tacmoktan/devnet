import { makeStyles } from "@material-ui/core";

export const useUpdateFormStyles = makeStyles(theme => ({
    inputContainer: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    },
    input: {
        '& .MuiOutlinedInput-root': {
            maxWidth: 600,
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