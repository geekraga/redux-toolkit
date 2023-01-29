import React, { PropTypes } from 'react';
import Slider from 'react-slick';
import c from 'classnames';
import NextArrow from './nextArrowCarrousel';
import PrevArrow from './prevArrowCarrousel';
import './style.ignoreHash.css';
import classes from './style.scss';

function VideoCarousel(props) {
    const { videoList, previewContent, addCategoryVideos, breakVideoPlayList } = props;
    const settings = {
        speed: 500,
        slidesToShow: 4,
        draggable: false,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        nextArrow: <NextArrow addCategoryVideos={addCategoryVideos} />,
        prevArrow: <PrevArrow />,
    };
    return (
      <div>
        {
          <Slider {...settings}>
            {
              videoList && videoList.map((item, i) => (
                <div
                  key={`${item.videoName}_${i}`}
                >
                  <figure className={classes.thumbnailContainer}>
                    <img src={item.thumbnailUrl} alt="" />
                    <div className={classes.playContainerOverlay} />
                    <div
                      className={classes.playContainer}
                      onClick={() => previewContent(item, breakVideoPlayList)}
                    >
                      <i className={c('material-icons', classes.playIcon)}>
                        play_arrow
                      </i>
                    </div>
                  </figure>
                  <div className={classes.videoTitle}>
                    {item.videoName}
                  </div>
                </div>
              ))
            }
          </Slider>
        }
      </div>
    );
}

VideoCarousel.propTypes = {
    videoList: PropTypes.array.isRequired,
    previewContent: PropTypes.func.isRequired,
    addCategoryVideos: PropTypes.func.isRequired,
    breakVideoPlayList: PropTypes.bool.isRequired,
};

export default VideoCarousel;
