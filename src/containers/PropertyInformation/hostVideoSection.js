import React, { PropTypes } from 'react';
import c from 'classnames';
import { FormattedMessage } from 'react-intl';
import { FlatButton } from 'material-ui';
import {
    RECOMMENDED_VIDEO_TIPS_URL,
    HOST_VIDEO_CATEGORIES,
    PROPERTY_CONTENT,
    PROPERTY_CONTENT_VIDEO,
} from '../../constants';
import classes from './styles.scss';

export default function HostVideoSection(props) {
    const {
        hostVideo,
        previewContent,
        selectVideoData,
        dataIndex,
        addSnapshot,
        deleteSnapShot,
        deleteVideo,
        showSlideDeleteInfo,
        showVideoDeleteInfo,
    } = props;
    const { hostVideoTypeId: currentId, contentGroup } = hostVideo;
    const TipsUrl = `${RECOMMENDED_VIDEO_TIPS_URL}${HOST_VIDEO_CATEGORIES[currentId]}`;
    const isSlide = contentGroup === PROPERTY_CONTENT;
    const isVideo = contentGroup === PROPERTY_CONTENT_VIDEO;
    return (
      <section
        className={classes.videoCategoryItem}
      >
        <h3>
          {hostVideo.hostVideoTypeName}
        </h3>
        <div
          className={classes.videoCategoryItemContent}
        >
          <figure className={classes.thumbnailContainer}>
            <img
              src={hostVideo.thumbnailUrl || hostVideo.sampleHostVideoThumbnailUrl}
              alt=""
            />
            <div className={classes.playContainerOverlay} />
            <div
              className={classes.playContainer}
              onClick={isSlide ? () => addSnapshot(hostVideo.hostVideoTypeName, currentId, isSlide) : () => previewContent(hostVideo)}
            >
              <i className={c('material-icons', classes.playIcon)}>
                play_arrow
              </i>
            </div>
            {
              hostVideo.thumbnailUrl || isSlide ? null : (
                <div className={classes.sampleContainer}>
                  <FormattedMessage id="sampleText" />
                </div>
              )
            }
          </figure>
          <div className={classes.videoUploadSection}>
            <div>
              { hostVideo.hostVideoInstruction ||
              (
                <FormattedMessage id={`hostVideoInstruction.${currentId}`} />
              )
              }
              <a
                href={TipsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FormattedMessage id="tipsText" />
              </a>
            </div>
            <div className={classes.buttonContainer}>
              <div className={classes.subButtons}>
                {
                  hostVideo.videoUploaded ? (
                    <div className={classes.videoUploadStatus}>
                      <figure className={classes.chart} data-percent="75">
                        <figcaption />
                        <svg width="50" height="50">
                          <circle cx="25" cy="25" r="21" transform="rotate(-90, 25, 25)" />
                        </svg>
                      </figure>
                      <div className={classes.videoUploadStatusText}>
                        <FormattedMessage id="videoStaus" />
                      </div>
                    </div>
                  ) : (
                    isSlide ? (
                      <FlatButton
                        label={<FormattedMessage id="addVideo" />}
                        icon={<i className="material-icons">add</i>}
                        onTouchTap={showSlideDeleteInfo}
                        className={classes.uploadButtonWrapper}
                        primary
                      />
                    ) : (
                      <FlatButton
                        label={
                          <FormattedMessage
                            id={((isVideo)) ? 'editVideo' : 'addVideo'}
                          />
                        }
                        icon={
                          <i className="material-icons">
                            {(isVideo) ? 'edit' : 'add'}
                          </i>
                        }
                        className={classes.uploadButtonWrapper}
                        containerElement="label"
                        primary
                      >
                        <input
                          type="file"
                          className={classes.hideButton}
                          onChange={
                       e => selectVideoData(e, currentId, dataIndex)
                       }
                        />
                      </FlatButton>
                    )
                  )
                }
                {
                  (isVideo) ? (
                    <FlatButton
                      primary
                      label={<FormattedMessage id="delVideo" />}
                      icon={<i className="material-icons">delete</i>}
                      className={classes.uploadButtonWrapper}
                      hoverColor="#148fe0"
                      onClick={() => deleteVideo(currentId)}
                    />
                  ) : null
                }
              </div>
              <div className={classes.orTextSection}>
                <FormattedMessage id="or" />
              </div>
              <div className={classes.subButtons}>
                {
                  ((isVideo)) ? (
                    <FlatButton
                      label={<FormattedMessage id="addSlide" />}
                      icon={<i className="material-icons">add</i>}
                      onTouchTap={showVideoDeleteInfo}
                      className={classes.uploadButtonWrapper}
                      primary
                    />
                  ) :
                    (
                      <FlatButton
                        primary
                        label={
                          <FormattedMessage
                            id={isSlide ? 'editSlide' : 'addSlide'}
                          />
                        }
                        icon={
                          <i className="material-icons">
                            {isSlide ? 'edit' : 'add'}
                          </i>
                        }
                        className={classes.uploadButtonWrapper}
                        hoverColor="#148fe0"
                        onClick={() => addSnapshot(hostVideo.hostVideoTypeName, currentId, isSlide)}
                      />
                    )
                }

                {
                  isSlide ? (
                    <FlatButton
                      primary
                      label={<FormattedMessage id="delSlide" />}
                      icon={<i className="material-icons">delete</i>}
                      className={classes.uploadButtonWrapper}
                      hoverColor="#148fe0"
                      onClick={() => deleteSnapShot(currentId)}
                    />
                  ) : null
                }
              </div>
            </div>
            {
              hostVideo.showError ? (
                <div className={classes.videoUploadError}>
                  <FormattedMessage id="invalidSmallVideoUpload" />
                </div>
              ) : null
            }
          </div>
        </div>
      </section>
    );
}

HostVideoSection.propTypes = {
    previewContent: PropTypes.func.isRequired,
    selectVideoData: PropTypes.func.isRequired,
    showSlideDeleteInfo: PropTypes.func.isRequired,
    showVideoDeleteInfo: PropTypes.func.isRequired,
    addSnapshot: PropTypes.func.isRequired,
    deleteSnapShot: PropTypes.func.isRequired,
    deleteVideo: PropTypes.func.isRequired,
    hostVideo: PropTypes.object.isRequired,
    dataIndex: PropTypes.number.isRequired,
};
