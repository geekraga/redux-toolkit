import React, { Component, PropTypes } from 'react';
import { Menu, MenuItem, FontIcon, RaisedButton, Popover, PopoverAnimationVertical } from 'material-ui';
import classnames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import classes from './styles.scss';
import styles from './styles';

class VideoItem extends Component {
    constructor() {
        super();
        this.state = {
            openActionMenu: false,
        };
        this.handleActionClick = this.handleActionClick.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.actionMenuHandler = this.actionMenuHandler.bind(this);
        this.createActionMenu = this.createActionMenu.bind(this);
    }

    componentDidMount() {
        ReactTooltip.rebuild();
    }

    handleActionClick(action, actions = []) {
        const { arrayIndex, contentId, actionHandler } = this.props;
        if (action === 'PUBLISH' && actions.length > 1 && actions.some(item => item.name === 'TRANSCODE_IN_PROGRESS')) {
            actionHandler({ contentId, action }, arrayIndex, true);
        } else {
            actionHandler({ contentId, action }, arrayIndex, false);
        }
        this.handleRequestClose();
    }

    handleRequestClose() {
        this.setState({ openActionMenu: false });
    }

    actionMenuHandler(event) {
        event.preventDefault();
        this.props.resetResponseMessage();
        this.setState({ openActionMenu: !this.state.openActionMenu, anchorEl: event.currentTarget });
    }

    createActionMenu(actions) {
        const { openActionMenu, anchorEl } = this.state;
        if (actions.length) {
            switch (actions.length) {
            case 1:
                return (
                  <RaisedButton
                    label={actions[0].description}
                    labelStyle={styles.actionButtonSingleStyle}
                    onTouchTap={() => this.handleActionClick(actions[0].name)}
                    style={styles.actionButtonContainer}
                  />
                );
            default: return (
              <div>
                <RaisedButton
                  onTouchTap={this.actionMenuHandler}
                  label={<FormattedMessage id="actions" />}
                  icon={
                    <FontIcon className={classnames('material-icons', classes.btnIcon)}>
                      {openActionMenu ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                    </FontIcon>
                  }
                  labelStyle={styles.actionButtonStyle}
                  style={styles.actionButtonContainer}
                  labelPosition="before"
                />
                <Popover
                  open={openActionMenu}
                  anchorEl={anchorEl}
                  onRequestClose={this.handleRequestClose}
                  animation={PopoverAnimationVertical}
                  canAutoPosition
                >
                  <Menu
                    listStyle={styles.menuListStyle}
                    menuItemStyle={styles.menuItemStyle}
                    autoWidth
                  >
                    {actions.map(action => (
                      <MenuItem
                        key={action.description}
                        primaryText={action.description}
                        onClick={() => this.handleActionClick(action.name, actions)}
                      />
                    ))}
                  </Menu>
                </Popover>
              </div>
            );
            }
        } else {
            return null;
        }
    }

    render() {
        const {
          intl,
          name,
          status,
          actions,
          contentId,
          thumbnailUrl,
          openModal,
          editVideoContent,
          openThumbnailDialog,
          disableDownload,
          isDownloadable,
          openDownloadDialog,
          showThumbnailButton,
        } = this.props;
        const actionButtonContent = this.createActionMenu(actions);
        const btnToolTip = intl.formatMessage({ id: 'editVideoContent' });
        const thumbnailToolTip = intl.formatMessage({ id: 'thumbnailToolTip' });
        const downloadTooltip = intl.formatMessage({ id: 'downloadTooltip' });
        return (
          <div className={classnames('col-xs-6 col-sm-4 col-md-3', classes.videoContentContainer)}>
            <section className={classes.videoContent}>
              <figure className={classes.thumbnailContainer}>
                <img
                  src={thumbnailUrl}
                  alt={name}
                  className={classes.thumbnail}
                />
                <div className={classes.videoStatus}>
                  {status}
                </div>
                <div className={classes.playContainer} onClick={() => openModal(contentId)}>
                  <FontIcon
                    className="material-icons"
                    style={styles.playButton}
                  >
                    play_circle_outline
                  </FontIcon>
                </div>
              </figure>
              <div
                className={classes.videoTitle}
                data-tip={name}
                data-class={classes.tooltipStyle}
                data-place="bottom"
                data-effect="solid"
              >
                {name}
              </div>
              <div className={classes.videoButtonsContainer}>
                <FontIcon
                  className="material-icons"
                  style={styles.videoButtons}
                  onClick={() => editVideoContent(contentId)}
                  data-tip={btnToolTip}
                  data-class={classes.tooltipStyle}
                  data-place="bottom"
                  data-effect="solid"
                >
                  edit
                </FontIcon>
                {
                  showThumbnailButton ? (
                    <FontIcon
                      className="material-icons"
                      style={styles.videoButtons}
                      onTouchTap={() => openThumbnailDialog(contentId)}
                      data-tip={thumbnailToolTip}
                      data-class={classes.tooltipStyle}
                      data-place="bottom"
                      data-effect="solid"
                    >
                      image
                    </FontIcon>
                  ) : null
                }
                {
                  disableDownload ? null : !isDownloadable ? null : (
                    <FontIcon
                      className="material-icons"
                      style={styles.videoButtons}
                      onTouchTap={() => openDownloadDialog(contentId)}
                      data-tip={downloadTooltip}
                      data-class={classes.tooltipStyle}
                      data-place="bottom"
                      data-effect="solid"
                    >
                      file_download
                    </FontIcon>
                  )
                }
              </div>
              <div className={classes.actionButtonWrapper}>
                {actionButtonContent}
              </div>
            </section>
          </div>
        );
    }
}


VideoItem.propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    arrayIndex: PropTypes.number.isRequired,
    contentId: PropTypes.number.isRequired,
    openModal: PropTypes.func.isRequired,
    actionHandler: PropTypes.func.isRequired,
    editVideoContent: PropTypes.func.isRequired,
    openThumbnailDialog: PropTypes.func.isRequired,
    resetResponseMessage: PropTypes.func.isRequired,
    openDownloadDialog: PropTypes.func.isRequired,
    actions: PropTypes.array.isRequired,
    disableDownload: PropTypes.bool.isRequired,
    isDownloadable: PropTypes.bool.isRequired,
    showThumbnailButton: PropTypes.bool.isRequired,
    intl: intlShape.isRequired,
};

export default injectIntl(VideoItem);
