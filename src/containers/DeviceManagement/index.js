import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import ReactGA from 'react-ga';
import ConfirmDialogBox from '../../components/DialogBox/confirmDialogBox';
import Search from '../../components/SearchBar';
import LoadingIndicator from '../../components/LoadingIndicator';
import PageBase from '../../components/PageBase';
import Pagination from '../../components/Pagination';
import PreviewDeviceInfo from '../../components/DeviceFormPage';
import { fetchDeviceList, changeDeviceStatus } from '../../actions/async/deviceManagement';
import { updateCurrentPage } from '../../actions/runTimeSettings';
import styles from './styles';
import classes from './styles.scss';
import { SELECT_MENU_LIST_DEVICE, PAGES } from '../../constants';

class DeviceManagement extends Component {
    constructor() {
        super();
        this.state = {
            showLoader: true,
            openStatusDialog: false,
            openUpdateDialog: false,
            selectedDeviceId: null,
            selectedDevice: null,
            asc: false,
            sortBy: '',
            pageNo: 1,
            isActive: 0,
            paired: 0,
            search: '',
            display: 10,
            userSearched: false,
        };
        this.calculateDate = this.calculateDate.bind(this);
        this.deviceStatusToBeChanged = this.deviceStatusToBeChanged.bind(this);
        this.showDeviceInfo = this.showDeviceInfo.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.paginationSearch = this.paginationSearch.bind(this);
        this.filterData = this.filterData.bind(this);
        this.handleCloseStatusDialog = this.handleCloseStatusDialog.bind(this);
        this.changeDeviceStatus = this.changeDeviceStatus.bind(this);
    }
    componentWillMount() {
        ReactTooltip.hide();
    }

    componentDidMount() {
        ReactTooltip.rebuild();
        const { isActive, search, paired } = this.state;
        this.props.getDeviceList({ pageNo: 1, asc: false, sortBy: 'CR', isActive, paired, search, userSearched: true })
          .then(response => {
              if (response.status === 200) {
                  this.setState({ showLoader: false });
              }
          });
        this.props.updateCurrentComponent(PAGES.DEVICES);
        window.scrollTo(0, 0);
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
    }

    componentDidUpdate() {
        ReactTooltip.rebuild();
    }

    onSearchSubmit(isActive, search, paired = 0) {
        if (parseInt(isActive, 10) > 2) {
            paired = isActive - 2;
            isActive = 0;
        }
        const { asc, sortBy } = this.state;
        this.setState({ search, showLoader: true, isActive, pageNo: 1, userSearched: true, paired }, () => {
            const ascending = sortBy ? asc : false;
            this.props.getDeviceList({ pageNo: 1, asc: ascending, sortBy: sortBy || 'CR', isActive, search, paired })
              .then(response => {
                  if (response.status === 200) {
                      this.setState({ showLoader: false });
                  }
              }).catch(() => this.setState({ showLoader: false }));
        });
    }

    filterData(currentFilter) {
        const { sortBy, asc, pageNo, isActive, search, paired } = this.state;
        let ascendingState = false;
        if (currentFilter === sortBy) {
            ascendingState = !asc;
        }
        this.setState({
            asc: ascendingState,
            sortBy: currentFilter,
            showLoader: true,
        });
        this.props.getDeviceList({ pageNo, asc: ascendingState, sortBy: currentFilter, isActive, search, paired })
          .then(response => {
              if (response.status === 200) {
                  this.setState({ showLoader: false });
              }
          }).catch(() => this.setState({ showLoader: false }));
    }

    showDeviceInfo(deviceId) {
        this.setState({ openUpdateDialog: true, selectedDeviceId: deviceId });
    }

    handleCloseStatusDialog() {
        this.setState({
            openUpdateDialog: false,
            openStatusDialog: false,
            selectedUser: null,
        });
    }

    calculateDate(createdAt) {
        if (createdAt) {
            const date = new Date(createdAt);
            return date.toLocaleDateString();
        }
        return '';
    }

    deviceStatusToBeChanged(device) {
        const deviceStatus = { id: device.deviceId, isActive: !device.enabled };
        this.setState({ openStatusDialog: true, selectedDevice: deviceStatus });
    }

    changeDeviceStatus() {
        this.setState({ openStatusDialog: false });
        this.props.changeStatus(this.state.selectedDevice);
    }

    paginationSearch(num, disp) {
        const { asc, sortBy, isActive, search, paired } = this.state;
        this.setState({ pageNo: num, showLoader: true, display: disp }, () => {
            const ascending = sortBy ? asc : false;
            this.props.getDeviceList({ pageNo: num, asc: ascending, sortBy: sortBy || 'CR', isActive, search, paired }, disp).then(response => {
                if (response.status === 200) {
                    this.setState({ showLoader: false });
                }
            }).catch(() => this.setState({ showLoader: false }));
        });
    }

