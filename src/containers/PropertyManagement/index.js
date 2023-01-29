import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import { FloatingActionButton, FontIcon } from 'material-ui';
import ReactGA from 'react-ga';
import ConfirmDialogBox from '../../components/DialogBox/confirmDialogBox';
import PageBase from '../../components/PageBase';
import LoadingIndicator from '../../components/LoadingIndicator';
import Search from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import NoPropertyInfo from './NoPropertyInfo';
import { updateCurrentPage, validateFormPageToTrue, userDeniedLocation } from '../../actions/runTimeSettings';
import {
    sortPropertyList,
    changePropertyStatus,
    propertyVideoUrl,
    fetchUserAddress,
} from '../../actions/async/propertyManagement';
import { fetchCountryList } from '../../actions/async/location';
import {
    SELECT_MENU_LIST,
    PAGES,
} from '../../constants';
import styles from '../MetaTagManagement/styles';
import classes from './styles.scss';

class PropertyManagement extends Component {
    constructor() {
        super();
        this.state = {
            showLoader: true,
            isDataLoaded: false,
            openStatusDialog: false,
            openDeviceDialog: false,
            openLinkDialog: false,
            currentProperty: '',
            selectedProperty: null,
            asc: false,
            sortBy: '',
            pageNo: 1,
            isActive: 0,
            search: '',
            display: 10,
            showSubmitError: false,
            userSearched: false,
            publicVideoUrl: '',
        };
        this.handleCloseStatusDialog = this.handleCloseStatusDialog.bind(this);
        this.userStatusToBeChanged = this.userStatusToBeChanged.bind(this);
        this.changePropertyStatus = this.changePropertyStatus.bind(this);
        this.paginationSearch = this.paginationSearch.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.calculateDate = this.calculateDate.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.filterData = this.filterData.bind(this);
        this.getPublicLink = this.getPublicLink.bind(this);
        this.closeUrlDialog = this.closeUrlDialog.bind(this);
        this.copyLinkAction = this.copyLinkAction.bind(this);
    }

    componentDidMount() {
        ReactTooltip.rebuild();
        const { getCountryList, sorting, updateCurrentComponent, userLocation } = this.props;
        const { isActive, search } = this.state;
        getCountryList();
        sorting({ pageNo: 1, asc: false, sortBy: 'CR', isActive, search }).then(response => {
            if (response.status === 200) {
                this.setState({ showLoader: false, isDataLoaded: true });
            }
        }).catch(() => this.setState({ showLoader: false }));
        window.scrollTo(0, 0);
        updateCurrentComponent(PAGES.PROPERTY);
        if (!userLocation.userDeniedGeolocation && !userLocation.location) {
            this.getUserCordinates();
        }
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
    }

    componentDidUpdate() {
        ReactTooltip.rebuild();
    }


    componentWillUnmount() {
        ReactTooltip.hide();
    }

    onSearchSubmit(isActive, search) {
        const { asc, sortBy } = this.state;
        this.setState({ search, showLoader: true, isActive, pageNo: 1, showSubmitError: false, userSearched: true }, () => {
            const ascending = sortBy ? asc : false;
            this.props.sorting({ pageNo: 1, asc: ascending, sortBy: sortBy || 'CR', isActive, search }).then(response => {
                if (response.status === 200) {
                    this.setState({ showLoader: false });
                }
            }).catch(() => this.setState({ showLoader: false }));
        });
    }

    getUserCordinates = () => {
        const { unableToGetUserLocation, getUserAddress } = this.props;
        navigator.geolocation.getCurrentPosition(
            position => { getUserAddress(position.coords); },
            () => { unableToGetUserLocation(); },
        );
    }

    getPublicLink(id) {
        this.setState({ showLoader: true });
        this.props.getPropertyVideoUrl(id).then(response => {
            if (response.status === 200) {
                this.setState({ showLoader: false, openLinkDialog: true, publicVideoUrl: response.data.videoUrl });
            } else if (response.error.response) {
                this.setState({ showLoader: false, showSubmitError: response.error.response.data.message, publicVideoUrl: '' });
            } else {
                this.setState({ showLoader: false, showSubmitError: 'apiError', publicVideoUrl: '' });
            }
        });
    }

    getDefaultMessage = () => {
        const { isDataLoaded } = this.state;
        const { username } = this.props;
        if (!isDataLoaded) return null;
        return (<NoPropertyInfo validateForm={this.validateForm} username={username} />);
    }

