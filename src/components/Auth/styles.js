import { spacing, typography } from 'material-ui/styles';
import { grey500, white, red500, grey700 } from 'material-ui/styles/colors';

const styles = {
    boxContainer: {
        width: '85%',
        maxWidth: 400,
        minWidth: 250,
        height: 'auto',
        position: 'absolute',
        top: '15%',
        left: 0,
        right: 0,
        margin: 'auto',
    },
    logoImg: {
        marginRight: 10,
        minWidth: 25,
    },
    title: {
        fontSize: 20,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        height: 60,
    },
    paper: {
        padding: 20,
        overflow: 'auto',
    },
    buttonsDiv: {
        textAlign: 'center',
        padding: 10,
    },
    flatButton: {
        color: grey500,
    },
    flatLoginButton: {
        color: white,
    },
    flatLabel: {
        fontWeight: 400,
    },
    checkRemember: {
        style: {
            float: 'left',
            padding: '10px 16px 0px 14px',
        },
        labelStyle: {
            color: grey700,
        },
        iconStyle: {
            color: grey700,
            borderColor: grey700,
            fill: grey700,
        },
    },
    boxBtn: {
        float: 'right',
    },
    btn: {
        background: '#4f81e9',
        color: white,
        padding: 7,
        borderRadius: 2,
        margin: 2,
        fontSize: 13,
    },
    btnFacebook: {
        background: '#4f81e9',
    },
    btnGoogle: {
        background: '#e14441',
    },
    btnSpan: {
        marginLeft: 5,
    },
    buttonsContainer: {
        marginTop: 50,
        textAlign: 'center',
    },
    forgotbuttonsContainer: {
        marginTop: 30,
    },
    registerbuttonsContainer: {
        marginTop: 30,
        float: 'left',
        width: '100%',
    },
    resetpasswordButtonsContainer: {
        marginTop: 20,
        textAlign: 'center',
    },
    errorMessage: {
        color: red500,
    },
    instructions: {
        textAlign: 'center',
        color: grey500,
    },
    logoContainer: {
        textAlign: 'center',
        width: 360,
        height: 80,
        paddingTop: 20,
    },
    logoImage: {
        width: 295,
        height: 54,
    },
    logoSmallContainer: {
        position: 'absolute',
        right: 20,
        top: 20,
    },

};

export default styles;
