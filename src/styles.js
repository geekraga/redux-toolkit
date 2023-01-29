import { typography } from 'material-ui/styles';
import { grey600 } from 'material-ui/styles/colors';

const styles = {
    navigation: {
        fontSize: 15,
        fontWeight: typography.fontWeightLight,
        color: grey600,
        paddingBottom: 15,
        display: 'block',
    },
    title: {
        fontSize: 22,
        fontWeight: typography.fontWeightLight,
        marginBottom: 20,
        textTransform: 'capitalize',
    },
    paper: {
        padding: 25,
    },
    clear: {
        clear: 'both',
    },
    pageBaseContent: {
        height: '100%',
        minHeight: 500,
    },
};

export default styles;
