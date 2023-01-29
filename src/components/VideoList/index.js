import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import c from 'classnames';
import { Dialog, FontIcon } from 'material-ui';
import { USER_TYPE } from '../../constants';
import { fetchVideoData, getUpdatedActions, transcodeVideo } from '../../actions/async/videoManagement';
import { createVideoData } from '../../actions/videoList';
import { updateVideoData, updateVideoThumbnailId } from '../../actions/runTimeSettings';
import ContentSearch from '../../components/ContentSearch';
import ThumbnailManagement from '../../components/ThumbnailDialog';
import TrancodeDialog from '../../components/TrancodeDialog';
import VideoSearch from './VideoSearch';
import VideoItem from './VideoItem';
import VideoDialog from '../VideoDialog';
import DownloadUrl from '../DownloadUrl';
import LoadingIndicator from '../LoadingIndicator';
import classes from './styles.scss';
import styles from './styles';

class VideoList extends Component {
    constructor() {
        super();
        this.state = {
            showVideoDetails: false,
            openDownloadUrlDialog: false,
            currentVideoId: '',
            openDialog: false,
            showLoader: false,
            transcodeExecutionFlag: false,
            trancodeDialog: false,
            currentVideoIndex: 0,
            messageToShow: '',
            errorClass: false,
            holdScreen: false,
        };
        this.setMessageTimer = 0;
        this.holdScreenTimer = 0;
        this.openVideoModal = this.openVideoModal.bind(this);
        this.closeVideoModal = this.closeVideoModal.bind(this);
        this.openDownloadDialog = this.openDownloadDialog.bind(this);
        this.closeDownloadDialog = this.closeDownloadDialog.bind(this);
        this.actionHandler = this.actionHandler.bind(this);
        this.initiateVideoTranscode = this.initiateVideoTranscode.bind(this);
        this.initiateVideoAction = this.initiateVideoAction.bind(this);
        this.editVideoContent = this.editVideoContent.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleTranscodeDialog = this.handleTranscodeDialog.bind(this);
        this.openThumbnailDialog = this.openThumbnailDialog.bind(this);
        this.resetResponseMessage = this.resetResponseMessage.bind(this);
        this.handleCloseDialogOnSubmit = this.handleCloseDialogOnSubmit.bind(this);
        this.showNotification = this.showNotification.bind(this);
        this.holdVideoScreen = this.holdVideoScreen.bind(this);
        this.dataToServer = {};
    }

    componentWillUnmount() {
        clearTimeout(this.setMessageTimer);
        clearTimeout(this.holdScreenTimer);
    }

    openVideoModal(id) {
        const { currentVideoId, holdScreen } = this.state;
        const { getVideoContent, updateVideoContent } = this.props;
        if (!holdScreen) {
            if (currentVideoId !== id) {
                updateVideoContent();
                getVideoContent(id);
                this.setState({ currentVideoId: id });
            }
            this.setState({ showVideoDetails: true });
        }
    }

    closeVideoModal() {
        this.setState({ showVideoDetails: false });
    }

    openDownloadDialog(currentVideoId) {
        this.setState({ openDownloadUrlDialog: true, currentVideoId });
    }

    closeDownloadDialog() {
        this.setState({ openDownloadUrlDialog: false });
    }

    editVideoContent(id) {
        this.props.editVideoData(id);
        this.props.history.push('/videoUpload');
    }

    openThumbnailDialog(keyIndex) {
        const { videosBlocked, changeThumbnailId } = this.props;
        if (videosBlocked.indexOf(keyIndex) > -1) {
            clearTimeout(this.setMessageTimer);
            this.setState({ messageToShow: 'blocedVideoOpen', errorClass: false });
            window.scrollTo(0, 0);
            this.setMessageTimer = setTimeout(() => this.setState({ messageToShow: '', errorClass: false }), 10000);
        } else {
            changeThumbnailId(keyIndex);
            this.setState({ openDialog: true });
        }
    }

    handleCloseDialog() {
        this.setState({ openDialog: false, holdScreen: true });
        this.holdScreenTimer = setTimeout(() => this.setState({ holdScreen: false }), 100);
    }


