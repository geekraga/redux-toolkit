import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import pick from 'lodash/pick';
import ReactTooltip from 'react-tooltip';
import ReactGA from 'react-ga';
import PageBase from '../../components/PageBase';
import LoadingIndicator from '../../components/LoadingIndicator';
import ContentDetails from '../../components/VideoUploadComponents/ContentDetails';
import VideoGeoLocation from '../../components/VideoUploadComponents/VideoGeoLocation';
import TagUploadComponent from '../../components/VideoUploadComponents/TagUploadComponent';
import VideoUploadConfirmation from '../../components/VideoUploadComponents/VideoUploadConfirmation';
import { fetchVideoUploadedData, fetchLanguages, fetchContentType } from '../../actions/async/videoUpload';
import { fetchCountryList, fetchStateList, fetchRegionList } from '../../actions/async/location';
import { updateCurrentPage, updateVideoData, emptyLocalInfoData, resetLocalInfo } from '../../actions/runTimeSettings';
import { PAGES } from '../../constants';
import classes from './styles.scss';

class VideoUploader extends Component {
    state = {
        currentStep: 0,
        showLoader: true,
        confirmationMsg: '',
    };

    componentWillMount() {
        const { videoToUpdate, getStateList, getRegionList } = this.props;
        ReactTooltip.hide();
        this.props.getLanguages();
        this.props.getCountryList();
        this.props.getContentType();
        this.props.getUploadedData(videoToUpdate).then(
            res => {
                if (res.status === 200) {
                    if (res.data && res.data.stateId) {
                        getStateList(res.data.countryId);
                        getRegionList(res.data.stateId);
                    }
                }
                this.setState({ showLoader: false });
            });
    }

    componentDidMount() {
        this.props.updateCurrentComponent(PAGES.VIDEOUPLOAD);
        window.scrollTo(0, 0);
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
    }

    componentWillUnmount() {
        this.props.resetVideoToUpdate(0);
        this.props.emptyLocalInfo();
    }

    resetUploader = () => {
        this.props.resetLocalInfo();
        this.setState({ currentStep: 0 });
    }

    loadPrevious = () => {
        this.setState({ currentStep: this.state.currentStep - 1 });
    }

    loadNext = (confirmationMsg = '') => {
        this.setState({ currentStep: this.state.currentStep + 1, confirmationMsg });
    }

    loadCurrentContent = (videoData, userRole) => {
        const { currentStep, confirmationMsg } = this.state;
        const { videoContentGroup, videoToUpdate } = this.props;
        const geoData = pick(videoData, [
            'source',
            'neighborhood',
            'credits',
            'postalcode',
            'latitude',
            'longitude',
            'countryId',
            'stateId',
            'cityId',
            'license',
            'rights',
            'address',
            'contentTypeId',
        ]);
        geoData.address = videoData.address || '';
        geoData.copyright = videoData.copyright || '';
        geoData.expiryDate = videoData.expiryDate || '';
        geoData.startDate = videoData.startDate || '';
        geoData.regionId = videoData.regionId || 0;

        switch (currentStep) {
        case 0:
            return (
              <ContentDetails
                loadNext={this.loadNext}
                videoToUpdate={videoToUpdate}
              />
            );
        case 1:
            return (
              <VideoGeoLocation
                loadPrevious={this.loadPrevious}
                loadNext={this.loadNext}
                geoData={geoData}
                userRole={userRole}
                videoContentGroup={videoContentGroup}
              />
            );
        case 2:
            return (
              <TagUploadComponent
                userRole={userRole}
                loadPrevious={this.loadPrevious}
                loadNext={this.loadNext}
              />
            );
        case 3:
            return (
              <VideoUploadConfirmation
                resetUploader={this.resetUploader}
                confirmationMsg={confirmationMsg}
                videoToUpdate={videoToUpdate}
              />
            );
        default: return null;
        }
    }

    render() {
        const { showLoader } = this.state;
        const { videoData, userRole, videoTitle } = this.props;
        const content = showLoader ? <LoadingIndicator /> : this.loadCurrentContent(videoData, userRole);
        const pageTitle = (<span><FormattedMessage id="videoUpload" />
          {
            videoTitle ? (<span className={classes.videoTitleMain}>
            - {videoTitle}
            </span>) : null
          }
        </span>);

        return (
          <div className={classes.videoContainer}>
            <PageBase
              title={pageTitle}
              navigation={<FormattedMessage id="breadCrumbs.videoUpload" />}
              minHeight={300}
            >
              {content}
            </PageBase>
          </div>

        );
    }
}

VideoUploader.defaultProps = {
    videoContentGroup: [],
};

VideoUploader.propTypes = {
    getUploadedData: PropTypes.func.isRequired,
    getLanguages: PropTypes.func.isRequired,
    getContentType: PropTypes.func.isRequired,
    updateCurrentComponent: PropTypes.func.isRequired,
    resetVideoToUpdate: PropTypes.func.isRequired,
    emptyLocalInfo: PropTypes.func.isRequired,
    resetLocalInfo: PropTypes.func.isRequired,
    getStateList: PropTypes.func.isRequired,
    getRegionList: PropTypes.func.isRequired,
    videoData: PropTypes.object.isRequired,
    userRole: PropTypes.string.isRequired,
    videoToUpdate: PropTypes.number.isRequired,
    videoContentGroup: PropTypes.array,
    getCountryList: PropTypes.func.isRequired,
    videoTitle: PropTypes.string.isRequired,
};

const mapStateToProps = reduxState => ({
    videoData: reduxState.runtimeSettings.videoData,
    videoTitle: reduxState.runtimeSettings.defaultVideoTitle,
    videoContentGroup: reduxState.runtimeSettings.videoContentGroup,
    videoToUpdate: reduxState.runtimeSettings.videoToUpdate,
    userRole: reduxState.userDashboard.dashboard.role,
});

const mapDispatchToProps = dispatch => ({
    getLanguages() {
        dispatch(fetchLanguages());
    },
    getContentType() {
        dispatch(fetchContentType());
    },
    getUploadedData(videoToUpdate) {
        return dispatch(fetchVideoUploadedData(videoToUpdate));
    },
    updateCurrentComponent(data) {
        return dispatch(updateCurrentPage(data));
    },
    resetVideoToUpdate(id) {
        dispatch(updateVideoData(id));
    },
    emptyLocalInfo() {
        dispatch(emptyLocalInfoData());
    },
    resetLocalInfo() {
        dispatch(resetLocalInfo());
    },
    getStateList(countryId) {
        return dispatch(fetchStateList(countryId));
    },
    getRegionList(stateId) {
        return dispatch(fetchRegionList(stateId));
    },
    getCountryList() {
        dispatch(fetchCountryList());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoUploader);
