const { makeStyles } = require("@material-ui/core");

const useHeroStyles = makeStyles(theme => ({
    heroImageTitle: {
        //backgroundImage: 'url(https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        padding: '60px 0px',
        textAlign: 'center',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'screen',
        backgroundColor: theme.palette.secondary.light
    },
}))

export default useHeroStyles;