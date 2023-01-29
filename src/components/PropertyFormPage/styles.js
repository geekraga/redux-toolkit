import { grey700 } from 'material-ui/styles/colors';

const styles = {

    btnCancel: {
        bottom: '20px',
        paddingLeft: '3%',
        paddingRight: '3%',
        position: 'relative',
        minWidth: '145px',
        top: '10px',
    },
    deleteIconStyle: {
        width: '30px',
        height: '30px',
        lineHeight: '30px',
        fontSize: '18px',
    },
    actionButtonStyle: {
        marginTop: '17px',
    },
    dividerStyle: {
        backgroundColor: '#bdbdbd',
    },
    underlineStyle: {
        border: 0,
    },
    selectStyle: {
        height: '56px',
        fontSize: '15px',
        lineHeight: '18px',
        marginTop: '-10px',
    },
    selectErrorStyle: {
        position: 'absolute',
        bottom: '-26px',
        fontSize: '10px',
        lineHeight: '10px',
    },
    selectedMenuItemStyle: {
        marginTop: 0,
    },
    hintStyle: {
        lineHeight: '18px',
        top: '37px',
    },
    autoCompleteList: {
        maxHeight: 180,
        overflow: 'auto',
    },
    autoCompleteStyle: {
        marginTop: '-8px',
    },
    targetOrigin: {
        horizontal: 'left',
        vertical: 'bottom',
    },
    anchorOrigin: {
        horizontal: 'left',
        vertical: 'top',
    },
    playButton: {
        color: grey700,
        fontSize: '30px',
        position: 'absolute',
        cursor: 'pointer',
        marginLeft: '15px',
    },
    pairCodeInput: {
        width: 100,
        fontSize: 14,
        marginTop: -10,
        marginLeft: 16,
        marginRight: 24,
    },
};

export default styles;