    closeUrlDialog() {
        this.setState({ openLinkDialog: false, publicVideoUrl: '' });
    }

    copyLinkAction() {
        const { publicVideoUrl } = this.state;
        const textField = document.createElement('textarea');
        textField.innerText = publicVideoUrl;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        this.closeUrlDialog();
    }

    validateForm() {
        this.props.validateFormPage();
    }

    calculateDate(createdAt) {
        const date = new Date(createdAt);
        return date.toLocaleDateString();
    }

    handleCloseStatusDialog() {
        this.setState({
            openStatusDialog: false,
            selectedProperty: null,
        });
    }

    filterData(currentFilter) {
        const { sortBy, asc, pageNo, isActive, search } = this.state;
        let ascendingState = false;
        if (currentFilter === sortBy) {
            ascendingState = !asc;
        }
        this.setState({
            asc: ascendingState,
            sortBy: currentFilter,
            showLoader: true,
            showSubmitError: false,
        });
        this.props.sorting({ pageNo, asc: ascendingState, sortBy: currentFilter, isActive, search }).then(response => {
            if (response.status === 200) {
                this.setState({ showLoader: false });
            }
        }).catch(() => this.setState({ showLoader: false }));
    }

    userStatusToBeChanged(list) {
        const propertyStatus = { id: list.id, isActive: !list.isActive };
        this.setState({
            openStatusDialog: true,
            selectedProperty: propertyStatus,
            showSubmitError: false,
        });
    }

    changePropertyStatus() {
        const { selectedProperty } = this.state;
        this.setState({
            openStatusDialog: false,
            selectedProperty: null,
        });
        this.props.changeStatus(selectedProperty).then(
                response => {
                    if (response.status !== 200 && response.error.response) {
                        this.setState({ showSubmitError: response.error.response.data.message });
                    }
                },
        );
    }

    paginationSearch(num, disp) {
        const { asc, sortBy, isActive, search } = this.state;
        this.setState({ pageNo: num, showLoader: true, display: disp, showSubmitError: false }, () => {
            const ascending = sortBy ? asc : false;
            this.props.sorting({ pageNo: num, asc: ascending, sortBy: sortBy || 'CR', isActive, search }, disp)
              .then(response => {
                  if (response.status === 200) {
                      window.scrollTo(0, 0);
                      this.setState({ showLoader: false });
                  }
              }).catch(() => this.setState({ showLoader: false }));
        });
    }

