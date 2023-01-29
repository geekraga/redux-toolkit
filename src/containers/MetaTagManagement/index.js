import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import c from 'classnames';
import ReactTooltip from 'react-tooltip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import ReactGA from 'react-ga';
import Search from '../../components/SearchBar';
import LoadingIndicator from '../../components/LoadingIndicator';
import PageBase from '../../components/PageBase';
import Pagination from '../../components/Pagination';
import UpdateDialogBox from '../../components/DialogBox/addUpdateTagDialogBox';
import ConfirmDialogBox from '../../components/DialogBox/confirmDialogBox';
import { sortMetaTagList, changeTagStatus } from '../../actions/async/metaTagManagement';
import { updateCurrentPage } from '../../actions/runTimeSettings';
import { SELECT_MENU_LIST, PAGES } from '../../constants';
import styles from './styles';
import classes from './styles.scss';

class MetaTagManagement extends Component {
    constructor() {
        super();
        this.state = {
            showLoader: true,
            openUpdateDialog: false,
            openStatusDialog: false,
            selectedTag: null,
            asc: false,
            sortBy: '',
            pageNo: 1,
            isActive: 0,
            search: '',
            display: 10,
            userSearched: false,
            messageToShow: '',
            errorClass: false,
            newTag: false,
        };
        this.setMessageTimer = 0;
        this.calculateDate = this.calculateDate.bind(this);
        this.tagStatusToBeChanged = this.tagStatusToBeChanged.bind(this);
        this.tagsToBeUpdated = this.tagsToBeUpdated.bind(this);
        this.updateTag = this.updateTag.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.paginationSearch = this.paginationSearch.bind(this);
        this.handleCloseStatusDialog = this.handleCloseStatusDialog.bind(this);
        this.filterData = this.filterData.bind(this);
        this.changeTagStatus = this.changeTagStatus.bind(this);
        this.createMetaData = this.createMetaData.bind(this);
        this.updateMetaData = this.updateMetaData.bind(this);
    }

    componentWillMount() {
        ReactTooltip.hide();
    }

    componentDidMount() {
        this.createMetaData();
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
    }

    componentDidUpdate() {
        ReactTooltip.rebuild();
    }

    componentWillUnmount() {
        clearTimeout(this.setMessageTimer);
    }

    onSearchSubmit(isActive, search) {
        const { asc, sortBy } = this.state;
        this.setState({ search, showLoader: true, isActive, pageNo: 1, userSearched: true }, () => {
            const ascending = sortBy ? asc : false;
            this.props.sorting({ pageNo: 1, asc: ascending, sortBy: sortBy || 'CR', isActive, search })
              .then(response => {
                  if (response.status === 200) {
                      this.setState({ showLoader: false });
                  }
              }).catch(() => this.setState({ showLoader: false }));
        });
    }

    createMetaData() {
        const { isActive, search, asc, sortBy } = this.state;
        this.setState({ showLoader: true, pageNo: 1, newTag: false }, () => {
            const ascending = sortBy ? asc : false;
            this.props.sorting({ pageNo: 1, asc: ascending, sortBy: sortBy || 'CR', isActive, search })
              .then(response => {
                  if (response.status === 200) {
                      this.setState({ showLoader: false });
                  }
              }).catch(() => this.setState({ showLoader: false }));
        });
        this.props.updateCurrentComponent(PAGES.METATAGS);
        window.scrollTo(0, 0);
    }

    updateMetaData() {
        const { isActive, search, pageNo } = this.state;
        this.setState({ showLoader: true });
        this.props.sorting({ pageNo, asc: false, sortBy: 'CR', isActive, search }).then(response => {
            if (response.status === 200) {
                this.setState({ showLoader: false });
            }
        }).catch(() => this.setState({ showLoader: false }));
        this.props.updateCurrentComponent(PAGES.METATAGS);
        window.scrollTo(0, 0);
    }

