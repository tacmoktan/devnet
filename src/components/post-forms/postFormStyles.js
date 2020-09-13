import { makeStyles } from "@material-ui/core";

export const usePostFormStyles = makeStyles(theme => ({
    postForm: {
        rowGap: '5px',
    },
    postTextField: {
        '& .MuiOutlinedInput-root': {
            maxWidth: '100%',
            borderRadius: 0,
        }
    },
    postBtn: {
        borderRadius: 0,
        maxWidth: '100%'
    },
    commentForm: {
        background: theme.palette.divider,
        display: 'grid',
        padding: 20,
        rowGap: '20px',
    },
    commentTextField: {
        '& .MuiOutlinedInput-root': {
            background: theme.palette.background.paper,
            maxWidth: '100%'
        }
    }
}))