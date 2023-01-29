import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import get from 'lodash/get';
import c from 'classnames';
import { FormattedMessage } from 'react-intl';
import PageBase from '../../components/PageBase';
import PropertyDetails from './PropertyDetails';
import RecommendedVideos from './recommendedVideos';
import HostVideos from '../../containers/PropertyInformation/hostVideos';
import PublishedProperty from './publishedPropertyStatic';
import PropertySnapshots from '../../components/PropertySnapshots';
import VideoDialog from '../VideoDialog';
import {
  uploadPropertyInformation,
  getRecommendedVideos,
  fetchVideoCategories, deletePropertySlides, fetchPropertySlides, getSlideTemplates,
} from '../../actions/async/propertyManagement';
import SlideDialog from '../../components/PropertySnapshots/SlideDialog';
import { fetchVideoData } from '../../actions/async/videoManagement';
import { createVideoData } from '../../actions/videoList';
import { clearPropertyData, clearPropertyHostVideos, fetchPropertyHostSlides } from '../../actions/propertyInformation';
import { RECOMMENDED_VIDEOS_SIZE, MINIMUM_VIDEOS_TO_SELECT } from '../../constants';
import classes from './styles.scss';

class PropertyContent extends Component {
    constructor(props) {
        super(props);
        const propertyId = parseInt(props.match.params.property, 10);
        const { propertyList, userLocation } = props;
        let currentProperty = {};
        if (propertyList.length && propertyId) {
            currentProperty = propertyList.find(x => x.id === propertyId);
        }
        let propertyInfo = {
            propertyName: get(currentProperty, 'propertyName', ''),
            id: get(currentProperty, 'id', 0),
            countryId: get(currentProperty, 'country', ''),
            stateId: get(currentProperty, 'state', ''),
            cityId: get(currentProperty, 'city', ''),
            streetAddress: get(currentProperty, 'streetAddress') || '',
            postalcode: get(currentProperty, 'postalcode') || '',
            latitude: get(currentProperty, 'latitude') || '',
            longitude: get(currentProperty, 'longitude') || '',
            isActive: get(currentProperty, 'isActive', true),
        };

        if (!propertyId && userLocation.isUserLocationValid) {
            propertyInfo = { ...propertyInfo, ...userLocation.location, postalcode: userLocation.location.postalCode || '' };
        }
        const recommendedVideoProp = propertyId ? { propertyId } : {};
        this.state = {
            currentBreadCrumId: 'addPropertyInfoTip',
            currentTitle: 'addPropertyInfoTip',
            currentStep: 0,
            propertyInfo,
            propertyId,
            recommendedVideoProp,
            hostVideoTypeId: 1,
            currentVideoId: '',
            showVideoDetails: false,
            showLoader: false,
            categoryIdFilter: null,
            minimumCriteria: null,
            errorMessage: '',
            showDialog: false,
            showHostVideos: true,
            slideDialogHeader: 'createVideo',
            slideDialogText: 'canNotCreateVideo',
            buttonText: 'gotItText',
            showRightButton: false,
            isSlide: false,
        };
        this.setMessageTimer = 0;
    }

    componentDidMount() {
        ReactTooltip.hide();
        const { history, isFormPageValid, resetPropertyData, userLocation, templateList, fetchTemplates } = this.props;
        const { userDeniedGeolocation, isUserLocationValid } = userLocation;
        const { propertyId } = this.state;
        if (!isFormPageValid) {
            history.push('/');
        } else if (!templateList.length) {
            fetchTemplates();
        }
        resetPropertyData(!!propertyId || (!userDeniedGeolocation && isUserLocationValid));
    }

    componentWillUnmount() {
        clearTimeout(this.setMessageTimer);
        this.props.clearPropertyInformation();
    }

    getPropertyDetails = (updatedPropertyInfo, updatedRecommendedVideoProp) => {
        const { propertyInfo, recommendedVideoProp } = this.state;
        this.setState({
            propertyInfo: { ...propertyInfo, ...updatedPropertyInfo },
            recommendedVideoProp: { ...recommendedVideoProp, ...updatedRecommendedVideoProp },
            showLoader: true,
            currentStep: 1,
        }, () => {
            this.props.getVideoCategories(updatedRecommendedVideoProp).then(() => {
                this.loadRecommendedVideos(null, true);
            });
        });
    }

    loadPropertyDetails = () => {
        this.setState({
            currentStep: 0,
            errorMessage: '',
            minimumCriteria: null,
        });
    }