    calculateDate(createdAt) {
        const date = new Date(createdAt);
        return date.toLocaleDateString();
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

    tagsToBeUpdated(tag) {
        this.setState({
            openUpdateDialog: true,
            selectedTag: tag,
        });
        if (tag.target) {
            this.setState({ newTag: true });
        }
    }

    tagStatusToBeChanged(tag) {
        const tagStatus = { id: tag.id, isActive: !tag.isActive };
        this.setState({
            openStatusDialog: true,
            selectedTag: tagStatus,
        });
    }

    changeTagStatus() {
        this.updateTag(this.state.selectedTag);
    }

    updateTag(data) {
        const { newTag } = this.state;
        this.setState({
            openUpdateDialog: false,
            openStatusDialog: false,
            selectedTag: null,
            showLoader: true,
        });
        this.props.changeStatus(data).then(response => {
            if (response.status === 200) {
                let messageToShow = 'tagUpdateSuccess';
                if (newTag) {
                    this.createMetaData();
                    messageToShow = 'tagAddSuccess';
                } else {
                    this.updateMetaData();
                }
                this.setState({ messageToShow, errorClass: false, showLoader: false });
            } else if (response.error.response) {
                this.setState({
                    messageToShow: response.error.response.data.message,
                    errorClass: true,
                    newTag: false,
                    showLoader: false,
                });
            } else {
                this.setState({ messageToShow: 'apiError', errorClass: true, newTag: false, showLoader: false });
            }
            clearTimeout(this.setMessageTimer);
            this.setMessageTimer = setTimeout(() => this.setState({ messageToShow: '', errorClass: false }), 12000);
        });
    }

    handleCloseStatusDialog() {
        this.setState({
            openStatusDialog: false,
            openUpdateDialog: false,
            selectedUser: null,
        });
    }

    paginationSearch(num, disp) {
        const { asc, sortBy, isActive, search } = this.state;
        this.setState({ pageNo: num, showLoader: true, display: disp }, () => {
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
        const { intl, totalTags, tagsList } = this.props;
        const {
          openUpdateDialog,
          showLoader,
          asc,
          sortBy,
          pageNo,
          display,
          selectedTag,
          openStatusDialog,
          userSearched,
          errorClass,
          messageToShow,
        } = this.state;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const addMetatagToolTip = intl.formatMessage({ id: 'addMetatagToolTip' });
        const editMetaTagToolTip = intl.formatMessage({ id: 'editMetaTagToolTip' });
        const enableMetaTagTip = intl.formatMessage({ id: 'enableMetaTagTip' });
        const disableMetaTagTip = intl.formatMessage({ id: 'disableMetaTagTip' });
        const serialText = intl.formatMessage({ id: 'serial' });
        const tagNameHeader = intl.formatMessage({ id: 'tagName' });
        const createdAtText = intl.formatMessage({ id: 'createdAt' });
        const createdByText = intl.formatMessage({ id: 'createdBy' });
        const actionText = intl.formatMessage({ id: 'action' });
        const sortTagTip = intl.formatMessage({ id: 'sortTagTip' });
        const reponseClass = errorClass ? classes.failure : classes.success;
        const dialogMessage = selectedTag && selectedTag.isActive ?
          'enableTagText' :
          'disableTagText';
        const noContentFound = userSearched ?
            (<div className={classes.noContentFound}><FormattedMessage id="noSearchContent" /></div>) :
            (<div className={classes.noTagAdded}>
              <FormattedMessage id="noTagAdded" />
              <span className={classes.addTags} onClick={this.tagsToBeUpdated}>
                <FormattedMessage id="addTagText" />
              </span>
              <FormattedMessage id="noTagText" />
            </div>);
        return (
          <PageBase
            title={<FormattedMessage id="meta" />}
            navigation={<FormattedMessage id="breadCrumbs.metalist" />}
            minHeight={300}
          >
            {loadingIndicator}
            <div className={classes.metaTagMainContainer}>
              <FloatingActionButton
                style={styles.floatingActionButton}
                iconStyle={styles.iconStyle}
                onClick={this.tagsToBeUpdated}
                secondary
                data-tip={addMetatagToolTip}
                data-class={classes.tooltipStyle}
                data-place="bottom"
                data-effect="solid"
                className={classes.floatingActionButton}
              >
                <FontIcon className="material-icons">add</FontIcon>
              </FloatingActionButton>
              {
                messageToShow ?
                  (
                    <div className="row">
                      <div className={c(classes.messageToShowResponse, reponseClass, 'col-xs-12')}>
                        <FormattedMessage id={messageToShow} defaultMessage={messageToShow} />
                      </div>
                    </div>
                  ) : null
              }
              {(tagsList.length || userSearched) ?
                (
                  <Search
                    searchFloatingText={'tagText'}
                    searchHintText={'enterTag'}
                    dropDownText={'status'}
                    selectMenuList={SELECT_MENU_LIST}
                    searching={(isActive, search) => this.onSearchSubmit(isActive, search)}
                  />
                ) : null
              }
              {(tagsList && tagsList.length) ?
                <div>
                  <div className={classes.filterButtons}>
                    <h4 className={classes.filterHeader}>
                      {sortTagTip}
                    </h4>
                    <div onClick={() => this.filterData('TN')} className={classes.filterButtonMain}>
                      {tagNameHeader}
                      <button
                        className="material-icons"
                        style={sortBy === 'TN' ? styles.columns.active_arrow : styles.columns.arrow}
                      >
                        {!asc && sortBy === 'TN' ? 'arrow_downward' : 'arrow_upward'}
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
                        <th >
                          {serialText}
                        </th>
                        <th onClick={() => this.filterData('TN')} className={classes.filterHeader}>
                          {tagNameHeader}
                          <button
                            className="material-icons"
                            style={sortBy === 'TN' ? styles.columns.active_arrow : styles.columns.arrow}
                          >
                            {!asc && sortBy === 'TN' ? 'arrow_downward' : 'arrow_upward'}
                          </button>
                        </th>
                        <th onClick={() => this.filterData('CB')} className={classes.filterHeader}>
                          {createdByText}
                          <button
                            className="material-icons"
                            style={sortBy === 'CB' ? styles.columns.active_arrow : styles.columns.arrow}
                          >
                            {!asc && sortBy === 'CB' ? 'arrow_downward' : 'arrow_upward'}
                          </button>
                        </th>
                        <th onClick={() => this.filterData('CR')} width="110" className={classes.filterHeader}>
                          {createdAtText}
                          <button
                            className="material-icons"
                            style={sortBy === 'CR' ? styles.columns.active_arrow : styles.columns.arrow}
                          >
                            {!asc && sortBy === 'CR' ? 'arrow_downward' : 'arrow_upward'}
                          </button>
                        </th>
                        <th width="120">
                          {actionText}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(tagsList.length && tagsList.map((list, i) => (
                        <tr key={`data${list.id}`} >
                          <td data-th={serialText} width="60">
                            {((pageNo - 1) * display) + (i + 1)}
                          </td>
                          <td data-th={tagNameHeader}>
                            {list.tagname}
                          </td>
                          <td data-th={createdByText}>
                            {list.createdBy}
                          </td>
                          <td data-th={createdAtText} width="60">
                            {this.calculateDate(list.createdAt)}
                          </td>
                          <td data-th={actionText} width="120">
                            <i
                              className="material-icons"
                              style={styles.columns.edit_icon}
                              onClick={() => this.tagsToBeUpdated(list)}
                              data-tip={editMetaTagToolTip}
                              data-class={classes.tooltipStyle}
                              data-place="bottom"
                              data-effect="solid"
                            >
                              create
                            </i>
                            <i
                              className="material-icons"
                              style={styles.columns.status_icon}
                              onClick={() => this.tagStatusToBeChanged(list)}
                              data-tip={list.isActive ? disableMetaTagTip : enableMetaTagTip}
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
                </div> :
                noContentFound
              }
              {(openUpdateDialog) ?
                <UpdateDialogBox
                  handleCloseDialog={() => this.handleCloseStatusDialog}
                  update={data => this.updateTag(data)}
                  selectedData={selectedTag}
                />
                :
                null
              }
              {(openStatusDialog) ?
                <ConfirmDialogBox
                  dialogMessage={dialogMessage}
                  handleCloseDialog={() => this.handleCloseStatusDialog}
                  changeStatus={() => this.changeTagStatus}
                />
                :
                null
              }
              <Pagination
                totalRecords={totalTags}
                paginate={this.paginationSearch}
                currentPageNumber={pageNo}
              />
            </div>
          </PageBase>
        );
    }
}

MetaTagManagement.defaultProps = {
    tagsList: [],
    totalTags: 0,
};

MetaTagManagement.propTypes = {
    changeStatus: PropTypes.func.isRequired,
    sorting: PropTypes.func.isRequired,
    updateCurrentComponent: PropTypes.func.isRequired,
    tagsList: PropTypes.array,
    totalTags: PropTypes.number,
    intl: intlShape.isRequired,
};

const mapStateToProps = reduxState => ({
    tagsList: reduxState.metaTagsList.allTags,
    totalTags: reduxState.metaTagsList.totalTags,
});

const mapDispatchToProps = dispatch => ({
    changeStatus(tagDetail) {
        return dispatch(changeTagStatus(tagDetail));
    },
    sorting(data) {
        return dispatch(sortMetaTagList(data));
    },
    updateCurrentComponent(data) {
        return dispatch(updateCurrentPage(data));
    },
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(MetaTagManagement));
