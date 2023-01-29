import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import { RaisedButton, FloatingActionButton, FontIcon } from 'material-ui';
import { Link } from 'react-router-dom';
import c from 'classnames';
import PageBase from '../../components/PageBase';
import LoadingIndicator from '../LoadingIndicator';
import DevicePairDialog from '../../components/DialogBox/devicePairDialog';
import ConfirmDialogBox from '../../components/DialogBox/confirmDialogBox';
import Pagination from '../../components/Pagination';
import { fetchDeviceList, unPairDevice, changeDeviceStatus } from '../../actions/async/propertyManagement';
import styles from '../../containers/DeviceManagement/styles';
import classes from '../../containers/DeviceManagement/styles.scss';

class PairDevicesFormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoader: true,
            openDeviceDialog: false,
            openUnpairDialog: false,
            openStatusDialog: false,
            asc: false,
            sortBy: '',
            pageNo: 1,
            display: 10,
            currentProperty: '',
            deviceKey: '',
            messageToShow: '',
            errorClass: false,
            deviceStatus: null,
            deviceIndex: 0,
        };
        this.setMessageTimer = 0;
        this.closeDeviceModal = this.closeDeviceModal.bind(this);
        this.createDeviceData = this.createDeviceData.bind(this);
        this.linkDeviceModal = this.linkDeviceModal.bind(this);
        this.unpairDeviceModal = this.unpairDeviceModal.bind(this);
        this.unpairSelectedDevice = this.unpairSelectedDevice.bind(this);
        this.calculateDate = this.calculateDate.bind(this);
        this.filterData = this.filterData.bind(this);
        this.paginationSearch = this.paginationSearch.bind(this);
        this.deviceStatusToBeChanged = this.deviceStatusToBeChanged.bind(this);
        this.handleCloseStatusDialog = this.handleCloseStatusDialog.bind(this);
        this.changeDeviceStatus = this.changeDeviceStatus.bind(this);
    }

    componentWillMount() {
        ReactTooltip.hide();
        const { history, isFormPageValid } = this.props;
        if (!isFormPageValid) {
            history.push('/');
        }
    }

    componentDidMount() {
        this.createDeviceData();
    }

    componentDidUpdate() {
        ReactTooltip.rebuild();
    }

    componentWillUnmount() {
        clearTimeout(this.setMessageTimer);
    }

    createDeviceData() {
        const pId = this.props.match.params.pid;
        this.setState({ showLoader: true });
        const { getDevicesList, isFormPageValid } = this.props;
        if (isFormPageValid) {
            getDevicesList({ pageNo: 1, asc: false, sortBy: 'CR', pId }).then(response => {
                if (response.status === 200) {
                    this.setState({ showLoader: false });
                }
            });
        }
    }

    deviceStatusToBeChanged(device, deviceIndex) {
        const deviceStatus = { id: device.deviceId, isActive: !device.enabled };
        this.setState({ openStatusDialog: true, deviceStatus, deviceIndex });
    }

    handleCloseStatusDialog() {
        this.setState({ openStatusDialog: false });
    }

    changeDeviceStatus() {
        const { deviceIndex, deviceStatus } = this.state;
        this.setState({ openStatusDialog: false, showLoader: true });
        this.props.updateDeviceStatus(deviceStatus, deviceIndex).then(response => {
            if (response.status === 200) {
                this.setState({ messageToShow: 'linkedDeviceStatus', errorClass: false });
            } else if (response.error.response) {
                this.setState({ messageToShow: response.error.response.data.message, errorClass: true });
            } else {
                this.setState({ messageToShow: 'apiError', errorClass: true });
            }
            clearTimeout(this.setMessageTimer);
            this.setMessageTimer = setTimeout(() => this.setState({ messageToShow: '', errorClass: false }), 10000);
            this.setState({ showLoader: false });
        });
    }

    calculateDate(createdAt) {
        if (createdAt) {
            const date = new Date(createdAt);
            return date.toLocaleDateString();
        }
        return '';
    }

    closeDeviceModal(shouldReload = 'false') {
        this.setState({ openDeviceDialog: false, openUnpairDialog: false, currentProperty: '' });
        if (shouldReload === 'true') {
            this.createDeviceData();
        }
    }

    filterData(currentFilter) {
        const { sortBy, asc, pageNo } = this.state;
        const pId = this.props.match.params.pid;
        let ascendingState = false;
        if (currentFilter === sortBy) {
            ascendingState = !asc;
        }
        this.setState({
            asc: ascendingState,
            sortBy: currentFilter,
            showLoader: true,
        });
        this.props.getDevicesList({ pageNo, asc: ascendingState, sortBy: currentFilter, pId })
            .then(response => {
                if (response.status === 200) {
                    this.setState({ showLoader: false });
                }
            }).catch(() => this.setState({ showLoader: false }));
    }

    linkDeviceModal() {
        const currentProperty = parseInt(this.props.match.params.pid, 10);
        this.setState({ openDeviceDialog: true, currentProperty });
    }

    unpairDeviceModal(deviceKey) {
        this.setState({ deviceKey, openUnpairDialog: true });
    }

    unpairSelectedDevice() {
        const { deviceKey } = this.state;
        this.setState({ openUnpairDialog: false, showLoader: true });
        this.props.unpairLinkedDevice({ deviceKey }).then(
                response => {
                    if (response.status === 200) {
                        this.setState({ messageToShow: response.data.message, errorClass: false });
                        this.createDeviceData();
                        this.reloadPage = 'true';
                    } else if (response.error.response) {
                        this.setState({ messageToShow: response.error.response.data.message, errorClass: true });
                    } else {
                        this.setState({ messageToShow: 'apiError', errorClass: true });
                    }
                    clearTimeout(this.setMessageTimer);
                    this.setMessageTimer = setTimeout(() => this.setState({ messageToShow: '', errorClass: false }), 10000);
                },
        );
    }

    paginationSearch(num, disp) {
        const { asc, sortBy } = this.state;
        const pId = this.props.match.params.pid;
        this.setState({ pageNo: num, showLoader: true, display: disp }, () => {
            const ascending = sortBy ? asc : false;
            this.props.getDevicesList({ pageNo: num, asc: ascending, sortBy: sortBy || 'CR', pId }, disp).then(response => {
                if (response.status === 200) {
                    window.scrollTo(0, 0);
                    this.setState({ showLoader: false });
                }
            }).catch(() => this.setState({ showLoader: false }));
        });
    }

    render() {
        const {
            showLoader,
            asc,
            sortBy,
            pageNo,
            display,
            openDeviceDialog,
            openUnpairDialog,
            currentProperty,
            errorClass,
            messageToShow,
            openStatusDialog,
            deviceStatus,
        } = this.state;
        const { deviceList, linkedDevices, intl } = this.props;
        const reponseClass = errorClass ? classes.failure : classes.success;
        const sortDeviceTip = intl.formatMessage({ id: 'sortDeviceTip' });
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const linkDateText = intl.formatMessage({ id: 'linkDate' });
        const createdAtText = intl.formatMessage({ id: 'createdAt' });
        const pairDeviceToolTip = intl.formatMessage({ id: 'pairDeviceToolTip' });
        const serialText = intl.formatMessage({ id: 'serial' });
        const deviceKey = intl.formatMessage({ id: 'deviceKey' });
        const createdAt = intl.formatMessage({ id: 'createdAt' });
        const linkedOn = intl.formatMessage({ id: 'linkedOn' });
        const propertyName = intl.formatMessage({ id: 'propertyName' });
        const action = intl.formatMessage({ id: 'action' });
        const unpairDeviceTip = intl.formatMessage({ id: 'unpairDeviceTip' });
        const enableDeviceToolTip = intl.formatMessage({ id: 'enableDeviceToolTip' });
        const disableDeviceToolTip = intl.formatMessage({ id: 'disableDeviceToolTip' });
        const dialogMessage = deviceStatus && deviceStatus.isActive ?
          'enableDeviceText' :
          'disableDeviceText';

        return (
          <PageBase
            title={<FormattedMessage id="pairedDevices" />}
            navigation={<FormattedMessage id="breadCrumbs.pairDevice" />}
            minHeight={300}
          >
            <div className={classes.pairedDevicesContainer}>
              {loadingIndicator}
              <FloatingActionButton
                secondary
                style={styles.floatingActionButton}
                iconStyle={styles.iconStyle}
                data-tip={pairDeviceToolTip}
                data-class={classes.tooltipStyle}
                data-place="bottom"
                data-effect="solid"
                onTouchTap={this.linkDeviceModal}
                className={classes.floatingActionButtonPairDevice}
              >
                <FontIcon className="material-icons">add</FontIcon>
              </FloatingActionButton>
              {
                messageToShow ?
                  (
                    <div className={c(classes.messageToShowResponse, reponseClass)}>
                      <FormattedMessage id={messageToShow} defaultMessage={messageToShow} />
                    </div>
                  ) : null
              }
              {(deviceList && deviceList.length) ?
                <div>
                  <div className={classes.filterButtons}>
                    <h4 className={classes.filterHeader}>
                      {sortDeviceTip}
                    </h4>
                    <div onClick={() => this.filterData('LD')} className={classes.filterButtonMain}>
                      {linkDateText}
                      <button
                        className="material-icons"
                        style={sortBy === 'LD' ? styles.columns.active_arrow : styles.columns.arrow}
                      >
                        {!asc && sortBy === 'LD' ? 'arrow_downward' : 'arrow_upward'}
                      </button>
                    </div>
                    <div onClick={() => this.filterData('CR')} className={classes.filterButtonMain}>
                      {createdAtText}
                      <button
                        className="material-icons"
                        style={sortBy === 'CR' ? styles.columns.active_arrow : styles.columns.arrow}
                      >
                        {!asc && sortBy === 'CR' ? 'arrow_downward' : 'arrow_upward'}
                      </button>
                    </div>
                  </div>
                  <table className={classes.mainTable}>
                    <thead>
                      <tr>
                        <th width="60">
                          {serialText}
                        </th>
                        <th>
                          {deviceKey}
                        </th>
                        <th>
                          {propertyName}
                        </th>
                        <th onClick={() => this.filterData('CR')} className={classes.filterHeader}>
                          {createdAt}
                          <button
                            className="material-icons"
                            style={sortBy === 'CR' ? styles.columns.active_arrow : styles.columns.arrow}
                          >
                            {!asc && sortBy === 'CR' ? 'arrow_downward' : 'arrow_upward'}
                          </button>
                        </th>
                        <th onClick={() => this.filterData('LD')} className={classes.filterHeader}>
                          {linkedOn}
                          <button
                            className="material-icons"
                            style={sortBy === 'LD' ? styles.columns.active_arrow : styles.columns.arrow}
                          >
                            {!asc && sortBy === 'LD' ? 'arrow_downward' : 'arrow_upward'}
                          </button>
                        </th>
                        <th width="120">
                          {action}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {deviceList.length && deviceList.map((device, i) => (
                        <tr key={device.deviceId}>
                          <td data-th={serialText} width="60">
                            {((pageNo - 1) * display) + (i + 1)}
                          </td>
                          <td data-th={deviceKey}>
                            {device.deviceKey}
                          </td>
                          <td data-th={propertyName}>
                            {device.propertyName}
                          </td>
                          <td data-th={createdAt}>
                            {this.calculateDate(device.createdOn)}
                          </td>
                          <td data-th={linkedOn}>
                            {this.calculateDate(device.linkedOn)}
                          </td>
                          <td data-th={action} width="120">
                            <i
                              className="material-icons"
                              style={styles.columns.pair_icon}
                              onClick={() => this.unpairDeviceModal(device.deviceKey)}
                              data-tip={unpairDeviceTip}
                              data-class={classes.tooltipStyle}
                              data-place="bottom"
                              data-effect="solid"
                            >
                              phonelink_off
                            </i>
                            <i
                              className="material-icons"
                              style={styles.columns.status_icon}
                              onClick={() => this.deviceStatusToBeChanged(device, i)}
                              data-tip={device.enabled ? disableDeviceToolTip : enableDeviceToolTip}
                              data-class={classes.tooltipStyle}
                              data-place="bottom"
                              data-effect="solid"
                            >
                              {device.enabled ? 'lock' : 'lock_open'}
                            </i>

                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                : (
                  <div className={classes.noLinkDeviceAdded}>
                    <FormattedMessage id="noLinkedDevice" />
                    <span className={classes.noDeviceAddedLink} onClick={this.linkDeviceModal}>
                      <FormattedMessage id="linkDeviceText" />
                    </span>
                    <FormattedMessage id="aDeviceText" />
                  </div>
              )
              }
              <Pagination
                totalRecords={linkedDevices}
                paginate={this.paginationSearch}
                currentPageNumber={pageNo}
              />
              <Link to="/" >
                <RaisedButton
                  label={<FormattedMessage id="goBack" />}
                  primary
                  style={{ float: 'right' }}
                />
              </Link>
              {(openDeviceDialog) ?
                <DevicePairDialog
                  showDeviceDialog={openDeviceDialog}
                  propertyId={currentProperty}
                  closeDeviceModal={this.closeDeviceModal}
                />
                :
                null
              }
              {(openUnpairDialog) ?
                <ConfirmDialogBox
                  dialogMessage={'unpairDeviceConfirmation'}
                  handleCloseDialog={() => this.closeDeviceModal}
                  changeStatus={() => this.unpairSelectedDevice}
                />
                :
                null
              }
              {(openStatusDialog) ?
                <ConfirmDialogBox
                  dialogMessage={dialogMessage}
                  handleCloseDialog={() => this.handleCloseStatusDialog}
                  changeStatus={() => this.changeDeviceStatus}
                />
                :
                null
              }
            </div>
          </PageBase>
        );
    }
}

PairDevicesFormPage.propTypes = {
    getDevicesList: PropTypes.func.isRequired,
    unpairLinkedDevice: PropTypes.func.isRequired,
    updateDeviceStatus: PropTypes.func.isRequired,
    isFormPageValid: PropTypes.bool.isRequired,
    deviceList: PropTypes.array.isRequired,
    intl: intlShape.isRequired,
    match: PropTypes.object.isRequired,
    linkedDevices: PropTypes.number.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

const mapStateToProps = reduxState => ({
    isFormPageValid: reduxState.runtimeSettings.isFormPageValid,
    deviceList: reduxState.propertyInformation.allDeviceList,
    linkedDevices: reduxState.propertyInformation.linkedDeviceRecords,
});

const mapDispatchToProps = dispatch => ({
    getDevicesList(pid) {
        return dispatch(fetchDeviceList(pid));
    },
    unpairLinkedDevice(data) {
        return dispatch(unPairDevice(data));
    },
    updateDeviceStatus(data, deviceIndex) {
        return dispatch(changeDeviceStatus(data, deviceIndex));
    },
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(PairDevicesFormPage));
