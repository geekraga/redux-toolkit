import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import c from 'classnames';
import classes from './styles.scss';
import { updateSelectedTemplate } from '../../../actions/propertySnapshots';

const SlideScreenShot = props => {
    const { slideList, updateSlideTemplate, selectedTempalte } = props;
    const totalSlides = Object.keys(slideList);
    const slide = totalSlides.map(slideId => (
      <li
        className={c({ [classes.selectedSlide]: (slideId == selectedTempalte.slideId) })}
        key={slideId}
        onClick={() => updateSlideTemplate(slideList[slideId])}
      >
        { (slideList[slideId].base64Thumbnail || slideList[slideId].thumbnailUrl) ? (
          <img
            src={slideList[slideId].base64Thumbnail || slideList[slideId].thumbnailUrl}
            alt=""
          />
        ) : null }
      </li>
      ),
    );

    return (
      <ol className={c(classes.orderedList, classes.orderedListDesktop)} style={{ width: (totalSlides.length * 150 + 20) }}>
        {slide}
      </ol>
    );
};
SlideScreenShot.propTypes = {
    slideList: PropTypes.object.isRequired,
    selectedTempalte: PropTypes.object.isRequired,
    updateSlideTemplate: PropTypes.func.isRequired,
};

const mapStateToProps = reduxState => ({
    slideList: reduxState.propertyInformation.slideList,
    selectedTempalte: reduxState.propertyInformation.selectedTempalte,
});

const mapDispatchToProps = dispatch => ({
    updateSlideTemplate: updatedTemplate => dispatch(updateSelectedTemplate(updatedTemplate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlideScreenShot);
