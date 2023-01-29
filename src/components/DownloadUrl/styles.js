import { grey700, white } from 'material-ui/styles/colors';

const styles = {
    folderDownload: {
        marginTop: '10px',
        maxWidth: '100%',
        height: '210px',
        cursor: 'pointer',
    },
    playButton: {
        color: white,
        fontSize: '26px',
        position: 'absolute',
        top: '-4px',
        left: '-8px',
    },
    fileImage: {
        height: '100%',
        width: '100%',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        overflowY: 'hidden',
    },
    titleStyle: {
        color: 'rgb(0, 188, 212)',
    },
    imageContainer: {
        overflow: 'hidden',
    },
    downloadBtn: {
        color: grey700,
        fontSize: '50px',
        position: 'absolute',
        top: 'calc(50% - 25px)',
        left: 'calc(50% - 25px)',
    },
};

export default styles;
