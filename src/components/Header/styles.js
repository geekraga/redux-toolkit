import ThemeConfig from '../../themes/themeConfig';
import { headerHeight } from '../../constants';

const styles = {
    appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: headerHeight,
    },
    menuButton: {
        marginLeft: 10,
    },
    iconsRightContainer: {
        marginLeft: 20,
    },
    tabsScrollbars: {
        overflowX: 'overlay',
        overflowY: 'hidden',
    },
    iconButton: {
        fill: ThemeConfig.appBarMenuButtonColor,
    },
};

export default styles;