    loadRecommendedVideos = (categoryIdFilter = null, propertyLocationChanged = false, pageNumber = 1) => {
        const { recommendedVideoProp } = this.state;
        const { videoCategories } = this.props;
        this.setState({ showLoader: true, categoryIdFilter });
        const pageVideoSize = categoryIdFilter ?
            RECOMMENDED_VIDEOS_SIZE :
            Math.floor(RECOMMENDED_VIDEOS_SIZE / (videoCategories.length - 1 || 1));
        this.props.getRecommended(
            { ...recommendedVideoProp, categoryIdFilter },
            pageVideoSize,
            pageNumber,
            propertyLocationChanged,
        ).then(() => {
            this.setState({ showLoader: false });
        });
    };
    reloadRecommendedVideos = () => {
        this.props.clearPropertyInformation();
        this.setState({ currentStep: 1 }, () => this.loadRecommendedVideos(null, true));
    };
    publishProperty = () => {
        this.setState({
            currentStep: 3,
        });
    };
    previewContent = id => {
        ReactTooltip.hide();
        const { currentVideoId } = this.state;
        const { getVideoContent, updateVideoContent } = this.props;
        if (currentVideoId !== id) {
            updateVideoContent();
            getVideoContent(id);
            this.setState({ currentVideoId: id });
        }
        this.setState({ showVideoDetails: true });
    };

    closePreviewContent = () => {
        this.setState({ showVideoDetails: false });
    };

    countUnselectedVideos = (videosLength, unSelected, unSelectedRecordCount) => {
        if (!videosLength) return null;
        let videosUnselected = 0;
        let videosReselected = 0;
        Object.keys(unSelected).forEach(videoIndex => {
            if (!unSelected[videoIndex].actionFlag) {
                videosUnselected += 1;
            } else {
                videosReselected += 1;
            }
        });
        if (videosLength < MINIMUM_VIDEOS_TO_SELECT) {
            if (videosUnselected) {
                return videosLength;
            }
            return null;
        } else if ((videosLength - unSelectedRecordCount - videosUnselected + videosReselected) < MINIMUM_VIDEOS_TO_SELECT) {
            return MINIMUM_VIDEOS_TO_SELECT;
        }
        return null;
    };

    updatePropertyDetails = () => {
        const { totalRecommendedVideos, hashRecommended, unSelectedRecordCount } = this.props;
        clearTimeout(this.setMessageTimer);
        const minimumCriteria = this.countUnselectedVideos(totalRecommendedVideos, hashRecommended, unSelectedRecordCount);
        if (minimumCriteria) {
            this.setState({ errorMessage: 'noPropertyVideosError', minimumCriteria });
            window.scrollTo(0, 0);
            this.setMessageTimer = setTimeout(() => this.setState({ errorMessage: '', minimumCriteria: null }), 10000);
        } else {
            this.updatePropertyInfo();
        }
    };


    updatePropertyInfo = () => {
        const {
            cityId,
            countryId,
            id,
            isActive,
            propertyName,
            stateId,
            streetAddress,
            latitude,
            longitude,
            postalcode,
        } = this.state.propertyInfo;
        const { uploadPropertyData, hashRecommended } = this.props;

        this.setState({ showLoader: true });

        const propertyContentItemActionList = [];
        Object.keys(hashRecommended).forEach(videoData => {
            propertyContentItemActionList.push(hashRecommended[videoData]);
        });

        uploadPropertyData({
            cityId,
            countryId,
            id,
            isActive,
            propertyName,
            stateId,
            streetAddress,
            latitude,
            longitude,
            postalcode,
            propertyContentItemActionList,
        }).then(response => {
            if (response.status === 200) {
                const propertyId = response.data.id;
                const updatedPropertyInfo = { ...this.state.propertyInfo, id: propertyId };
                const updatedRecommendedVideoProp = { ...this.state.recommendedVideoProp, propertyId };
                this.setState({
                    currentStep: 2,
                    propertyInfo: updatedPropertyInfo,
                    propertyId,
                    recommendedVideoProp: updatedRecommendedVideoProp,
                });
            } else if (response.error.response) {
                this.setState({ errorMessage: response.error.response.data.message, showLoader: false });
            } else {
                this.setState({ errorMessage: 'apiError', showLoader: false });
            }
        });
    };
    showSlideDeleteInfo = () => {
        this.setState({
            showDialog: true,
            slideDialogHeader: 'createVideo',
            slideDialogText: 'canNotCreateVideo',
            buttonText: 'gotItText',
            showRightButton: false,
        });
    };
    showVideoDeleteInfo = () => {
        this.setState({
            showDialog: true,
            slideDialogHeader: 'createSlide',
            slideDialogText: 'canNotCreateSlide',
            buttonText: 'gotItText',
            showRightButton: false,
        });
    };
    shouldDeleteSlides = hostVideoTypeId => {
        this.setState({
            showDialog: true,
            hostVideoTypeId,
            slideDialogHeader: 'delSlide',
            slideDialogText: 'doNotDeleteSlide',
            buttonText: 'cancel',
            showRightButton: true,
            isSlide: true,
        });
    };
    shouldDeleteVideos = hostVideoTypeId => {
        this.setState({
            showDialog: true,
            hostVideoTypeId,
            slideDialogHeader: 'delVideo',
            slideDialogText: 'doNotDeleteVideo',
            buttonText: 'cancel',
            showRightButton: true,
            isSlide: false,
        });
    };

