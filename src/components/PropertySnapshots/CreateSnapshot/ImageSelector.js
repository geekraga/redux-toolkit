import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import classes from './styles.scss';
import addImageLarge from '../../../public/addImageLarge.png';

export default function ImageSelector(props) {
    const { updateBackgroundImage, includeComponent, handleOnClick } = props;
    return includeComponent ? (
      <FlatButton
        icon={<img src={addImageLarge} alt="" />}
        className={classes.changeBgImage}
        containerElement="label"
        hoverColor="transparent"
      >
        <input
          type="file"
          accept="image/*"
          className={classes.hideButton}
          onChange={updateBackgroundImage}
          onClick={handleOnClick}
        />
      </FlatButton>
    ) : null;
}

ImageSelector.defaultProps = { includeComponent: false, handleOnClick: () => {} };

ImageSelector.propTypes = {
    updateBackgroundImage: PropTypes.func.isRequired,
    includeComponent: PropTypes.bool,
    handleOnClick: PropTypes.func.isRequired,
};
