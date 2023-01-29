import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Dialog, FontIcon } from 'material-ui';
import isEmpty from 'lodash/isEmpty';
import LoadingIndicator from '../LoadingIndicator';
import VideoDetailDialog from './VideoDetailDialog';
import classes from './styles.scss';
import styles from './styles';

class VideoDialog extends Component {

    componentDidUpdate() {
        window.dispatchEvent(new Event('resize'));
    }

    render() {
        const { showVideoDetails, closeVideoModal, videoInfo } = this.props;
        const content = isEmpty(videoInfo) ? <LoadingIndicator /> : <VideoDetailDialog videoInfo={videoInfo} />;
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
            {content}
          </Dialog>
        );
    }
}

VideoDialog.propTypes = {
    showVideoDetails: PropTypes.bool.isRequired,
    closeVideoModal: PropTypes.func.isRequired,
    videoInfo: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
    videoInfo: reduxState.videoInformation,
});

export default connect(mapStateToProps)(VideoDialog);
