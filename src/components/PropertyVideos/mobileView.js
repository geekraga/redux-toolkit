import React, { Component, PropTypes } from 'react';
import c from 'classnames';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { addVideosInCategory } from '../../actions/async/publicVideos';
import { CATEGORY_VIDEOS_SIZE } from '../../constants';
import VideoInfo from './videoInfo';
import classes from './style.scss';

class MobileView extends Component {
    state = {
        srollUp: false,
        isDataLoading: false,
        videoContentScrolled: false,
    };

    componentWillMount() {
        this.updateVideoList(this.props.newVideos);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onWindowScroll);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.newVideos, this.props.newVideos)) {
            this.updateVideoList(nextProps.newVideos);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onWindowScroll);
    }

    onWindowScroll = () => {
        if (window.pageYOffset > 120) {
            this.setState({ srollUp: true });
        } else {
            this.setState({ srollUp: false });
        }
        if (document.body.offsetHeight - window.pageYOffset < 750) {
            const { activeCategory, isDataLoading } = this.state;
            const { newVideos, updateCategoryVideos, propertyId, langId, showHideLoadingIndicator } = this.props;
            const { categoryId, pageNumber, contentDetail, total } = newVideos[activeCategory];
            const bodyObj = {
                propertyId,
                categoryId,
                categoryName: activeCategory,
                langId,
                page: pageNumber + 1,
                size: CATEGORY_VIDEOS_SIZE,
            };
            if (total > contentDetail.length && !isDataLoading) {
                document.body.style.overflow = 'hidden';
                showHideLoadingIndicator(true);
                this.setState({
                    isDataLoading: true,
                    videoContentScrolled: true,
                }, () => {
                    updateCategoryVideos(bodyObj).then(() => {
                        this.setState({ isDataLoading: false }, () => {
                            document.body.style.overflow = 'auto';
                            showHideLoadingIndicator(false);
                        });
                    });
                });
            }
        }
    }

    updateVideoList = newVideos => {
        const { videoContentScrolled } = this.state;
        const videoCategories = Object.keys(newVideos);
        if (!videoContentScrolled) {
            const activeVideos = newVideos[videoCategories[0]].contentDetail;
            const breakVideoPlayList = newVideos[videoCategories[0]].containsSlide;
            this.setState({
                activeVideos,
                videoCategories,
                activeCategory: videoCategories[0],
                headerWidth: Math.round((100 / videoCategories.length) * 100) / 100,
                breakVideoPlayList,
            });
        } else {
            const { activeCategory } = this.state;
            this.setState({
                activeVideos: newVideos[activeCategory].contentDetail,
                breakVideoPlayList: newVideos[activeCategory].containsSlide,
            });
        }
    }

    updateVideos = activeCategory => {
        const { newVideos } = this.props;
        this.setState({
            activeCategory,
            activeVideos: newVideos[activeCategory].contentDetail,
            breakVideoPlayList: newVideos[activeCategory].containsSlide,
        });
    }

    hideScroller = () => {
        this.setState({ srollUp: false });
        window.scrollTo(0, 0);
    }

    render() {
        const { previewContent } = this.props;
        const { videoCategories, activeCategory, activeVideos, headerWidth, srollUp, breakVideoPlayList } = this.state;
        const mobileHeaerOptions = videoCategories.map(category => (
          <div
            className={c(
              classes.mobileHeadOptions,
              { [classes.activeOption]: category === activeCategory },
            )}
            key={category}
            style={{ width: `${headerWidth}%` }}
            onClick={() => this.updateVideos(category)}
          >
            {category}
          </div>
        ));
        return (
          <div className={classes.mobileVideoWrapper}>
            <div className={classes.mobileHeader}>
              {mobileHeaerOptions}
            </div>
            <div className="row">
              {(activeVideos && activeVideos.map((list, i) => (
                <VideoInfo
                  list={list}
                  previewContent={previewContent}
                  breakVideoPlayList={breakVideoPlayList}
                  key={`${list.videoName}_${i}`}
                />
              )))}
            </div>
            {
              srollUp ? (
                <div
                  className={classes.scrollButton}
                  onClick={this.hideScroller}
                >
                  <i className="material-icons">
                    keyboard_arrow_up
                  </i>
                </div>
              ) : null
            }
          </div>
        );
    }
}

MobileView.propTypes = {
    newVideos: PropTypes.object.isRequired,
    previewContent: PropTypes.func.isRequired,
    propertyId: PropTypes.string.isRequired,
    langId: PropTypes.number.isRequired,
    updateCategoryVideos: PropTypes.func.isRequired,
    showHideLoadingIndicator: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    updateCategoryVideos(data) {
        return dispatch(addVideosInCategory(data));
    },
});

export default connect(null, mapDispatchToProps)(MobileView);