    render() {
        const { intl, propertyList } = this.props;
        const {
            openStatusDialog,
            openLinkDialog,
            showLoader,
            asc,
            sortBy,
            pageNo,
            display,
            selectedProperty,
            showSubmitError,
            userSearched,
            publicVideoUrl,
        } = this.state;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const serialText = intl.formatMessage({ id: 'serial' });
        const propertyNameHeader = intl.formatMessage({ id: 'propertyName' });
        const createdAtText = intl.formatMessage({ id: 'createdAt' });
        const createdByText = intl.formatMessage({ id: 'createdBy' });
        const actionText = intl.formatMessage({ id: 'action' });
        const enablePropertyTip = intl.formatMessage({ id: 'enablePropertyTip' });
        const disablePropertyTip = intl.formatMessage({ id: 'disablePropertyTip' });
        const editPropertyTip = intl.formatMessage({ id: 'editPropertyTip' });
        const addPropertyInfoTip = intl.formatMessage({ id: 'addPropertyInfoTip' });
        const viewLinkedDeviceTip = intl.formatMessage({ id: 'viewLinkedDeviceTip' });
        const addPropertyTip = intl.formatMessage({ id: 'addPropertyTip' });
        const sortPropertyTip = intl.formatMessage({ id: 'sortPropertyTip' });
        const getPublicLinkTip = intl.formatMessage({ id: 'getPublicLinkTip' });
        const noContentFound = userSearched ?
          (<div className={classes.noContentFound}><FormattedMessage id="noSearchContent" /></div>) :
            this.getDefaultMessage();

        const dialogMessage = selectedProperty && selectedProperty.isActive ?
            'enablePropertyText' :
            'disablePropertyText';

        const urlDialogMessage = 'urlDialogMessage';

        return (
          <PageBase
            title={<FormattedMessage id="property" />}
            navigation={<FormattedMessage id="breadCrumbs.property" />}
            minHeight={300}
          >
            {loadingIndicator}
            <div className={classes.propertyContainer}>
              <Link to="/property/form/0" className={classes.floatingButtonContainer}>
                <FloatingActionButton
                  secondary
                  style={styles.floatingActionButton}
                  iconStyle={styles.iconStyle}
                  data-tip={addPropertyTip}
                  data-class={classes.tooltipStyle}
                  data-place="bottom"
                  data-effect="solid"
                  onTouchTap={this.validateForm}
                  className={classes.floatingActionButton}
                >
                  <FontIcon className="material-icons">add</FontIcon>
                </FloatingActionButton>
              </Link>
              {
                showSubmitError ? (
                  <div className={classes.propertyErrorContainer}>
                    <FormattedMessage id={showSubmitError} defaultMessage={showSubmitError} />
                  </div>
                ) : null
              }
              {(propertyList.length || userSearched) ?
                (
                  <Search
                    searchFloatingText={'propertyNameText'}
                    searchHintText={'enterPropertyName'}
                    dropDownText={'status'}
                    selectMenuList={SELECT_MENU_LIST}
                    searching={(isActive, search) => this.onSearchSubmit(isActive, search)}
                  />
                ) : null
              }
              {(propertyList.length) ?
                <div>
                  <div className={classes.filterButtons}>
                    <h4 className={classes.filterHeader}>
                      {sortPropertyTip}
                    </h4>
                    <div onClick={() => this.filterData('PN')} className={classes.filterButtonMain}>
                      {propertyNameHeader}
                      <button
                        className="material-icons"
                        style={sortBy === 'PN' ? styles.columns.active_arrow : styles.columns.arrow}
                      >
                        {!asc && sortBy === 'PN' ? 'arrow_downward' : 'arrow_upward'}
                      </button>
                    </div>
                    <div onClick={() => this.filterData('CB')} className={classes.filterButtonMain}>
                      {createdByText}
                      <button
                        className="material-icons"
                        style={sortBy === 'CB' ? styles.columns.active_arrow : styles.columns.arrow}
                      >
                        {!asc && sortBy === 'CB' ? 'arrow_downward' : 'arrow_upward'}
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
                        <th width="80">
                          {serialText}
                        </th>
                        <th onClick={() => this.filterData('PN')} className={classes.filterHeader}>
                          {propertyNameHeader}
                          <button
                            className="material-icons"
                            style={sortBy === 'PN' ? styles.columns.active_arrow : styles.columns.arrow}
                          >
                            {!asc && sortBy === 'PN' ? 'arrow_downward' : 'arrow_upward'}
                          </button>
                        </th>
                        <th onClick={() => this.filterData('CB')}>
                          {createdByText}
                          <button
                            className="material-icons"
                            style={sortBy === 'CB' ? styles.columns.active_arrow : styles.columns.arrow}
                          >
                            {!asc && sortBy === 'CB' ? 'arrow_downward' : 'arrow_upward'}
                          </button>
                        </th>
                        <th onClick={() => this.filterData('CR')}>
                          {createdAtText}
                          <button
                            className="material-icons"
                            style={sortBy === 'CR' ? styles.columns.active_arrow : styles.columns.arrow}
                          >
                            {!asc && sortBy === 'CR' ? 'arrow_downward' : 'arrow_upward'}
                          </button>
                        </th>
                        <th width="170">
                          {actionText}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(propertyList.length && propertyList.map((list, i) => (
                        <tr key={`data${list.id}`} >
                          <td data-th={serialText} width="80">
                            {((pageNo - 1) * display) + (i + 1)}
                          </td>
                          <td data-th={propertyNameHeader}>
                            {list.propertyName}
                          </td>
                          <td data-th={createdByText}>
                            {list.createdBy}
                          </td>
                          <td data-th={createdAtText}>
                            {this.calculateDate(list.createdAt)}
                          </td>
                          <td data-th={actionText} width="170">
                            <Link
                              to={`/property/form/${list.id}`}
                              className={classes.editLink}
                              data-tip={editPropertyTip}
                              data-class={classes.tooltipStyle}
                              data-place="bottom"
                              data-effect="solid"
                            >
                              <i
                                className="material-icons"
                                style={styles.columns.edit_icon}
                                onClick={this.validateForm}
                              >
                                create
                              </i>
                            </Link>
                            <Link
                              to={`/property/addInfo/${list.id}`}
                              className={classes.editLink}
                              data-tip={addPropertyInfoTip}
                              data-class={classes.tooltipStyle}
                              data-place="bottom"
                              data-effect="solid"
                            >
                              <i
                                className="material-icons"
                                style={styles.columns.info_icon}
                                onClick={this.validateForm}
                              >
                                video_library
                              </i>
                            </Link>
                            <Link
                              to={`/property/pair/devices/${list.id}`}
                              data-tip={viewLinkedDeviceTip}
                              data-class={classes.tooltipStyle}
                              data-place="bottom"
                              data-effect="solid"
                              className={classes.linkButton}
                            >
                              <i
                                className="material-icons"
                                onClick={this.validateForm}
                              >
                                live_tv
                              </i>
                            </Link>
                            <i
                              className="material-icons"
                              style={styles.columns.status_icon}
                              onClick={() => this.getPublicLink(list.id)}
                              data-tip={getPublicLinkTip}
                              data-class={classes.tooltipStyle}
                              data-place="bottom"
                              data-effect="solid"
                            >
                              link
                            </i>
                            <i
                              className="material-icons"
                              style={styles.columns.status_icon}
                              onClick={() => this.userStatusToBeChanged(list)}
                              data-tip={list.isActive ? disablePropertyTip : enablePropertyTip}
                              data-class={classes.tooltipStyle}
                              data-place="bottom"
                              data-effect="solid"
                            >
                              {list.isActive ? 'lock' : 'lock_open'}
                            </i>
                          </td>
                        </tr>
                      )))}
                    </tbody>
                  </table>
                </div> : noContentFound
              }
              {(openStatusDialog) ?
                <ConfirmDialogBox
                  dialogMessage={dialogMessage}
                  handleCloseDialog={() => this.handleCloseStatusDialog}
                  changeStatus={() => this.changePropertyStatus}
                />
                :
                null
              }
              {(openLinkDialog) ?
                <ConfirmDialogBox
                  dialogMessage={urlDialogMessage}
                  publicVideoUrl={publicVideoUrl}
                  cancelButtonText={'closePopUp'}
                  confirmButtonText={'copyLinkText'}
                  customWidth={'75%'}
                  handleCloseDialog={() => this.closeUrlDialog}
                  changeStatus={() => this.copyLinkAction}
                  showConfirmButton={false}
                />
                :
                null
              }
              <Pagination
                totalRecords={this.props.totalProperties}
                paginate={this.paginationSearch}
                currentPageNumber={pageNo}
              />
            </div>
          </PageBase>
        );
    }
}

