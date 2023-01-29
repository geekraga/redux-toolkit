import React, { PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import { FormattedMessage } from 'react-intl';
import { USER_TYPE } from '../../constants';
import style from './styles';

function Header({ styles, showNavBar, signOut, openSwagger, userType, history }) {
    return (
      <div>
        <AppBar
          style={{ ...styles, ...style.appBar }}
          iconElementLeft={
            <IconButton
              iconStyle={style.iconButton}
              style={style.menuButton}
              onClick={showNavBar}
            >
              <FontIcon color={style.iconButton.fill} className="material-icons">menu</FontIcon>
            </IconButton>
          }
          iconElementRight={
            <div style={style.iconsRightContainer}>
              <IconMenu
                color={style.iconButton.fill}
                iconButtonElement={
                  <IconButton>
                    <FontIcon color={style.iconButton.fill} className="material-icons">
                      more_vert_icon
                    </FontIcon>
                  </IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                { userType === USER_TYPE.ADMIN || userType === USER_TYPE.OPERATOR ?
                  (
                    <MenuItem
                      primaryText={<FormattedMessage id="apiDemo" />}
                      onClick={openSwagger}
                    />
                  ) : null
                }
                <MenuItem
                  primaryText={
                    <FormattedMessage id="signOut" />
                  }
                  onClick={() => { history.push('/'); signOut(); }}
                />
              </IconMenu>
            </div>
          }
        />
      </div>
    );
}

Header.propTypes = {
    styles: PropTypes.object.isRequired,
    showNavBar: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    openSwagger: PropTypes.func.isRequired,
    userType: PropTypes.string.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(Header);
