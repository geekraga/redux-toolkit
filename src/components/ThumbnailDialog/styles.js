import { grey700, white } from 'material-ui/styles/colors';

const styles = {
    customContentStyle: {
        width: '80%',
        minWidth: '300px',
    },
    bodyStyle: {
        minHeight: '200px',
        width: '100%',
        position: 'relative',
        border: 0,
    },
    actionsContainerStyle: {
        padding: '16px 32px  16px  0px',
    },
    submitStyle: {
        marginLeft: '16px',
    },
    imageSize: {
        height: '100px',
        width: '100px',
        minHeight: '250px',
        margin: '0 auto',
    },
    deleteIcon: {
        color: grey700,
        fontSize: '50px',
        position: 'absolute',
        top: 'calc(50% - 25px)',
        left: 'calc(50% - 25px)',
        textShadow: '0 1px 5px #000000',
    },
    thumbnailToggle: {
        width: '150px',
        marginTop: '8px',
        left: '18px',
    },
    thumbnailToggleLabel: {
        color: white,
    },
};

export default styles;
