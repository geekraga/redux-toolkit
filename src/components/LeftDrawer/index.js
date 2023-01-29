import React, { Component, PropTypes } from 'react';
import { Drawer, FontIcon, ListItem } from 'material-ui';
import ReactTooltip from 'react-tooltip';
import { withRouter } from 'react-router-dom';
import c from 'classnames';
import { FormattedMessage } from 'react-intl';
import SelectableList from '../SelectableList';
import SafeImage from '../SafeImage';
import { ADMIN_MENU_LIST, GUEST_MENU_LIST, HOST_MENU_LIST, USER_TYPE } from '../../constants';
import styles from './styles';
import classes from './styles.scss';
import LinkItem from '../LinkItem';

class LeftDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menusHasItems: true,
        };

        this.handleMenusNestedListToggle = this.handleMenusNestedListToggle.bind(this);
        this.updateMenuDimensions = this.updateMenuDimensions.bind(this);
        this.navigatePage = this.navigatePage.bind(this);
        this.MENU_LIST = (
            this.props.userDashboard.role === USER_TYPE.ADMIN || this.props.userDashboard.role === USER_TYPE.OPERATOR
            ) ? ADMIN_MENU_LIST :
            this.props.userDashboard.role === USER_TYPE.HOST || this.props.userDashboard.role === USER_TYPE.VENDOR ?
            HOST_MENU_LIST :
            GUEST_MENU_LIST
        ;
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateMenuDimensions);
        this.updateMenuDimensions();
        ReactTooltip.rebuild();
    }

    componentDidUpdate() {
        this.updateMenuDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateMenuDimensions);
    }

    updateMenuDimensions() {
        const menuElement = document.querySelector('.views-menu > div > div');
        if (menuElement) {
            const height = window.innerHeight - menuElement.offsetTop;
            menuElement.style.height = `${height - 15}px`;
        }
    }

    handleMenusNestedListToggle = item => {
        this.setState({
            menusHasItems: item.state.open,
        });
    }

    navigatePage() {
        this.props.history.push('/profile');
        this.props.onSelectedIndexChanged();
    }

    render() {
        const { navDrawerOpen, userDashboard, currentPage, onSelectedIndexChanged, showHamburger } = this.props;
        const { menusHasItems } = this.state;
        const drawerClass = c(
            classes.drawerContainer,
            {
                open: navDrawerOpen,
                close: !navDrawerOpen,
            },
        );

        return (
          <div>
            <Drawer
              className={drawerClass}
              docked
              open={navDrawerOpen}
            >
              <div style={styles.logo}>
                <FormattedMessage id="appTitle" />
              </div>
              <div style={styles.avatar.div} onClick={this.navigatePage}>
                <div className={classes.avatarIconContainer}>
                  <SafeImage
                    imageUrl={userDashboard.profilepicurl}
                    componentStyle={styles.avatar.imageStyle}
                  />
                </div>
                <span
                  style={styles.avatar.span}
                  className={classes.userSpan}
                  data-tip={userDashboard.firstname}
                  data-class={classes.tooltipStyle}
                  data-place="bottom"
                  data-effect="solid"
                >
                  {userDashboard.firstname}
                </span>
              </div>

              <SelectableList
                className={c('views-menu', classes.menuContainer)}
                defaultValue={-1}
                onSelectedIndexChanged={onSelectedIndexChanged}
                defaultItem={this.MENU_LIST[0]}
              >
                <ListItem
                  value={-1}
                  className={classes.menuTextColor}
                  primaryText="MENU"
                  style={styles.headerItem}
                  open={menusHasItems}
                  onNestedListToggle={this.handleMenusNestedListToggle}
                  primaryTogglesNestedList
                  nestedItems={this.MENU_LIST.length > 0 ?
                  this.MENU_LIST.map(menuListItem =>
                    <ListItem
                      className={c(classes.listItem, { [classes.currentSelectedList]: (currentPage === menuListItem.index) })}
                      value={menuListItem.index}
                      primaryText={
                        menuListItem.children && menuListItem.children.length > 0 ? (
                          <div className={classes.parentMenu}>
                            <FormattedMessage id={menuListItem.id} />
                          </div>
                        ) : (
                          <LinkItem to={menuListItem.url} linkClass={classes.linkClass}>
                            <FormattedMessage id={menuListItem.id} />
                          </LinkItem>
                        )
                      }
                      primaryTogglesNestedList={menuListItem.children && menuListItem.children.length > 0}
                      leftIcon={<FontIcon className="material-icons">{menuListItem.icon}</FontIcon>}
                      open={menuListItem.open}
                      nestedItems={menuListItem.children && menuListItem.children.length > 0 ?
                        menuListItem.children.map(child =>
                          <ListItem
                            className={c(classes.listItem, { [classes.currentSelectedList]: (currentPage === child.index) })}
                            value={child.index}
                            primaryText={
                              <LinkItem to={child.url} linkClass={classes.linkClass}>
                                <FormattedMessage id={child.id} />
                              </LinkItem>
                            }
                          />
                        ) : []}
                    />)
                   : []
                   }
                />
              </SelectableList>
            </Drawer>
            { (navDrawerOpen && showHamburger) ? (
              <div
                className={classes.backDropFilter}
                onClick={onSelectedIndexChanged}
              />
            ) : null }

          </div>
        );
    }
}

LeftDrawer.propTypes = {
    navDrawerOpen: PropTypes.bool.isRequired,
    showHamburger: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    userDashboard: PropTypes.object.isRequired,
    onSelectedIndexChanged: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(LeftDrawer);
