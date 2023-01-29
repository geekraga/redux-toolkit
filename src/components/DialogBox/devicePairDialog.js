import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Dialog, FontIcon, TextField, RaisedButton } from 'material-ui';
import { pick } from 'lodash';
import c from 'classnames';
import LoadingIndicator from '../LoadingIndicator';
import { pairDevice } from '../../actions/async/propertyManagement';
import classes from './styles.scss';
import styles from './styles';

class DevicePairDialog extends Component {
    constructor(props) {
        super(props);
        const { propertyId } = this.props;
        this.state = {
            propertyId,
            pairingCode: '',
            showLoader: false,
            messageToShow: '',
            errorClass: false,
        };
        this.reloadPage = '';
        this.clearPairingList = this.clearPairingList.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.pairDevice = this.pairDevice.bind(this);
    }

    clearPairingList() {
        this.props.closeDeviceModal(this.reloadPage);
    }

    handleInputChange(e) {
        this.setState({ errorClass: false, pairingCode: e.target.value, messageToShow: '' });
    }

    pairDevice() {
        const deviceParams = pick(this.state, [
            'propertyId',
            'pairingCode',
        ]);
        document.querySelector('#mainDiv input').blur();
        this.setState({ showLoader: true });
        this.props.requestToPairDevice(deviceParams).then(
                response => {
                    this.setState({ showLoader: false });
                    if (response.status === 200) {
                        this.setState({ messageToShow: response.data.message, errorClass: false, pairingCode: '' });
                        this.reloadPage = 'true';
                    } else if (response.error.response) {
                        this.setState({ messageToShow: response.error.response.data.message, errorClass: true });
                    } else {
                        this.setState({ messageToShow: 'apiError', errorClass: true });
                    }
                },
        );
    }

    render() {
        const { showDeviceDialog } = this.props;
        const { showLoader, errorClass, messageToShow, pairingCode } = this.state;
        const reponseClass = errorClass ? classes.failure : classes.success;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const pairCodeText = <FormattedMessage id="pairCodeText" />;
        const pairDeviceButton = <FormattedMessage id="pairDeviceButton" />;
        return (
          <Dialog
            title={
              <h3 className={classes.dialogHeaderStyle}>
                <FormattedMessage id="addDeviceTip" />
                <FontIcon
                  className="material-icons"
                  style={styles.closeButton}
                  onClick={this.clearPairingList}
                >
                  cancel
                </FontIcon>
              </h3>
                }
            open={showDeviceDialog}
            onRequestClose={this.clearPairingList}
            contentClassName={classes.devicePairContentClass}
            bodyClassName={classes.devicePairBody}
            autoScrollBodyContent
          >
            {loadingIndicator}
            <div id="mainDiv">
              {
                messageToShow ?
                  (
                    <div className={c(classes.messageToShowResponse, reponseClass)}>
                      <FormattedMessage id={messageToShow} defaultMessage={messageToShow} />
                    </div>
                  ) : null
              }

              <TextField
                hintText={pairCodeText}
                floatingLabelText={pairCodeText}
                value={pairingCode}
                maxLength="8"
                onChange={e => this.handleInputChange(e)}
                style={styles.pairCodeInput}
                className={classes.pairTextBox}
              />
              <RaisedButton
                label={pairDeviceButton}
                onTouchTap={this.pairDevice}
                icon={<FontIcon className="material-icons">done</FontIcon>}
                disabled={!pairingCode}
                className={classes.pairButton}
                primary
              />
            </div>
          </Dialog>
        );
    }
}

DevicePairDialog.propTypes = {
    showDeviceDialog: PropTypes.bool.isRequired,
    propertyId: PropTypes.number.isRequired,
    closeDeviceModal: PropTypes.func.isRequired,
    requestToPairDevice: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    requestToPairDevice(data) {
        return dispatch(pairDevice(data));
    },
});

export default connect(null, mapDispatchToProps)(DevicePairDialog);
