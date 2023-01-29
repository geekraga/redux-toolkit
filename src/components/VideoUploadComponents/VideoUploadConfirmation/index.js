import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import LinkItem from '../../LinkItem';
import classes from './styles.scss';

export default function VideoUploadConfirmation(props) {
    const { confirmationMsg, resetUploader, videoToUpdate } = props;
    const confirmationValueText = <FormattedMessage id={confirmationMsg} />;
    return (
      <div>
        <h3 className={classes.heading}>
          <FormattedMessage id="videoUplaoded" />
        </h3>
        <div className={classes.bodyContent}>
          {confirmationValueText}
        </div>
        <div className={classes.buttonsDiv}>
          {
            !videoToUpdate ?
            (
              <RaisedButton
                label={<FormattedMessage id="uploadReset" />}
                icon={<FontIcon className="material-icons">refresh</FontIcon>}
                onTouchTap={resetUploader}
                className={classes.previousBtn}
                primary
              />
            ) : null
          }
          <LinkItem to={'/videos'} linkClass={videoToUpdate ? classes.linkButton : classes.nextBtn}>
            <FormattedMessage id="manageVideo" />
          </LinkItem>
        </div>
      </div>
    );
}

VideoUploadConfirmation.propTypes = {
    resetUploader: PropTypes.func.isRequired,
    confirmationMsg: PropTypes.string.isRequired,
    videoToUpdate: PropTypes.number.isRequired,
};
