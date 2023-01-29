import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Dialog, FlatButton } from 'material-ui';
import styles from './styles';

export default function TrancodeDialog(props) {
    const { handleCloseDialog, openDialog } = props;
    const actions = [
      <FlatButton
        label={<FormattedMessage id="no" />}
        primary
        onTouchTap={() => handleCloseDialog(false)}
      />,
      <FlatButton
        label={<FormattedMessage id="yes" />}
        primary
        onTouchTap={() => handleCloseDialog(true)}
      />,
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          open={openDialog}
          bodyStyle={styles.bodyStyle}
          modal
        >
          <FormattedMessage id="transcodeDialog" />
        </Dialog>
      </div>
    );
}


TrancodeDialog.propTypes = {
    handleCloseDialog: PropTypes.func.isRequired,
    openDialog: PropTypes.bool.isRequired,
};
