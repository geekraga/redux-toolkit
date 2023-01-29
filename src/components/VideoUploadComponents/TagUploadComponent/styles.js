import { green500, cyan500 } from 'material-ui/styles/colors';

const styles = {
    autoCompleteList: {
        maxHeight: 180,
        overflow: 'auto',
    },
    progressBar: {
        height: 30,
        position: 'absolute',
        top: '44%',
        left: '15%',
        width: '70%',
    },
    clearDateButton: {
        position: 'absolute',
        bottom: '14px',
        right: '-30px',
        cursor: 'pointer',
        color: cyan500,
    },
    progressBarColor: green500,
    deleteIconStyle: {
        width: '25px',
        height: '25px',
        lineHeight: '25px',
        fontSize: '16px',
    },
    chipStyle: {
        padding: '8px 10px 0 10px',
    },
    dividerStyle: {
        backgroundColor: '#bdbdbd',
    },
    metaTagInputStyle: {
        position: 'absolute',
        bottom: '-3px',
    },
    languageRootStyle: {
        width: 110,
        fontSize: '14px',
    },
    languageMenuItemStyle: {
        fontSize: '14px',
    },
};

export default styles;
