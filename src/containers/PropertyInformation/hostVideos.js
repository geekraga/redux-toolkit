import React, { Component, PropTypes } from 'react';
import c from 'classnames';
import { FormattedMessage } from 'react-intl';
import { LinearProgress, RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import moment from 'moment';
import AWS from 'aws-sdk';
import endpoints from '../../endpoints/videoContent';
import { getPropertyHostedVideos, uploadHostVideo } from '../../actions/async/propertyManagement';
import { updatePropertyHostVideos } from '../../actions/propertyInformation';
import { validateVideo } from '../../util/regexStorage';
import LoadingIndicator from '../../components/LoadingIndicator';
import VideoDialog from '../../components/PropertyFormPage/VideoDialog';
import HostVideoSection from './hostVideoSection';
import LinkItem from '../../components/LinkItem';
import styles from '../../components/VideoUploadComponents/TagUploadComponent/styles';
import classes from './styles.scss';

class HostVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showVideoDetails: false,
            uploadInProgress: false,
            currentVideoUrl: null,
            progressPercent: 0,
        };
    }

    componentDidMount() {
        const { propertyId, fetchPropertyInformation, propertyHostInfo, toggleLoader } = this.props;
        if (!propertyHostInfo.length) {
            fetchPropertyInformation(propertyId).then(() => {
                toggleLoader(false);
            });
        } else {
            toggleLoader(false);
        }
    }

    previewContent = item => {
        this.setState({
            showVideoDetails: true,
            currentVideoUrl: item.videoUrl || item.sampleHostVideoUrl,
        });
    };

    closeVideoModal = () => {
        this.setState({
            showVideoDetails: false,
            currentVideoUrl: null,
        });
    };

    selectVideoData = (event, hostVideoTypeId, dataIndex) => {
        const { updatePropertyInformation } = this.props;
        const uploadedFile = event.target.files[0];
        const streamFormat = uploadedFile ? uploadedFile.name.split('.').pop().toLowerCase() : null;
        const videoSize = uploadedFile ? uploadedFile.size : 0;
        if (streamFormat && validateVideo(streamFormat, videoSize)) {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(uploadedFile);
            video.onloadedmetadata = () => {
                if (video.duration < 120) {
                    this.uploadVideo(uploadedFile, streamFormat, hostVideoTypeId, dataIndex);
                } else {
                    updatePropertyInformation(dataIndex, true);
                }
            };
        } else {
            updatePropertyInformation(dataIndex, true);
        }
    };

    uploadVideo = (uploadedFile, streamFormat, hostVideoTypeId, dataIndex) => {
        const { propertyId, updatePropertyInformation } = this.props;
        const fileName = uploadedFile ? uploadedFile.name.split('.').shift().toLowerCase() : null;
        const url = `${fileName}_${moment().format('MMMMDoYYYYhmmssa')}.${streamFormat}`;
        const bucket = new AWS.S3(endpoints.BUCKET_DIR_PARAMS);
        const params = { Key: url, ContentType: streamFormat, Body: uploadedFile };
        const bodyObject = {
            propertyId,
            hostVideoContentDetail: {
                actionFlag: 1,
                hostVideoTypeId,
                url,
                streamFormat,
            },
        };
        this.setState({ uploadInProgress: true }, () => {
            bucket.upload(params).on('httpUploadProgress', evt => {
                const progressPercent = parseInt(((evt.loaded * 100) / evt.total), 10);
                this.setState({ progressPercent });
            }).send(() => {
                updatePropertyInformation(dataIndex, false, true);
                this.setState({ uploadInProgress: false, progressPercent: 0 });
                this.props.uploadContentVideo(bodyObject);
            });
        });
    };

    render() {
        const { showVideoDetails, currentVideoUrl, uploadInProgress, progressPercent } = this.state;
        const {
          showLoader,
          propertyHostInfo,
          addSnapshot,
          showSlideDeleteInfo,
          deleteSlides,
          deleteVideos,
          showVideoDeleteInfo,
          currentStep,
          reloadRecommendedVideos,
          publishProperty,
        } = this.props;
        const videoCategories = propertyHostInfo.map((hostVideo, index) => (
          <HostVideoSection
            key={hostVideo.hostVideoTypeName}
            previewContent={this.previewContent}
            selectVideoData={this.selectVideoData}
            deleteSnapShot={deleteSlides}
            deleteVideo={deleteVideos}
            showSlideDeleteInfo={showSlideDeleteInfo}
            showVideoDeleteInfo={showVideoDeleteInfo}
            dataIndex={index}
            hostVideo={hostVideo}
            addSnapshot={addSnapshot}
          />
        ));
        const renderBottomDiv = currentStep ?
          (<div className={c('col-xs-12', classes.propertyCreationButtons)}>
            <RaisedButton
              label={<FormattedMessage id="back" />}
              className={classes.cancelButtonLink}
              onClick={() => reloadRecommendedVideos()}
            />
            <RaisedButton
              label={<FormattedMessage id="publish" />}
              className={classes.btnSubDetails}
              onClick={publishProperty}
            />
          </div>)
          :
          (<div className="col-xs-12">
            <LinkItem to={'/'} linkClass={classes.backButton}>
              <FormattedMessage id="backButtonText" />
            </LinkItem>
          </div>);

        return (
          <div className={classes.propertyPublished}>
            {showLoader && <LoadingIndicator />}
            <h4>
              <FormattedMessage id="addPropertyVideos" />
            </h4>
            {videoCategories}
            <VideoDialog
              showVideoDetails={showVideoDetails}
              closeVideoModal={this.closeVideoModal}
              currentVideoUrl={currentVideoUrl}
            />
            {renderBottomDiv}
            {
              uploadInProgress ? (
                <div className={classes.progressContainerOuter}>
                  <div className={classes.progressContainerBackground}>
                    <LinearProgress
                      mode="determinate"
                      value={progressPercent}
                      style={styles.progressBar}
                      color={styles.progressBarColor}
                    />
                    <div className={classes.progressContent}>
                      {progressPercent}<FormattedMessage id="uploadPercent" />
                    </div>
                  </div>
                </div>
              ) : null
            }
          </div>
        );
    }
}

HostVideos.propTypes = {
    propertyHostInfo: PropTypes.array.isRequired,
    propertyId: PropTypes.number.isRequired,
    uploadContentVideo: PropTypes.func.isRequired,
    showSlideDeleteInfo: PropTypes.func.isRequired,
    showVideoDeleteInfo: PropTypes.func.isRequired,
    addSnapshot: PropTypes.func.isRequired,
    fetchPropertyInformation: PropTypes.func.isRequired,
    updatePropertyInformation: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    deleteSlides: PropTypes.func.isRequired,
    deleteVideos: PropTypes.func.isRequired,
    showLoader: PropTypes.bool.isRequired,
    currentStep: PropTypes.number.isRequired,
    reloadRecommendedVideos: PropTypes.func.isRequired,
    publishProperty: PropTypes.func.isRequired,

};
HostVideos.defaultProps = {
    toggleLoader: () => {},
    publishProperty: () => {},
    reloadRecommendedVideos: () => {},
    currentStep: 0,


};
const mapStateToProps = reduxState => ({
    propertyHostInfo: reduxState.propertyInformation.propertyHostInfo,

});

const mapDispatchToProps = dispatch => ({
    uploadContentVideo: data => dispatch(uploadHostVideo(data)),
    fetchPropertyInformation: id => dispatch(getPropertyHostedVideos(id)),
    updatePropertyInformation: (index, showError, videoUploaded) => dispatch(updatePropertyHostVideos(index, showError, videoUploaded)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HostVideos);
