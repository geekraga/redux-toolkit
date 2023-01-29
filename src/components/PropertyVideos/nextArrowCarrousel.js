import React, { PropTypes } from 'react';
import c from 'classnames';
import classes from './style.scss';

function NextArrow(props) {
    const { className, style, onClick, currentSlide, slideCount, addCategoryVideos } = props;

    function slideNextVideo() {
        if (currentSlide === slideCount - 6) {
            addCategoryVideos();
        }
        onClick();
    }

    return (
      slideCount ? (
        <div
          className={c(className, { [classes.hideContent]: (slideCount < 4 || currentSlide === slideCount - 4) })}
          style={{ ...style }}
          onClick={slideNextVideo}
        >
          <i className={c('material-icons', classes.iconNavigate)}>navigate_next</i>
        </div>
        ) : null

    );
}

NextArrow.defaultProps = {
    className: '',
    style: {},
    onClick: () => {},
    currentSlide: 0,
    slideCount: 0,
};

NextArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    currentSlide: PropTypes.number,
    slideCount: PropTypes.number,
    addCategoryVideos: PropTypes.func.isRequired,
};

export default NextArrow;