PropertyManagement.defaultProps = {
    totalProperties: 0,
};

PropertyManagement.propTypes = {
    sorting: PropTypes.func.isRequired,
    getCountryList: PropTypes.func.isRequired,
    changeStatus: PropTypes.func.isRequired,
    updateCurrentComponent: PropTypes.func.isRequired,
    validateFormPage: PropTypes.func.isRequired,
    getPropertyVideoUrl: PropTypes.func.isRequired,
    propertyList: PropTypes.array.isRequired,
    unableToGetUserLocation: PropTypes.func.isRequired,
    getUserAddress: PropTypes.func.isRequired,
    userLocation: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    totalProperties: PropTypes.number,
    intl: intlShape.isRequired,
};

const mapStateToProps = reduxState => ({
    propertyList: reduxState.propertyInformation.propertyList,
    totalProperties: reduxState.propertyInformation.totalProperties,
    userLocation: reduxState.runtimeSettings.userLocation,
    username: reduxState.userDashboard.dashboard.firstname,
});

const mapDispatchToProps = dispatch => ({
    getCountryList() {
        dispatch(fetchCountryList(true));
    },
    sorting(data) {
        return dispatch(sortPropertyList(data));
    },
    changeStatus(propertydetail) {
        return dispatch(changePropertyStatus(propertydetail));
    },
    updateCurrentComponent(data) {
        return dispatch(updateCurrentPage(data));
    },
    validateFormPage() {
        return dispatch(validateFormPageToTrue());
    },
    getPropertyVideoUrl(id) {
        return dispatch(propertyVideoUrl(id));
    },
    unableToGetUserLocation() {
        return dispatch(userDeniedLocation());
    },
    getUserAddress(location) {
        dispatch(fetchUserAddress(location));
    },

});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(PropertyManagement));
