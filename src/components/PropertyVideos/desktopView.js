import React, { PropTypes } from 'react';
import VideoCarousel from './VideoCarousel';
import classes from './style.scss';

function DesktopView(props) {
    const { newVideos, previewContent, addCategoryVideos } = props;
    const propertyData = Object.keys(newVideos).map(videoCategory => {
        const videoData = newVideos[videoCategory].total ? (
          <section className={classes.videoSlider} key={videoCategory} >
            <div>
              <h3 className={classes.sliderHeader}>
                {videoCategory}
                <span className={classes.categoryVideos}>({newVideos[videoCategory].total})</span>
              </h3>
              <VideoCarousel
                videoList={newVideos[videoCategory].contentDetail}
                previewContent={previewContent}
                addCategoryVideos={() => addCategoryVideos(newVideos[videoCategory], videoCategory)}
                breakVideoPlayList={newVideos[videoCategory].containsSlide}
              />
            </div>
          </section>
        ) : null;
        return videoData;
    });
    return (
      <div className={classes.propertyVideoContainer}>
        {propertyData}
      </div>
    );
}

DesktopView.propTypes = {
    newVideos: PropTypes.object.isRequired,
    previewContent: PropTypes.func.isRequired,
    addCategoryVideos: PropTypes.func.isRequired,
};

export default DesktopView;