    handleCloseDialogOnSubmit(message) {
        const messageToShow = message || 'thumbnailUploadInProgress';
        if (message) {
            this.props.reloadPage();
        }
        window.scrollTo(0, 0);
        this.setState({ openDialog: false, messageToShow, errorClass: message !== 'blocedVideoOpen', holdScreen: true });
        clearTimeout(this.setMessageTimer);
        this.setMessageTimer = setTimeout(() => this.setState({ messageToShow: '', errorClass: false }), 10000);
        this.holdScreenTimer = setTimeout(() => this.setState({ holdScreen: false }), 100);
    }

    actionHandler(data, videoIndex, trancodeDialog) {
        const { contentId, action } = data;
        this.dataToServer = { contentId, nextState: data.action };
        window.scrollTo(0, 0);
        this.setState({ currentVideoIndex: videoIndex }, () => {
            switch (action) {
            case 'TRANSCODE_IN_PROGRESS':
                this.initiateVideoTranscode(contentId, videoIndex);
                break;
            case 'PUBLISH':
                if (trancodeDialog) {
                    this.setState({ trancodeDialog: true });
                } else {
                    this.initiateVideoAction();
                }
                break;
            default: this.initiateVideoAction();
            }
        });
    }

    initiateVideoTranscode(contentId, videoIndex) {
        this.setState({ showLoader: true });
        this.props.initiateTranscode(contentId, videoIndex).then(
            responseMessage => {
                const messageToShow = responseMessage || 'apiError';
                const errorClass = responseMessage;
                this.dataToServer = {};
                this.setState({ showLoader: false, messageToShow, errorClass });
                clearTimeout(this.setMessageTimer);
                this.setMessageTimer = setTimeout(() => this.setState({ messageToShow: '', errorClass: false }), 10000);
            });
    }

    initiateVideoAction() {
        this.setState({ showLoader: true });
        const { transcodeExecutionFlag, currentVideoIndex } = this.state;
        const data = this.dataToServer;
        const dataToServer = { ...data, transcodeExecutionFlag };
        this.props.performAction(dataToServer, currentVideoIndex).then(
            responseMessage => {
                const messageToShow = responseMessage || 'apiError';
                const errorClass = responseMessage;
                this.dataToServer = {};
                this.setState({ showLoader: false, transcodeExecutionFlag: false, messageToShow, errorClass });
                clearTimeout(this.setMessageTimer);
                this.setMessageTimer = setTimeout(() => this.setState({ messageToShow: '', errorClass: false }), 10000);
            });
    }

    handleTranscodeDialog(transcodeExecutionFlag) {
        this.setState({ trancodeDialog: false, transcodeExecutionFlag }, () => {
            this.initiateVideoAction();
        });
    }

    resetResponseMessage() {
        clearTimeout(this.setMessageTimer);
        this.setState({ messageToShow: '', errorClass: false });
    }

    showNotification(messageToShow, errorClass) {
        clearTimeout(this.setMessageTimer);
        this.setState({ messageToShow, errorClass });
        this.setMessageTimer = setTimeout(() => this.setState({ messageToShow: '', errorClass: false }), 10000);
    }

    holdVideoScreen() {
        clearTimeout(this.holdScreenTimer);
        this.setState({ holdScreen: true });
        this.holdScreenTimer = setTimeout(() => this.setState({ holdScreen: false }), 100);
    }

