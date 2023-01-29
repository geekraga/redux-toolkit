import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import c from 'classnames';
import { RaisedButton } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import LoadingIndicator from '../LoadingIndicator';
import { updateRecommendedVideos } from '../../actions/propertyInformation';
import { RECOMMENDED_VIDEO_FEEDBACK_URL, RECOMMENDED_VIDEOS_SIZE } from '../../constants';
import Pagination from '../Pagination';
import classes from './styles.scss';
import NoteIcon from '../../public/noteIcon.png';

class RecommendedVideos extends Component {
    constructor(props) {
        super(props);
        this.state = { page: 1, activeCategory: props.categoryIdFilter };
    }

    paginationSearch = page => {
        const { activeCategory } = this.state;
        this.props.fetchVideos(activeCategory, false, page);
        this.setState({ page });
    }

    updateVideos = activeCategory => {
        if (activeCategory !== this.props.categoryIdFilter) {
            this.setState({ activeCategory, page: 1 }, () => {
                this.props.fetchVideos(activeCategory);
            });
        }
    }

    loadCategories = () => {
        const { videoCategories, categoryIdFilter } = this.props;
        return (videoCategories.map(cat => (
          <div
            key={cat.name}
            onClick={() => this.updateVideos(cat.id)}
            className={c({ [classes.activeList]: (cat.id === categoryIdFilter) })}
          >
            {cat.name}
          </div>
        )));
    }

    loadVideoList = () => {
        const { recommendedVideoList, previewContent, updateVideo, showLoader, showAccurateWarning } = this.props;
        if (!recommendedVideoList.length && !showLoader) {
            return (
              <div className="row">
                <div className="col-xs-12">
                  <FormattedMessage id="noPropertyRecommendedVideos" />
                  <a
                    href={RECOMMENDED_VIDEO_FEEDBACK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.noRecommendedVideoLink}
                  >
                    <FormattedMessage id="feedback" />
                  </a>.
                </div>
              </div>
            );
        }
        return (
          <div className="row">
            {!showAccurateWarning ? (
              <div className={c('col-xs-12', classes.accurateAddressWarning)}>
                <img src={NoteIcon} alt="" />
                <FormattedMessage id="accurateAddressWarning" />
              </div>
            ) : null}
            {
              recommendedVideoList.map((list, index) => (
                <div
                  key={list.contentId}
                  className={c('col-xs-12 col-sm-4 col-md-3', classes.videoContentContainer)}
                >
                  <figure className={classes.thumbnailContainer}>
                    <img src={list.thumbnailUrl} alt="noImage" />
                    <div className={classes.playContainerOverlay} />
                    <div className={classes.playContainer} onClick={() => previewContent(list.contentId)}>
                      <i className={c('material-icons', classes.videoPlay)}>
                        play_arrow
                      </i>
                    </div>
                  </figure>
                  <div
                    className={c({ [classes.selectedVideo]: list.linkedContent }, classes.videoDetails)}
                    onClick={() => updateVideo(list, index)}
                  >
                    <i />
                    <div>{list.name}</div>
                    <p>{list.categoryName}</p>
                  </div>
                </div>
              ))
            }
          </div>
        );
    }

    render() {
        const { showLoader, loadPropertyDetails, uploadPropertyData, totalVideosInCategory, recommendedVideoList } = this.props;
        const videoCategoryMenu = this.loadCategories();
        const recommendedVideos = this.loadVideoList();
        return (
          <div className={classes.mainContainerRecommended}>
            { showLoader && <LoadingIndicator />}
            <div className={classes.videosContainer}>
              <div className={classes.categoryMenu}>
                {videoCategoryMenu}
              </div>
              <div className={classes.videoMenu}>
                {recommendedVideos}
              </div>
            </div>
            <Pagination
              totalRecords={totalVideosInCategory}
              paginate={this.paginationSearch}
              currentPageNumber={this.state.page}
              pageSize={RECOMMENDED_VIDEOS_SIZE}
            />
            {
              recommendedVideoList.length && !showLoader ? (
                <div className={classes.recommendTextContent}>
                  <FormattedMessage id="propertyRecommendMoreText" />
                </div>
              ) : null
            }
            <div className={c('col-xs-12', classes.buttonContainer)}>
              <RaisedButton
                label={<FormattedMessage id="back" />}
                className={classes.cancelButtonLink}
                onClick={loadPropertyDetails}
              />
              <RaisedButton
                label={<FormattedMessage id="next" />}
                className={classes.btnSubDetails}
                onClick={uploadPropertyData}
              />
            </div>
          </div>
        );
    }
}

RecommendedVideos.defaultProps = {
    categoryIdFilter: null,
};

RecommendedVideos.propTypes = {
    videoCategories: PropTypes.array.isRequired,
    recommendedVideoList: PropTypes.array.isRequired,
    showLoader: PropTypes.bool.isRequired,
    fetchVideos: PropTypes.func.isRequired,
    previewContent: PropTypes.func.isRequired,
    updateVideo: PropTypes.func.isRequired,
    loadPropertyDetails: PropTypes.func.isRequired,
    uploadPropertyData: PropTypes.func.isRequired,
    totalVideosInCategory: PropTypes.number.isRequired,
    categoryIdFilter: PropTypes.number,
    showAccurateWarning: PropTypes.string.isRequired,
};

const mapStateToProps = reduxState => ({
    videoCategories: reduxState.propertyInformation.videoCategories,
    recommendedVideoList: reduxState.propertyInformation.recommendedVideoList,
    totalVideosInCategory: reduxState.propertyInformation.totalVideosInCategory,
});

const mapDispatchToProps = dispatch => ({
    updateVideo(videoData, index) {
        return dispatch(updateRecommendedVideos(videoData, index));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedVideos);
