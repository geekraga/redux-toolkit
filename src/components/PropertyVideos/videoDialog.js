import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import c from 'classnames';
import { FormattedMessage } from 'react-intl';
import { fixUrl } from '../../util/regexStorage';
import JwPlayer from '../JwPlayer';
import classes from './style.scss';

function VideoDialog(props) {
    const { selectedVideoData, propertyName, updatePreviewContent, isOpen, handleClose } = props;
    return (
      <div>
        <Dialog
          open={isOpen}
          onRequestClose={handleClose}
          contentClassName={classes.videoContentClass}
          bodyClassName={classes.videoBody}
          autoScrollBodyContent
          repositionOnUpdate
        >
          <div className={classes.playerWrapper}>
            <JwPlayer
              currentItem={selectedVideoData}
              propertyName={propertyName}
              updatePreviewContent={updatePreviewContent}
            />
          </div>
          <i
            className={c('material-icons', classes.closeVideoDialog)}
            onClick={handleClose}
          >
            clear
          </i>
          <h2 className={classes.videoDialogTitle}>
            {selectedVideoData.videoName}
          </h2>
          <p className={classes.videoDialogDetails}>
            {selectedVideoData.videoDescription}
          </p>
          <div className={classes.contactDetails}>
            {
              selectedVideoData && selectedVideoData.phone ?
                <div className={classes.phoneInfo}>
                  <FormattedMessage id="contactNo" />:
                  <a
                    href={`tel:${selectedVideoData.phone}`}
                    className={classes.infoLink}
                  >
                    {selectedVideoData.phone}
                  </a>
                </div> :
                null
            }
            {
              selectedVideoData && selectedVideoData.website ?
                <div className={classes.phoneInfo}>
                  <FormattedMessage id="website" />:
                  <a
                    href={fixUrl(selectedVideoData.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.infoLink}
                  >
                    {selectedVideoData.website}
                  </a>
                </div> :
                null
            }
            {
              selectedVideoData.credits ? (
                <div className={classes.websiteInfo}>
                  <FormattedMessage id="videoCredits" />:
                  <span className={classes.websiteInfoText}>
                    {selectedVideoData.credits}
                  </span>
                </div>
              ) : null
            }
          </div>
        </Dialog>
      </div>
    );
}

VideoDialog.propTypes = {
    selectedVideoData: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    updatePreviewContent: PropTypes.func.isRequired,
    propertyName: PropTypes.string.isRequired,
};

export default VideoDialog;