    confirmDeleteSlides = () => {
        const { propertyInfo, hostVideoTypeId } = this.state;
        const { removePropertySlides } = this.props;
        this.setState({ showDialog: false, showLoader: true });
        removePropertySlides(propertyInfo.id, hostVideoTypeId).then(() => {
            this.toggleLoader(false);
        });
    };

    addSlideInfo = (currentTitle, hostVideoTypeId, loadSlides) => {
        if (loadSlides) {
            this.toggleLoader(true);
            this.props.getPropertySlides(this.state.propertyInfo.id, hostVideoTypeId).then(() => {
                this.setState({
                    showLoader: false,
                    currentBreadCrumId: 'addPropertySlide',
                    currentTitle,
                    showHostVideos: false,
                    hostVideoTypeId,
                });
            });
        } else {
            this.props.createPropertySlides();
            this.setState({
                currentBreadCrumId: 'addPropertySlide',
                currentTitle,
                showHostVideos: false,
                hostVideoTypeId });
        }
    };

    closeDialog = () => {
        this.setState({ showDialog: false });
    };
    toggleLoader = showLoader => {
        this.setState({ showLoader });
    };
    exitSlideInfo = () => {
        this.setState({
            currentBreadCrumId: 'addPropertyInfoTip',
            currentTitle: 'addPropertyInfoTip',
            showHostVideos: true });
    };
    loadCurrentContent = () => {
        const { currentStep, propertyId, propertyInfo, showLoader, categoryIdFilter, hostVideoTypeId } = this.state;
        switch (currentStep) {
        case 0:
            return (
              <PropertyDetails
                propertyInfo={propertyInfo}
                getPropertyDetails={this.getPropertyDetails}
              />
            );
        case 1:
            return (
              <RecommendedVideos
                showLoader={showLoader}
                categoryIdFilter={categoryIdFilter}
                fetchVideos={this.loadRecommendedVideos}
                loadPropertyDetails={this.loadPropertyDetails}
                previewContent={this.previewContent}
                uploadPropertyData={this.updatePropertyDetails}
                showAccurateWarning={propertyInfo.streetAddress}
              />
            );
        case 2:
            return (
              this.state.showHostVideos ?
                <HostVideos
                  showLoader={showLoader}
                  propertyId={propertyId}
                  reloadRecommendedVideos={this.reloadRecommendedVideos}
                  publishProperty={this.publishProperty}
                  currentStep={currentStep}
                  addSnapshot={this.addSlideInfo}
                  toggleLoader={this.toggleLoader}
                  showSlideDeleteInfo={this.showSlideDeleteInfo}
                  showVideoDeleteInfo={this.showVideoDeleteInfo}
                  deleteSlides={this.shouldDeleteSlides}
                  deleteVideos={this.shouldDeleteVideos}
                />
              : (
                <PropertySnapshots
                  exitSlideInfo={this.exitSlideInfo}
                  hostVideoTypeId={hostVideoTypeId}
                  propertyId={propertyInfo.id}
                />
                )
            );

        case 3:
            return (
              <PublishedProperty propertyId={propertyId} />
            );
        default: return null;
        }
    };

