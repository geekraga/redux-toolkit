import React, { PropTypes } from 'react';
import c from 'classnames';
import classes from './style.scss';

function PrevArrow(props) {
    const { className, style, onClick, currentSlide } = props;
    return (
      currentSlide ? (
        <div
          className={className}
          style={{ ...style }}
          onClick={onClick}
        >
          <i className={c('material-icons', classes.iconNavigate)}>navigate_before</i>
        </div>
      ) : null
    );
}

PrevArrow.defaultProps = {
    className: '',
    style: {},
    onClick: () => {},
    currentSlide: 0,
};

PrevArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    currentSlide: PropTypes.number,
};

export default PrevArrow;
