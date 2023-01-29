import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { FontIcon, TextField, RaisedButton } from 'material-ui';
import c from 'classnames';
import LinkItem from '../LinkItem';
import LoadingIndicator from '../LoadingIndicator';
import { pairDevice } from '../../actions/async/propertyManagement';
import styles from './styles';
import classes from './styles.scss';

class PublishedProperty extends Component {
    state = {
        pairingCode: '',
        messageToShow: '',
        errorClass: false,
        showLoader: false,
        devicePaired: false,
    };

    handleInputChange = e => {
        this.setState({ errorClass: false, pairingCode: e.target.value, messageToShow: '' });
    }

    pairDevice = () => {
        const { pairingCode } = this.state;
        const { propertyId } = this.props;
        const deviceParams = { propertyId, pairingCode };
        this.setState({ showLoader: true });
        this.props.requestToPairDevice(deviceParams).then(
            response => {
                this.setState({ showLoader: false });
                if (response.status === 200) {
                    this.setState({ messageToShow: '', errorClass: false, devicePaired: true });
                } else if (response.error.response) {
                    this.setState({ messageToShow: response.error.response.data.message, errorClass: true });
                } else {
                    this.setState({ messageToShow: 'apiError', errorClass: true });
                }
            },
        );
    }

    render() {
        const { pairingCode, showLoader, messageToShow, errorClass, devicePaired } = this.state;
        const pairCodeText = <FormattedMessage id="pairCodeText" />;
        const pairDeviceButton = <FormattedMessage id="pairDeviceButton" />;
        const responseClass = errorClass ? classes.failure : classes.success;
        return (
          <div className={classes.propertyPublished}>
            {showLoader ? <LoadingIndicator /> : null}

            <h2>
              <FormattedMessage id="propertyPublished" />
            </h2>
            <p>
              <FormattedMessage id="propertyLiveText" />
              <LinkItem to={'/'} linkClass={classes.linkButton}>
                <FormattedMessage id="pairDeviceContent4" />
              </LinkItem>
              <br />
              <br />
              <FormattedMessage id="linkPairDeviceText" />
              <LinkItem to={'/link'} linkClass={classes.linkButton}>
                <FormattedMessage id="linkPairDevice" />
              </LinkItem>
            </p>
            <div className="row">
              <div className="col-xs-12">
                {
                  messageToShow ?
                    (
                      <div className={c(classes.messageToShowResponse, responseClass)}>
                        <FormattedMessage id={messageToShow} defaultMessage={messageToShow} />
                      </div>
                    ) : null
                }
                {
                  devicePaired ?
                    (
                      <div className={classes.messageToShowResponse}>
                        <FormattedMessage id="rokuPairedToNewProperty" />
                        <LinkItem to={'/'} linkClass={classes.linkButton}>
                          <FormattedMessage id="pairDeviceContent4" />
                        </LinkItem>
                      </div>
                    ) : (
                      <div className={classes.pairRokuContainer}>
                        <span className={classes.pairRokuContent}>
                          <FormattedMessage id="pairRokuText" />
                        </span>
                        <div className={classes.textBoxContainer}>
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
                      </div>
                  )
                }
              </div>
            </div>
          </div>
        );
    }
}

PublishedProperty.propTypes = {
    requestToPairDevice: PropTypes.func.isRequired,
    propertyId: PropTypes.number.isRequired,
};

const mapDispatchToProps = dispatch => ({
    requestToPairDevice(data) {
        return dispatch(pairDevice(data));
    },
});

export default connect(null, mapDispatchToProps)(PublishedProperty);
