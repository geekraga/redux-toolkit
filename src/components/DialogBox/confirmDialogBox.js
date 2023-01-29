import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import styles from './styles';
import classes from './styles.scss';

export default function ConfirmDialogBox(props) {
    const {
        dialogMessage,
        handleCloseDialog,
        changeStatus,
        publicVideoUrl,
        cancelButtonText,
        confirmButtonText,
        customWidth,
        showConfirmButton,
    } = props;
    const ConfirmRaisedButton = showConfirmButton ?
        (
          <RaisedButton
            label={<FormattedMessage id={confirmButtonText} />}
            primary
            onTouchTap={changeStatus()}
            style={styles.confirmButton}
            className={classes.button}
          />
        ) : null;
    const actionsStatusChange = [
        <RaisedButton
          label={<FormattedMessage id={cancelButtonText} />}
          onTouchTap={handleCloseDialog()}
          className={classes.button}
        />,
        ConfirmRaisedButton,
    ];
    return (
      <Dialog
        actions={actionsStatusChange}
        modal={false}
        open
        contentStyle={{ width: customWidth }}
        onRequestClose={handleCloseDialog()}
        bodyStyle={styles.titleStyle}
        actionsContainerStyle={styles.actionsContainerStyle}
        contentClassName={classes.contentClass}
      >
        <div>
          <FormattedMessage id={dialogMessage} />
          {
            !showConfirmButton ?
              (
                <section>
                  <a href={publicVideoUrl} target="_blank" rel="noopener noreferrer" className={classes.linkExternal}>
                    {publicVideoUrl}
                  </a>
                  <div className={classes.confirmButtonSupport}>
                    <FormattedMessage id="copyLinkTextProp" />
                  </div>
                </section>
              ) :
              null
          }
        </div>
      </Dialog>
    );
}

ConfirmDialogBox.defaultProps = {
    publicVideoUrl: '',
    cancelButtonText: 'cancel',
    confirmButtonText: 'confirm',
    customWidth: '40%',
    showConfirmButton: true,
};

ConfirmDialogBox.propTypes = {
    dialogMessage: PropTypes.string.isRequired,
    publicVideoUrl: PropTypes.string,
    cancelButtonText: PropTypes.string,
    confirmButtonText: PropTypes.string,
    customWidth: PropTypes.string,
    handleCloseDialog: PropTypes.func.isRequired,
    changeStatus: PropTypes.func.isRequired,
    showConfirmButton: PropTypes.bool.isRequired,
};