    render() {
        const {
          showDialog,
          slideDialogHeader,
          slideDialogText,
          buttonText,
          showRightButton,
          showVideoDetails,
          currentStep,
          errorMessage,
          minimumCriteria,
        } = this.state;

        const content = this.loadCurrentContent();
        return (
          <PageBase
            navigation={<span />}
            minHeight={300}
          >
            <div className={classes.propertyBreadCrum}>
              <div className={c(classes.detailsContent, { [classes.detailsContentDone]: currentStep })}>
                <span />
                <div className={classes.lineHoriontal} />
                Add Property Details
              </div>
              <div
                className={c(classes.videosContent, { [classes.videosContentActive]: (currentStep === 1), [classes.videosContentDone]: (currentStep > 1) })}
              >
                <span />
                <div className={classes.lineHoriontal} />
                Add Recommended Videos
              </div>
              <div
                className={c(classes.hostVideosContent, { [classes.hostVideosContentActive]: (currentStep === 2), [classes.hostVideosContentDone]: (currentStep > 2) })}
              >
                <span />
                Add Host Info
              </div>

            </div>
            {
              !!errorMessage && (
                <p className={classes.errorMessage}>
                  <FormattedMessage id={errorMessage} defaultMessage={errorMessage} values={{ minimumCriteria }} />
                </p>
              )
            }
            {content}
            <VideoDialog
              showVideoDetails={showVideoDetails}
              closeVideoModal={this.closePreviewContent}
            />
            <SlideDialog
              showSlideDialog={showDialog}
              headerText={slideDialogHeader}
              slideDialogText={slideDialogText}
              buttonText={buttonText}
              showRightButton={showRightButton}
              handleCloseDialog={this.closeDialog}
              rightButtonCallBack={this.confirmDeleteSlides}
              rightButtonText={this.state.isSlide ? 'delSlide' : 'delVideo'}
            />
          </PageBase>
        );
    }
}

PropertyContent.propTypes = {
    propertyList: PropTypes.array.isRequired,
    videoCategories: PropTypes.array.isRequired,
    totalRecommendedVideos: PropTypes.number.isRequired,
    hashRecommended: PropTypes.object.isRequired,
    isFormPageValid: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.object.isRequired,
    uploadPropertyData: PropTypes.func.isRequired,
    getVideoContent: PropTypes.func.isRequired,
    updateVideoContent: PropTypes.func.isRequired,
    getRecommended: PropTypes.func.isRequired,
    getVideoCategories: PropTypes.func.isRequired,
    resetPropertyData: PropTypes.func.isRequired,
    unSelectedRecordCount: PropTypes.number.isRequired,
    userLocation: PropTypes.object.isRequired,
    removePropertySlides: PropTypes.func.isRequired,
    getPropertySlides: PropTypes.func.isRequired,
    createPropertySlides: PropTypes.func.isRequired,
    clearPropertyInformation: PropTypes.func.isRequired,
    templateList: PropTypes.array.isRequired,
    fetchTemplates: PropTypes.func.isRequired,
};

const mapStateToProps = reduxState => ({
    propertyList: reduxState.propertyInformation.propertyList,
    videoCategories: reduxState.propertyInformation.videoCategories,
    isFormPageValid: reduxState.runtimeSettings.isFormPageValid,
    totalRecommendedVideos: reduxState.propertyInformation.totalRecommendedVideos,
    hashRecommended: reduxState.propertyInformation.hashRecommended,
    unSelectedRecordCount: reduxState.propertyInformation.unSelectedRecordCount,
    userLocation: reduxState.runtimeSettings.userLocation,
    templateList: reduxState.propertyInformation.templateList,

});

const mapDispatchToProps = dispatch => ({
    uploadPropertyData(data) {
        return dispatch(uploadPropertyInformation(data));
    },
    getVideoContent(id) {
        dispatch(fetchVideoData(id));
    },
    updateVideoContent() {
        dispatch(createVideoData({}));
    },
    getRecommended(data, records, pageNumber, propertyLocationChanged) {
        return dispatch(getRecommendedVideos(data, records, pageNumber, propertyLocationChanged));
    },
    getVideoCategories(data) {
        return dispatch(fetchVideoCategories(data));
    },
    resetPropertyData(loading) {
        dispatch(clearPropertyData(loading));
    },
    removePropertySlides: (id, contentId) => dispatch(deletePropertySlides(id, contentId)),
    getPropertySlides: (id, contentId) => dispatch(fetchPropertySlides(id, contentId)),
    createPropertySlides: (id, contentId) => dispatch(fetchPropertyHostSlides(id, contentId)),
    clearPropertyInformation: () => dispatch(clearPropertyHostVideos()),
    fetchTemplates: () => dispatch(getSlideTemplates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyContent);