    render() {
        const { deviceList, intl } = this.props;
        const {
          showLoader,
          asc,
          sortBy,
          pageNo,
          display,
          openUpdateDialog,
          selectedDevice,
          selectedDeviceId,
          openStatusDialog,
          userSearched,
        } = this.state;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const sortDeviceTip = intl.formatMessage({ id: 'sortDeviceTip' });
        const createdAtText = intl.formatMessage({ id: 'createdAt' });
        const viewDeviceToolTip = intl.formatMessage({ id: 'viewDeviceToolTip' });
        const enableDeviceToolTip = intl.formatMessage({ id: 'enableDeviceToolTip' });
        const disableDeviceToolTip = intl.formatMessage({ id: 'disableDeviceToolTip' });
        const serialText = intl.formatMessage({ id: 'serial' });
        const deviceKey = intl.formatMessage({ id: 'deviceKey' });
        const description = intl.formatMessage({ id: 'description' });
        const linkedOn = intl.formatMessage({ id: 'linkedOn' });
        const propertyName = intl.formatMessage({ id: 'propertyName' });
        const action = intl.formatMessage({ id: 'action' });
        const dialogMessage = selectedDevice && selectedDevice.isActive ?
          'enableDeviceText' :
          'disableDeviceText';
        const noContentFound = userSearched ?
          (<div className={classes.noContentFound}><FormattedMessage id="noSearchContent" /></div>) :
          (<div className={classes.noDeviceAdded}><FormattedMessage id="noDeviceAdded" /></div>);
        return (
          <PageBase
            title={<FormattedMessage id="devices" />}
            navigation={<FormattedMessage id="breadCrumbs.devices" />}
            minHeight={300}
          >
            {(deviceList.length || userSearched) ?
              (
                <Search
                  searchFloatingText={'deviceKey'}
                  searchHintText={'deviceKeyText'}
                  dropDownText={'status'}
                  selectMenuList={SELECT_MENU_LIST_DEVICE}
                  searching={this.onSearchSubmit}
                />
              ) : null
            }

            {loadingIndicator}
            {(deviceList && deviceList.length) ?
              <div>
                <div className={classes.filterButtons}>
                  <h4 className={classes.filterHeader}>
                    {sortDeviceTip}
                  </h4>
                  <div onClick={() => this.filterData('CR')} className={classes.filterButtonMain}>
                    {createdAtText}
                    <button
                      className="material-icons"
                      style={sortBy === 'CR' ? styles.columns.active_arrow : styles.columns.arrow}
                    >
                      {!asc && sortBy === 'CR' ? 'arrow_downward' : 'arrow_upward'}
                    </button>
                  </div>
                  <div onClick={() => this.filterData('LD')} className={classes.filterButtonMain}>
                    {linkedOn}
                    <button
                      className="material-icons"
                      style={sortBy === 'LD' ? styles.columns.active_arrow : styles.columns.arrow}
                    >
                      {!asc && sortBy === 'LD' ? 'arrow_downward' : 'arrow_upward'}
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
                      <th>
                        {description}
                      </th>
                      <th onClick={() => this.filterData('CR')} className={classes.filterHeader}>
                        {createdAtText}
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
                        <td data-th={description}>
                          {device.description}
                        </td>
                        <td data-th={createdAtText}>
                          {this.calculateDate(device.createdOn)}
                        </td>
                        <td data-th={linkedOn}>
                          {this.calculateDate(device.linkedOn)}
                        </td>
                        <td data-th={action} width="120">
                          <button
                            className="material-icons"
                            style={styles.columns.edit_icon}
                            onClick={() => this.showDeviceInfo(device.deviceId)}
                            data-tip={viewDeviceToolTip}
                            data-class={classes.tooltipStyle}
                            data-place="bottom"
                            data-effect="solid"
                          >
                            remove_red_eye
                          </button>
                          <i
                            className="material-icons"
                            style={styles.columns.status_icon}
                            onClick={() => this.deviceStatusToBeChanged(device)}
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
            : noContentFound
            }
            {(openUpdateDialog) ?
              <PreviewDeviceInfo
                handleCloseDialog={() => this.handleCloseStatusDialog}
                selectedData={selectedDeviceId}
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
            <Pagination
              totalRecords={this.props.totalDevices}
              paginate={this.paginationSearch}
              currentPageNumber={pageNo}
            />
          </PageBase>
        );
    }
}

DeviceManagement.defaultProps = {
    deviceList: [],
    totalDevices: 0,
};

DeviceManagement.propTypes = {
    getDeviceList: PropTypes.func.isRequired,
    changeStatus: PropTypes.func.isRequired,
    updateCurrentComponent: PropTypes.func.isRequired,
    deviceList: PropTypes.array,
    totalDevices: PropTypes.number,
    intl: intlShape.isRequired,
};

const mapStateToProps = reduxState => ({
    deviceList: reduxState.devicesList.allDevices,
    totalDevices: reduxState.devicesList.totalDevices,
});

const mapDispatchToProps = dispatch => ({
    getDeviceList(data) {
        return dispatch(fetchDeviceList(data));
    },
    updateCurrentComponent(data) {
        return dispatch(updateCurrentPage(data));
    },
    changeStatus(data) {
        return dispatch(changeDeviceStatus(data));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DeviceManagement));
