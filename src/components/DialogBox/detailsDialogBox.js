import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import c from 'classnames';
import { fixUrl } from '../../util/regexStorage';
import classes from './styles.scss';

export default function DetailsDialogBox(props) {
    const { selectedVideoData, handleClose } = props;
    return (
      <Dialog
        open
        onRequestClose={handleClose}
      >
        <button
          className={c('material-icons', classes.closeVideoDialog)}
          onClick={props.handleClose}
        >
          clear
        </button>
        <h2 className={classes.videoDialogTitle}>
          {selectedVideoData.videoName}
        </h2>
        <p className={classes.videoDialogDetails}>
          {selectedVideoData.videoDescription}
        </p>
        <div>
          {
            selectedVideoData && selectedVideoData.phone ?
              (
                <div className={classes.mobileContactDetails}>
                  <i className="material-icons">
                    phone_iphone
                  </i>
                  <a
                    href={`tel:${selectedVideoData.phone}`}
                  >
                    {selectedVideoData.phone}
                  </a>
                </div>
              ) : null
          }
          {
            selectedVideoData && selectedVideoData.website ?
              (
                <div className={classes.mobileContactDetails}>
                  <i className="material-icons">
                    tv
                  </i>
                  <a
                    href={fixUrl(selectedVideoData.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedVideoData.website}
                  </a>
                </div>
              ) : null
          }
          {
            selectedVideoData.credits ? (
              <div className={c(classes.creditsDetails, classes.mobileContactDetails)}>
                <i className="material-icons">
                  local_movies
                </i>
                <span>
                  {selectedVideoData.credits}
                </span>
              </div>
            ) : null
          }
        </div>
      </Dialog>
    );
}

DetailsDialogBox.propTypes = {
    selectedVideoData: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
};
