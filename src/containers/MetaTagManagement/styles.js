import { greenA700, red400 } from 'material-ui/styles/colors';

const styles = {
    floatingActionButton: {
        top: -60,
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
        edit_icon: {
            color: 'orange',
            cursor: 'pointer',
        },
        status_icon: {
            marginLeft: '8px',
            cursor: 'pointer',
        },
        info_icon: {
            color: 'orange',
            marginLeft: '8px',
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
        dropDown: {
            left: '2%',
        },
        searchText: {
            bottom: '15px',
            left: '0',
        },
    },
    image: {
        height: 40,
        width: 40,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: '50%',
    },
};

export default styles;
