import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import ReactGA from 'react-ga';
import LoadingIndicator from '../../components/LoadingIndicator';
import PageBase from '../../components/PageBase';
import Pagination from '../../components/Pagination';
import Search from '../../components/SearchBar';
import ConfirmDialogBox from '../../components/DialogBox/confirmDialogBox';
import { changeUserStatus, sortUserList } from '../../actions/async/userManagement';
import { validateFormPageToTrue, updateCurrentPage } from '../../actions/runTimeSettings';
import { SELECT_MENU_LIST, PAGES } from '../../constants';
import styles from './styles';
import classes from './styles.scss';

class UserManagement extends Component {
    constructor() {
        super();
        this.state = {
            showLoader: true,
            openStatusDialog: false,
            search: '',
            selectedUser: null,
            asc: true,
            sortBy: '',
            isActive: '0',
            pageNo: 1,
            display: 10,
            userSearched: false,
        };
        this.validateForm = this.validateForm.bind(this);
        this.filterData = this.filterData.bind(this);
        this.calculateDate = this.calculateDate.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.paginationSearch = this.paginationSearch.bind(this);
        this.changeUserStatus = this.changeUserStatus.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.userStatusToBeChanged = this.userStatusToBeChanged.bind(this);
        this.handleCloseStatusDialog = this.handleCloseStatusDialog.bind(this);
        this.searchStatusEmailChange = this.searchStatusEmailChange.bind(this);
    }
    componentWillMount() {
        ReactTooltip.hide();
    }
    componentDidMount() {
        ReactTooltip.rebuild();
        const { isActive, search } = this.state;
        this.props.sorting({ pageNo: 1, asc: false, sortBy: 'CR', isActive, search }).then(response => {
            if (response.status === 200) {
                this.setState({ showLoader: false });
            }
        }).catch(() => this.setState({ showLoader: false }));
        this.props.updateCurrentComponent(PAGES.USERS);
        window.scrollTo(0, 0);
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
    }

    componentDidUpdate() {
        ReactTooltip.rebuild();
    }

    onSearchSubmit(isActive, search) {
        const { asc, sortBy } = this.state;
        this.setState({ search, showLoader: true, isActive, pageNo: 1, userSearched: true }, () => {
            const ascending = sortBy ? asc : false;
            this.props.sorting({ pageNo: 1, asc: ascending, sortBy: sortBy || 'CR', isActive, search }).then(response => {
                if (response.status === 200) {
                    this.setState({ showLoader: false });
                }
            }).catch(() => this.setState({ showLoader: false }));
        });
    }

    validateForm() {
        this.props.validateFormPage();
    }

    paginationSearch(num, disp) {
        const { asc, sortBy, isActive, search } = this.state;
        this.setState({ pageNo: num, showLoader: true, display: disp }, () => {
            const ascending = sortBy ? asc : false;
            this.props.sorting({ pageNo: num, asc: ascending, sortBy: sortBy || 'CR', isActive, search }, disp).then(response => {
                if (response.status === 200) {
                    window.scrollTo(0, 0);
                    this.setState({ showLoader: false });
                }
            }).catch(() => this.setState({ showLoader: false }));
        });
    }

    searchStatusEmailChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
        });
        this.props.sorting({ pageNo, asc: ascendingState, sortBy: currentFilter, isActive, search }).then(response => {
            if (response.status === 200) {
                this.setState({ showLoader: false });
            }
        }).catch(() => this.setState({ showLoader: false }));
    }

    calculateDate(createdAt) {
        const date = new Date(createdAt);
        return date.toLocaleDateString();
    }

    handleInputChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
                [`${e.target.name}ErrorLabel`]: '',
                showSubmitError: '',
                showSubmitSuccess: false,
            },
        );
    }

    handleCloseStatusDialog() {
        this.setState({
            openStatusDialog: false,
            selectedUser: null,
        });
    }

    changeUserStatus() {
        const { selectedUser } = this.state;
        this.setState({
            openStatusDialog: false,
            selectedUser: null,
        });
        this.props.changeStatus(selectedUser);
    }

    userStatusToBeChanged(user) {
        const userStatus = { id: user.id, isEnabled: !user.isEnabled };
        this.setState({
            openStatusDialog: true,
            selectedUser: userStatus,
        });
    }

    render() {
        const { showLoader, openStatusDialog, pageNo, display, asc, sortBy, selectedUser, userSearched } = this.state;
        const { intl, userList } = this.props;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const addUserToolTip = intl.formatMessage({ id: 'addUserToolTip' });
        const editUserToolTip = intl.formatMessage({ id: 'editUserToolTip' });
        const enableToolTip = intl.formatMessage({ id: 'enableToolTip' });
        const disableToolTip = intl.formatMessage({ id: 'disableToolTip' });
        const firstNameText = intl.formatMessage({ id: 'firstNameText' });
        const lastNameText = intl.formatMessage({ id: 'lastNameText' });
        const emailText = intl.formatMessage({ id: 'emailTextId' });
        const createdAtText = intl.formatMessage({ id: 'createdAt' });
        const roleText = intl.formatMessage({ id: 'roleText' });
        const loginSourceText = intl.formatMessage({ id: 'loginSource' });
        const sortUserTip = intl.formatMessage({ id: 'sortUserTip' });
        const serialText = intl.formatMessage({ id: 'serial' });
        const actionText = intl.formatMessage({ id: 'action' });
        const dialogMessage = selectedUser && selectedUser.isEnabled ? 'enableUserText' : 'disableUserText';
        const noContentFound = userSearched ?
          (<div className={classes.noContentFound}><FormattedMessage id="noSearchContent" /></div>) :
          (<div className={classes.noUserAdded}>
            <FormattedMessage id="noUserAdded" />
            <Link to="/form/0">
              <span className={classes.addUsers} onClick={this.validateForm}>
                <FormattedMessage id="addTagText" />
              </span>
            </Link>
            <FormattedMessage id="noUserText" />
          </div>);
        return (
          <PageBase
            title={<FormattedMessage id="users" />}
            navigation={<FormattedMessage id="breadCrumbs.userlist" />}
            minHeight={300}
          >
            {loadingIndicator}
            {(userList.length || userSearched) ?
              (
                <Search
                  searchFloatingText={'emailText'}
                  searchHintText={'enterEmail'}
                  dropDownText={'status'}
                  selectMenuList={SELECT_MENU_LIST}
                  searching={(isActive, search) => this.onSearchSubmit(isActive, search)}
                />
              ) : null
            }

            <Link to="/form/0">
              <FloatingActionButton
                secondary
                style={styles.floatingActionButton}
                iconStyle={styles.iconStyle}
                onTouchTap={this.validateForm}
                data-tip={addUserToolTip}
                data-class={classes.tooltipStyle}
                data-place="bottom"
                data-effect="solid"
              >
                <FontIcon className="material-icons">add</FontIcon>
              </FloatingActionButton>
            </Link>

            {(userList && userList.length) ?
              <div>
                <div className={classes.filterButtons}>
                  <h4 className={classes.filterHeader}>
                    {sortUserTip}
                  </h4>
                  <div onClick={() => this.filterData('FN')} className={classes.filterButtonMain}>
                    {firstNameText}
                    <button
                      className="material-icons"
                      style={sortBy === 'FN' ? styles.columns.active_arrow : styles.columns.arrow}
                    >
                      {!asc && sortBy === 'FN' ? 'arrow_downward' : 'arrow_upward'}
                    </button>
                  </div>
                  <div onClick={() => this.filterData('LN')} className={classes.filterButtonMain}>
                    {lastNameText}
                    <button
                      className="material-icons"
                      style={sortBy === 'LN' ? styles.columns.active_arrow : styles.columns.arrow}
                    >
                      {!asc && sortBy === 'LN' ? 'arrow_downward' : 'arrow_upward'}
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
                      <th width="50">
                        {serialText}
                      </th>
                      <th onClick={() => this.filterData('FN')} className={classes.filterHeader}>
                        {firstNameText}
                        <button
                          className="material-icons"
                          style={sortBy === 'FN' ? styles.columns.active_arrow : styles.columns.arrow}
                        >
                          {!asc && sortBy === 'FN' ? 'arrow_downward' : 'arrow_upward'}
                        </button>
                      </th>
                      <th onClick={() => this.filterData('LN')}>
                        {lastNameText}
                        <button
                          className="material-icons"
                          style={sortBy === 'LN' ? styles.columns.active_arrow : styles.columns.arrow}
                        >
                          {!asc && sortBy === 'LN' ? 'arrow_downward' : 'arrow_upward'}
                        </button>
                      </th>
                      <th onClick={() => this.filterData('CR')} width="110">
                        {createdAtText}
                        <button
                          className="material-icons"
                          style={sortBy === 'CR' ? styles.columns.active_arrow : styles.columns.arrow}
                        >
                          {!asc && sortBy === 'CR' ? 'arrow_downward' : 'arrow_upward'}
                        </button>
                      </th>
                      <th>
                        {emailText}
                      </th>
                      <th width="50">
                        {roleText}
                      </th>
                      <th>
                        {loginSourceText}
                      </th>
                      <th width="100">
                        {actionText}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(userList.map((list, i) => (
                      <tr key={`data${list.id}`} >
                        <td data-th={serialText} width="50">
                          {((pageNo - 1) * display) + (i + 1)}
                        </td>
                        <td data-th={firstNameText}>
                          {list.firstname}
                        </td>
                        <td data-th={lastNameText}>
                          {list.lastname}
                        </td>
                        <td data-th={createdAtText} width="50">
                          {this.calculateDate(list.createdAt)}
                        </td>
                        <td data-th={emailText}>
                          {list.email}
                        </td>
                        <td data-th={roleText} width="50">
                          {list.roles[0].role}
                        </td>
                        <td data-th={loginSourceText}>
                          {list.loginSource}
                        </td>
                        <td data-th={actionText} width="100">
                          <Link
                            to={`/form/${list.id}`}
                            className={classes.editLink}
                          >
                            <i
                              className="material-icons"
                              style={styles.columns.edit_icon}
                              onClick={this.validateForm}
                              data-tip={editUserToolTip}
                              data-class={classes.tooltipStyle}
                              data-place="bottom"
                              data-effect="solid"
                            >
                              create
                            </i>
                          </Link>
                          <i
                            className="material-icons"
                            style={styles.columns.status_icon}
                            onClick={() => this.userStatusToBeChanged(list)}
                            data-tip={list.isEnabled ? disableToolTip : enableToolTip}
                            data-class={classes.tooltipStyle}
                            data-place="bottom"
                            data-effect="solid"
                          >
                            {list.isEnabled ? 'lock' : 'lock_open'}
                          </i>
                        </td>
                      </tr>
                    )))}
                  </tbody>
                </table>
              </div> :
              noContentFound
            }
            {(openStatusDialog) ?
              <ConfirmDialogBox
                dialogMessage={dialogMessage}
                handleCloseDialog={() => this.handleCloseStatusDialog}
                changeStatus={() => this.changeUserStatus}
              />
              :
              null
            }
            <Pagination
              totalRecords={this.props.totalUsers}
              paginate={this.paginationSearch}
              currentPageNumber={pageNo}
            />
          </PageBase>
        );
    }
}

UserManagement.defaultProps = {
    userList: [],
    totalUsers: 0,
};

UserManagement.propTypes = {
    changeStatus: PropTypes.func.isRequired,
    sorting: PropTypes.func.isRequired,
    updateCurrentComponent: PropTypes.func.isRequired,
    validateFormPage: PropTypes.func.isRequired,
    userList: PropTypes.array,
    totalUsers: PropTypes.number,
    intl: intlShape.isRequired,
};

const mapStateToProps = reduxState => ({
    userList: reduxState.usersList.allUsers,
    totalUsers: reduxState.usersList.totalUsers,
});

const mapDispatchToProps = dispatch => ({
    changeStatus(userDetail) {
        return dispatch(changeUserStatus(userDetail));
    },
    sorting(data, num, disp) {
        return dispatch(sortUserList(data, num, disp));
    },
    updateCurrentComponent(data) {
        return dispatch(updateCurrentPage(data));
    },
    validateFormPage() {
        return dispatch(validateFormPageToTrue());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserManagement));
