import { greenA700, red400 } from 'material-ui/styles/colors';

const styles = {
    floatingActionButton: {
        top: -80,
        right: 0,
        position: 'absolute',
    },
    iconStyle: {
        width: '45px',
        height: '45px',
        lineHeight: '45px',
        fontSize: '24px',
    },
    columns: {
        edit_icon: {
            color: 'orange',
            cursor: 'pointer',
        },
        status_icon: {
            marginLeft: '8px',
            cursor: 'pointer',
        },
        pair_icon: {
            cursor: 'pointer',
        },
        arrow: {
            fontSize: '15px',
            verticalAlign: 'middle',
            cursor: 'pointer',
        },
        active_arrow: {
            fontSize: '15px',
            verticalAlign: 'middle',
            color: greenA700,
            fontWeight: 'bolder',
            cursor: 'pointer',
        },
        active: {
            color: greenA700,
            fontSize: 18,
            cursor: 'default',
        },
        inactive: {
            color: red400,
            cursor: 'default',
        },
    },
};

export default styles;
