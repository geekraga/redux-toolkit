import React, { PropTypes } from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Dialog, RaisedButton } from 'material-ui';
import classes from './styles.scss';

const SlideDialog = props => {
    const {
        showSlideDialog,
        headerText,
        handleCloseDialog,
        slideDialogText,
        buttonText,
        showRightButton,
        rightButtonText,
        rightButtonCallBack,
    } = props;
    return (
      <Dialog
        title={
          <h3 className={classes.dialogHeaderStyle}>
            <FormattedMessage id={headerText} />
          </h3>
        }
        open={showSlideDialog}
        onRequestClose={handleCloseDialog}
        bodyClassName={classes.dialogBodyClass}
        autoScrollBodyContent
      >
        <p>
          <FormattedHTMLMessage id={slideDialogText} />
        </p>
        <div className={classes.buttonContainer}>
          <RaisedButton
            label={<FormattedMessage id={buttonText} />}
            onTouchTap={handleCloseDialog}
            className={classes.leftButton}
            primary
          />
          {
            showRightButton ? (
              <RaisedButton
                label={<FormattedMessage id={rightButtonText} />}
                onTouchTap={rightButtonCallBack}
                className={classes.rightButton}
                primary
              />
            ) : null
          }
        </div>
      </Dialog>
    );
};

SlideDialog.defaultProps = {
    headerText: 'propertyDetails',
    showRightButton: false,
    rightButtonText: 'submit',
    rightButtonCallBack: () => {},
};

SlideDialog.propTypes = {
    showSlideDialog: PropTypes.bool.isRequired,
    showRightButton: PropTypes.bool,
    headerText: PropTypes.string,
    rightButtonText: PropTypes.string,
    slideDialogText: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    handleCloseDialog: PropTypes.func.isRequired,
    rightButtonCallBack: PropTypes.func,
};

export default SlideDialog;
