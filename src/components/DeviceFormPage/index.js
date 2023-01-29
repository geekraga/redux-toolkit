import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import { fetchDeviceDetails } from '../../actions/async/deviceManagement';
import LoadingIndicator from '../LoadingIndicator';
import styles from './styles';
import classes from './styles.scss';

class PreviewDeviceInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoader: true,
        };
    }

    componentWillMount() {
        ReactTooltip.hide();
        const { fetchDevices, selectedData } = this.props;
        fetchDevices(selectedData).then(response => {
            if (response.status === 200) {
                this.setState({ showLoader: false });
            }
        });
    }
    render() {
        const { showLoader } = this.state;
        const { deviceInfo } = this.props;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        return (
          <Dialog
            title={
              <h3>
                <FormattedMessage id="deviceDetails" />
                <FontIcon
                  className="material-icons"
                  style={styles.closeButton}
                  onTouchTap={this.props.handleCloseDialog()}
                >
                  cancel
                </FontIcon>
              </h3>
            }
            onRequestClose={this.props.handleCloseDialog()}
            bodyStyle={styles.bodyStyle}
            contentClassName={classes.contentClass}
            bodyClassName={classes.contentBody}
            open
            autoScrollBodyContent
          >
            {loadingIndicator}
            {deviceInfo ?
              (
                <table className={classes.contentTable}>
                  <tbody>
                    <tr>
                      <td className={classes.leftRow}><FormattedMessage id="deviceName" /></td>
                      <td className={classes.rightRow}>{deviceInfo.deviceKey}</td>
                    </tr>
                    <tr>
                      <td className={classes.leftRow}><FormattedMessage id="contentDecription" /></td>
                      <td className={classes.rightRow}>{deviceInfo.description}</td>
                    </tr>
                    <tr>
                      <td className={classes.leftRow}><FormattedMessage id="deviceModel" /></td>
                      <td className={classes.rightRow}>{deviceInfo.model}</td>
                    </tr>
                    <tr>
                      <td className={classes.leftRow}><FormattedMessage id="deviceResolution" /></td>
                      <td className={classes.rightRow}>{deviceInfo.uiResolution}</td>
                    </tr>
                    <tr>
                      <td className={classes.leftRow}><FormattedMessage id="deviceWidth" /></td>
                      <td className={classes.rightRow}>{deviceInfo.uiWidth}</td>
                    </tr>
                    <tr>
                      <td className={classes.leftRow}><FormattedMessage id="deviceHeight" /></td>
                      <td className={classes.rightRow}>{deviceInfo.uiHeight}</td>
                    </tr>
                    <tr>
                      <td className={classes.leftRow}><FormattedMessage id="connectionType" /></td>
                      <td className={classes.rightRow}>{deviceInfo.connectionType}</td>
                    </tr>
                    <tr>
                      <td className={classes.leftRow}><FormattedMessage id="captionMode" /></td>
                      <td className={classes.rightRow}>{deviceInfo.captionMode}</td>
                    </tr>
                    <tr>
                      <td className={classes.leftRow}><FormattedMessage id="country" /></td>
                      <td className={classes.rightRow}>{deviceInfo.countryCode}</td>
                    </tr>
                    <tr>
                      <td className={classes.leftRow}><FormattedMessage id="deviceZone" /></td>
                      <td className={classes.rightRow}>{deviceInfo.timeZone}</td>
                    </tr>
                  </tbody>
                </table>
              )

            :
              null
            }
          </Dialog>
        );
    }
}
PreviewDeviceInfo.defaultProps = {
    deviceInfo: {},
};

PreviewDeviceInfo.propTypes = {
    fetchDevices: PropTypes.func.isRequired,
    deviceInfo: PropTypes.object,
    selectedData: PropTypes.number.isRequired,
    handleCloseDialog: PropTypes.func.isRequired,
};

const mapStateToProps = reduxState => ({
    deviceInfo: reduxState.devicesList.deviceInfo,
});

const mapDispatchToProps = dispatch => ({
    fetchDevices(id) {
        return dispatch(fetchDeviceDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewDeviceInfo);
