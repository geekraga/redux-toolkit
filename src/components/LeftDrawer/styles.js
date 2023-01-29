import { spacing, typography } from 'material-ui/styles';
import ThemeConfig from '../../themes/themeConfig';

const styles = {
    logo: {
        fontSize: 22,
        color: ThemeConfig.logoColor,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        backgroundColor: ThemeConfig.logoBackgroundColor,
        textAlign: 'center',
        height: 56,
    },
    headerItem: {
        color: ThemeConfig.headerItemColor,
        fontSize: 14,
        boxShadow: ThemeConfig.headerItemBoxShadow,
        backgroundColor: ThemeConfig.headerItemBackgroundColor,
        fontWeight: ThemeConfig.headerItemFontWeight,
    },
    selectedMenuListItem: {
        color: ThemeConfig.selectedMenuListItemColor,
        fontSize: 14,
        background: ThemeConfig.selectedMenuListItemBackgroundColor,
    },
    selectedListItem: {
        color: ThemeConfig.selectedListItemColor,
        fontSize: 14,
        background: ThemeConfig.selectedListItemBackgroundColor,
    },
    menuItem: {
    },
    avatar: {
        div: {
            padding: '15px 0 20px 15px',
            height: 45,
        },
        span: {
            paddingTop: 12,
            color: ThemeConfig.avatarSpanColor,
            fontWeight: 300,
            textShadow: ThemeConfig.avatarSpanTextShadow,
            cursor: 'pointer',
        },
        imageStyle: {
            height: '100%',
            width: '100%',
            objectFit: 'contain',
        },
    },
    loading: {
        textAlign: 'center',
        paddingTop: 12,
        display: 'block',
        color: ThemeConfig.menuItemColor,
        fontWeight: 300,
        textShadow: ThemeConfig.avatarSpanTextShadow,
    },
};

export default styles;
