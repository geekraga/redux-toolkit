import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Dialog, FontIcon } from 'material-ui';
import classes from '../VideoDialog/styles.scss';
import styles from '../VideoDialog/styles';

export default class VideoDialog extends Component {

    componentDidUpdate() {
        window.dispatchEvent(new Event('resize'));
    }

    render() {
        const { showVideoDetails, closeVideoModal, currentVideoUrl } = this.props;
        return (
          <Dialog
            title={
              <h3>
                <FormattedMessage id="videoModalTitle" />
                <FontIcon
                  className="material-icons"
                  style={styles.closeButton}
                  onClick={closeVideoModal}
                >
                  cancel
                </FontIcon>
              </h3>
            }
            open={showVideoDetails}
            onRequestClose={closeVideoModal}
            contentClassName={classes.videoContentClass}
            bodyClassName={classes.videoBody}
            bodyStyle={styles.bodyStyle}
            titleStyle={styles.bgStyle}
            autoScrollBodyContent
            repositionOnUpdate
          >
            <div className={classes.videoContainer}>
              <video controls>
                <source src={currentVideoUrl} />
                <FormattedMessage id="noVideoSupport" />
              </video>
            </div>
          </Dialog>
        );
    }
}

VideoDialog.defaultProps = {
    currentVideoUrl: null,
};

VideoDialog.propTypes = {
    showVideoDetails: PropTypes.bool.isRequired,
    closeVideoModal: PropTypes.func.isRequired,
    currentVideoUrl: PropTypes.string,
};
