import { grey900, grey700, cyan500 } from 'material-ui/styles/colors';

const styles = {
    customContentStyle: {
        width: '40%',
        maxWidth: 'none',
    },
    confirmButton: {
        marginLeft: 20,
    },
    titleStyle: {
        color: grey900,
    },
    actionsContainerStyle: {
        padding: '0px 20px 25px 20px',
    },
    pairCodeInput: {
        width: '100px',
        fontSize: '14px',
        marginTop: '-10px',
    },
    closeButton: {
        color: grey700,
        fontSize: '32px',
        position: 'absolute',
        top: '18px',
        right: '28px',
        cursor: 'pointer',
    },
    cancelButton: {
        color: cyan500,
        fontSize: '30px',
        cursor: 'pointer',
        top: '5px',
    },
};

export default styles;
