import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Dialog, RaisedButton } from 'material-ui';
import Cropper from 'react-crop';
import './style.ignoreHash.css';
import classes from './styles.scss';

export default class ImageUploadDialog extends Component {

    constructor() {
        super();
        this.handleRightButtonClick = this.handleRightButtonClick.bind(this);
    }
    async handleRightButtonClick() {
        const croppedImage = await this.cropper.cropImage();
        this.props.covertTobase64(croppedImage);
    }

    imageLoaded = () => {
        window.dispatchEvent(new Event('resize'));
    }

    render() {
        const {
            showImageDialog,
            handleCloseDialog,
            image,
            cropperWidth,
        } = this.props;
        return (
          <Dialog
            title={
              <h3 className={classes.dialogHeaderStyle}>
                <FormattedMessage id="editPicture" />
              </h3>
            }
            open={showImageDialog}
            onRequestClose={handleCloseDialog}
            contentClassName={classes.dialogContentClass}
            autoScrollBodyContent
          >
            <Cropper
              ref={ref => { this.cropper = ref; }}
              image={image}
              width={cropperWidth}
              height={Math.ceil((cropperWidth * 9) / 16)}
              onImageLoaded={this.imageLoaded}
            />
            <RaisedButton
              label={<FormattedMessage id="crop" />}
              onTouchTap={this.handleRightButtonClick}
              className={classes.cropImageButton}
              primary
            />
          </Dialog>
        );
    }
}

ImageUploadDialog.propTypes = {
    showImageDialog: PropTypes.bool.isRequired,
    image: PropTypes.object.isRequired,
    handleCloseDialog: PropTypes.func.isRequired,
    covertTobase64: PropTypes.func.isRequired,
    cropperWidth: PropTypes.number.isRequired,
};