    render() {
        const { videos, thumbnailVideoId, userRole, updateElasticSearch, videoResult } = this.props;
        const {
            showVideoDetails,
            openDialog,
            showLoader,
            trancodeDialog,
            messageToShow,
            errorClass,
            openDownloadUrlDialog,
            currentVideoId,
        } = this.state;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const reponseClass = errorClass ? classes.success : classes.failure;
        const disableDownload = (userRole === USER_TYPE.GUEST || userRole === USER_TYPE.HOST);
        return (
          <div className={classes.videoContainer}>
            {loadingIndicator}
            {
              messageToShow ?
                (
                  <div className={c(classes.videoActionResponse, reponseClass)}>
                    <FormattedMessage id={messageToShow} defaultMessage={messageToShow} />
                  </div>
                ) :
                null
            }
            <VideoSearch videoResult={videoResult} />
            <ContentSearch
              updateElasticSearch={updateElasticSearch}
              showNotification={this.showNotification}
              holdVideoScreen={this.holdVideoScreen}
            />
            <div className="row">
              {videos && videos.map((video, index) => (
                <VideoItem
                  key={`${video.name}_${video.cid}_${index}`}
                  arrayIndex={index}
                  contentId={video.cid}
                  name={video.name}
                  status={video.status || ''}
                  thumbnailUrl={video.thumbnailUrl}
                  actions={video.actions || []}
                  openModal={this.openVideoModal}
                  editVideoContent={this.editVideoContent}
                  openThumbnailDialog={this.openThumbnailDialog}
                  actionHandler={this.actionHandler}
                  resetResponseMessage={this.resetResponseMessage}
                  openDownloadDialog={this.openDownloadDialog}
                  disableDownload={disableDownload}
                  isDownloadable={video.isDownloadable}
                  showThumbnailButton={video.status !== 'ERROR IN UPLOAD'}
                />
              ))}
            </div>
            {(openDialog) ?
              <ThumbnailManagement
                openDialog={openDialog}
                handleCloseDialog={this.handleCloseDialog}
                handleCloseDialogOnSubmit={this.handleCloseDialogOnSubmit}
                videoId={thumbnailVideoId}
              /> :
              null
            }
            {(trancodeDialog) ?
              <TrancodeDialog
                openDialog={trancodeDialog}
                handleCloseDialog={this.handleTranscodeDialog}
              /> :
              null
            }
            <Dialog
              title={
                <h3>
                  <FormattedMessage id="downloadUrls" />
                  <FontIcon
                    className="material-icons"
                    style={styles.closeButton}
                    onClick={this.closeDownloadDialog}
                  >
                    cancel
                  </FontIcon>
                </h3>
              }
              open={openDownloadUrlDialog}
              onRequestClose={this.closeDownloadDialog}
              autoScrollBodyContent
            >
              <DownloadUrl
                contentId={currentVideoId}
              />
            </Dialog>
            <VideoDialog
              showVideoDetails={showVideoDetails}
              closeVideoModal={this.closeVideoModal}
            />
          </div>
        );
    }
}
VideoList.defaultProps = {
    videos: [],
};

VideoList.propTypes = {
    videos: PropTypes.array,
    videosBlocked: PropTypes.array.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    getVideoContent: PropTypes.func.isRequired,
    updateVideoContent: PropTypes.func.isRequired,
    performAction: PropTypes.func.isRequired,
    editVideoData: PropTypes.func.isRequired,
    changeThumbnailId: PropTypes.func.isRequired,
    initiateTranscode: PropTypes.func.isRequired,
    reloadPage: PropTypes.func.isRequired,
    updateElasticSearch: PropTypes.func.isRequired,
    videoResult: PropTypes.func.isRequired,
    thumbnailVideoId: PropTypes.number.isRequired,
    userRole: PropTypes.string.isRequired,
};

const mapStateToProps = reduxState => ({
    videos: reduxState.videoList.allVideos,
    videosBlocked: reduxState.videoList.videosBlocked,
    thumbnailVideoId: reduxState.runtimeSettings.thumbnailVideoId,
    userRole: reduxState.userDashboard.dashboard.role,
});

const mapDispatchToProps = dispatch => ({
    getVideoContent(id) {
        dispatch(fetchVideoData(id));
    },
    updateVideoContent() {
        dispatch(createVideoData({}));
    },
    editVideoData(id) {
        dispatch(updateVideoData(id));
    },
    changeThumbnailId(data) {
        dispatch(updateVideoThumbnailId(data));
    },
    performAction(bodyObject, videoIndex) {
        return dispatch(getUpdatedActions(bodyObject, videoIndex));
    },
    initiateTranscode(contentId, videoIndex) {
        return dispatch(transcodeVideo(contentId, videoIndex));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoList));
