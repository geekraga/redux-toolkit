import { grey700, grey600, white } from 'material-ui/styles/colors';

const styles = {
    videoButtons: {
        color: grey600,
        fontSize: '22px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    playButton: {
        color: grey700,
        fontSize: '50px',
        position: 'absolute',
        top: 'calc(50% - 25px)',
        left: 'calc(50% - 25px)',
    },
    actionButtonSingleStyle: {
        fontSize: '12px',
    },
    actionButtonStyle: {
        display: 'block',
        textAlign: 'center',
        paddingLeft: '4px',
        fontSize: '12px',
    },
    actionButtonContainer: {
        width: '100%',
    },
    menuListStyle: {
        pading: '4px 0',
    },
    menuItemStyle: {
        fontSize: '12px',
        minHeight: '40px',
        lineHeight: '40px',
    },
    deleteButton: {
        color: white,
        fontSize: '36px',
        position: 'absolute',
        top: 8,
        left: 8,
        zIndex: 10,
        cursor: 'pointer',
        textShadow: '0 1px 5px #000000',
    },
    closeButton: {
        color: grey700,
        fontSize: '32px',
        position: 'absolute',
        top: '18px',
        right: '28px',
        cursor: 'pointer',
    },
};

export default styles;
