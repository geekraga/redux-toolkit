import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import { FloatingActionButton, FontIcon } from 'material-ui';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';
import ReactGA from 'react-ga';
import PageBase from '../../components/PageBase';
import LoadingIndicator from '../../components/LoadingIndicator';
import VideoList from '../../components/VideoList';
import Pagination from '../../components/Pagination';
import LinkItem from '../../components/LinkItem';
import { fetchCountryList } from '../../actions/async/location';
import { fetchVideos, fetchVideoActions } from '../../actions/async/videoManagement';
import { updateCurrentPage } from '../../actions/runTimeSettings';
import { applySelectedFilter } from '../../actions/contentSearchInformation';
import { PAGES } from '../../constants';
import styles from '../MetaTagManagement/styles';
import classes from './styles.scss';

class VideoManagement extends Component {
    constructor() {
        super();
        this.state = {
            showLoader: true,
            isDataLoaded: false,
            page: 1,
            size: 12,
            elasticSearch: {},
            userSearchedContent: false,
        };
        this.paginationSearch = this.paginationSearch.bind(this);
        this.generateContent = this.generateContent.bind(this);
        this.getVideoList = this.getVideoList.bind(this);
        this.videoResult = this.videoResult.bind(this);
        this.updateElasticSearch = this.updateElasticSearch.bind(this);
    }

    componentWillMount() {
        this.getVideoList();
        this.props.getActionButtons();
    }

    componentDidMount() {
        this.props.updateCurrentComponent(PAGES.VIDEOMANAGE);
        this.props.getCountryList();
        window.scrollTo(0, 0);
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
    }

    componentWillReceiveProps(nextProps) {
        const updatedData = nextProps.filterApiData;
        const { elasticSearch } = this.state;
        if (!isEqual(updatedData, this.props.filterApiData)) {
            this.setState({ elasticSearch: { ...elasticSearch, ...updatedData }, page: 1 }, () => {
                this.getVideoList();
            });
        }
    }

    getVideoList() {
        const { elasticSearch } = this.state;
        const data = pick(this.state, [
            'page',
            'size',
        ]);
        this.setState({ showLoader: true });
        this.props.getVideos({ ...data, ...elasticSearch }).then(
            () => {
                this.setState({ showLoader: false, isDataLoaded: true });
                window.scrollTo(0, 0);
            });
    }

    updateElasticSearch() {
        this.setState({ userSearchedContent: true });
        this.props.applySelectedAction();
    }

    paginationSearch(page, size) {
        this.setState({ showLoader: true, page, size }, () => {
            this.getVideoList();
        });
    }

    videoResult(all) {
        const { elasticSearch } = this.state;
        const updatedSearch = { ...elasticSearch, all };
        this.setState({ userSearchedContent: true, elasticSearch: updatedSearch, page: 1 }, () => {
            this.getVideoList();
        });
    }

    generateContent(totalVideos) {
        const { userSearchedContent, size, page } = this.state;
        const mainContent = totalVideos || userSearchedContent ? (
          <div>
            {(!totalVideos && userSearchedContent) ?
              (
                <div className={classes.noContentAvailable}>
                  <FormattedMessage id="noSearchContent" />
                </div>
              ) : null
            }
            <VideoList
              reloadPage={this.getVideoList}
              updateElasticSearch={this.updateElasticSearch}
              videoResult={this.videoResult}
            />
            <Pagination
              totalRecords={totalVideos}
              paginate={this.paginationSearch}
              currentPageNumber={page}
              pageSize={size}
            />
          </div>
        ) : (
          <div className={classes.noContentAvailable}>
            <FormattedMessage id="noVideoMessage" />
            <LinkItem to={'/videoUpload'} linkClass={classes.addVideo}>
              <FormattedMessage id="upload" />
            </LinkItem>
            <FormattedMessage id="noVideoMessageEnd" />
          </div>
        );
        return mainContent;
    }

    render() {
        const { totalVideos, videoActions, intl } = this.props;
        const { showLoader, isDataLoaded } = this.state;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const content = isDataLoaded ? this.generateContent(totalVideos, videoActions) : null;
        const videoUpload = intl.formatMessage({ id: 'videoUpload' });

        return (
          <div className={classes.videoManager}>
            <PageBase
              title={<FormattedMessage id="manageVideo" />}
              navigation={<FormattedMessage id="breadCrumbs.manageVideo" />}
              minHeight={300}
            >
              {loadingIndicator}
              <Link to="/videoUpload" className={classes.floatingButtonContainer}>
                <FloatingActionButton
                  secondary
                  style={styles.floatingActionButton}
                  iconStyle={styles.iconStyle}
                  data-tip={videoUpload}
                  data-class={classes.tooltipStyle}
                  data-place="bottom"
                  data-effect="solid"
                  className={classes.floatingActionButton}
                >
                  <FontIcon className="material-icons">add</FontIcon>
                </FloatingActionButton>
              </Link>
              {content}
            </PageBase>
          </div>
        );
    }
}

VideoManagement.propTypes = {
    getVideos: PropTypes.func.isRequired,
    getActionButtons: PropTypes.func.isRequired,
    updateCurrentComponent: PropTypes.func.isRequired,
    applySelectedAction: PropTypes.func.isRequired,
    totalVideos: PropTypes.number.isRequired,
    videoActions: PropTypes.array.isRequired,
    filterApiData: PropTypes.object.isRequired,
    getCountryList: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
};

const mapStateToProps = reduxState => ({
    totalVideos: reduxState.videoList.totalVideos,
    videoActions: reduxState.videoList.actionList,
    filterApiData: reduxState.contentSearchManagement.filterApiData,
});

const mapDispatchToProps = dispatch => ({
    getCountryList() {
        dispatch(fetchCountryList());
    },
    getVideos(data) {
        return dispatch(fetchVideos(data));
    },
    getActionButtons() {
        dispatch(fetchVideoActions());
    },
    updateCurrentComponent(data) {
        return dispatch(updateCurrentPage(data));
    },
    applySelectedAction() {
        return dispatch(applySelectedFilter());
    },
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(VideoManagement));
