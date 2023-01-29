import React, { Component, PropTypes } from 'react';
import c from 'classnames';
import { connect } from 'react-redux';
import { TextField, RaisedButton } from 'material-ui';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import domtoimage from 'dom-to-image';
import ImageUploadDialog from './imageUploadDialog';
import { validatePicture } from '../../../util/regexStorage';
import ImageSelector from './ImageSelector';
import {
    updateSlideDesign,
    addCurrentTemplate,
    deleteCurrentTemplate,
    updateTemplateThumbnail,
    createSlidesPreview,
} from '../../../actions/propertySnapshots';
import SlideShow from '../../PropertyVideos/SlideShow';
import classes from './styles.scss';

class CreateSnapshot extends Component {

    state = {
        backGroundImage: '',
        showImageDialog: false,
        image: {},
        imageName: '',
        isSlideDialogOpen: false,
        cropperWidth: 400,
    };
    slideThumbUpdate = null;

    componentDidMount() {
        const { base64Image, imageUrl } = this.props.selectedTempalte;
        this.updateImgaeInBackGround(base64Image, imageUrl);
        this.createThumbnail();
        ReactTooltip.rebuild();
    }
    componentWillReceiveProps(nextProps) {
        const { slideId } = this.props.selectedTempalte;
        const { slideId: slideIdUpdated } = nextProps.selectedTempalte;
        if (slideId !== slideIdUpdated) {
            const { base64Image, imageUrl } = nextProps.selectedTempalte;
            this.updateImgaeInBackGround(base64Image, imageUrl);
        }
    }

    componentDidUpdate(nextProps) {
        const { templateId, title, description } = this.props.selectedTempalte;
        const { templateId: templateIdUpdated, title: titleUpdated, description: descriptionUpdated } = nextProps.selectedTempalte;
        if (templateId !== templateIdUpdated || title !== titleUpdated || description !== descriptionUpdated) {
            this.updateSlideThumbnail();
        }
    }
    getBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });


    updateBackgroundImage = e => {
        const uploadedFile = e.target.files[0];
        const extension = uploadedFile ? uploadedFile.name.split('.').pop().toLowerCase() : null;
        const imageSize = uploadedFile ? uploadedFile.size : 0;
        if (validatePicture({ extension, imageSize })) {
            const imageName = `${moment().format('MMMMDoYYYYhmmssa')}_${uploadedFile.name}`;
            const _URL = window.URL || window.webkitURL;
            const minWidth = window.innerWidth - 200;
            const img = new Image();
            img.src = _URL.createObjectURL(uploadedFile);
            img.onload = () => {
                const orignialWidth = img.width;
                const cropperWidth = minWidth > orignialWidth ? orignialWidth : minWidth;
                this.setState({
                    image: uploadedFile,
                    showImageDialog: true,
                    imageName,
                    cropperWidth,
                });
            };
        }
    };

    handleInputChange = e => {
        this.props.updateSlide({ [e.target.name]: e.target.value });
    };

    addCurrentTemplate = () => {
        this.props.addSlide();
    };

    deleteCurrentTemplate = () => {
        const { deleteSlide } = this.props;
        deleteSlide();
    };

    updateSlideThumbnail = () => {
        if (this.slideThumbUpdate) {
            clearTimeout(this.slideThumbUpdate);
        }
        this.slideThumbUpdate = setTimeout(() => {
            this.createThumbnail();
        }, 500);
    };

    createThumbnail = () => {
        const node = document.getElementById('mainSlide');
        domtoimage.toPng(node).then(dataUrl => {
            this.props.updateSlideThumbnailUrl(dataUrl);
        });
    };

    updateImgaeInBackGround = (base64Image, imageUrl) => {
        if (!base64Image && !imageUrl) {
            this.setState({ backGroundImage: '' });
        } else if (base64Image) {
            this.setState({ backGroundImage: base64Image });
        } else {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    this.setState({ backGroundImage: reader.result });
                };
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', imageUrl);
            xhr.responseType = 'blob';
            xhr.send();
        }
    };

    closeDialog = () => {
        this.setState({ showImageDialog: false });
    };

    covertTobase64 = imageUrl => {
        const { imageName } = this.state;
        this.getBase64(imageUrl).then(base64Image => {
            this.setState({ showImageDialog: false, backGroundImage: base64Image });
            this.props.updateSlide({ base64Image, imageName });
        });
    };

    createSlidesPreview = () => {
        const { viewSlidesPreview, slideList, selectedTempalte } = this.props;
        viewSlidesPreview(slideList, selectedTempalte);
        this.setState({ isSlideDialogOpen: true });
    };

    closeSlideShow = () => {
        this.setState({ isSlideDialogOpen: false });
    };
    render() {
        const {
            selectedTempalte,
            slideList,
            finishSlideCreation,
            cancelSlideCreation,
            intl,
        } = this.props;
        const { backGroundImage, showImageDialog, image, isSlideDialogOpen, cropperWidth } = this.state;
        const { templateId, base64Image, title, description } = selectedTempalte;
        const enableAddSlide = base64Image || title || description;
        const slideListLength = Object.keys(slideList).length;
        return (
          <div className={classes.slideCreator}>
            <section className={c(classes.snapShotOuter, classes[`snapshot_${templateId}`])} id="mainSlide">
              {
                backGroundImage ?
                  (
                    <img
                      src={backGroundImage}
                      className={c(classes.bgImages, classes.userUploaded)}
                      onLoad={this.updateSlideThumbnail}
                      alt=""
                    />
                  ) : null
              }
              {
                (templateId !== 5) ? (<img
                  src={require(`../../../public/filterImage${templateId}.png`)}
                  onLoad={this.updateSlideThumbnail}
                  className={classes.bgImages}
                  alt=""
                />) : (<div className={classes.bgOpacity} />)
              }
              <ImageSelector
                updateBackgroundImage={this.updateBackgroundImage}
                includeComponent={templateId === 5}
                handleOnClick={e => { e.target.value = null; }}
              />
              <div className={c('row', classes.mainContent)}>
                <div className={c('col-xs-4 col-md-5', classes.leftContent)}>
                  <ImageSelector
                    updateBackgroundImage={this.updateBackgroundImage}
                    includeComponent={templateId === 1}
                    handleOnClick={e => { e.target.value = null; }}
                  />
                </div>
                <div className={c('col-xs-8 col-md-7', classes.rightContent)}>
                  <ImageSelector
                    updateBackgroundImage={this.updateBackgroundImage}
                    includeComponent={templateId === 3}
                    handleOnClick={e => { e.target.value = null; }}
                  />
                  <div className={c({ [classes.additionalContent]: templateId === 5 })}>
                    <TextField
                      name="title"
                      value={selectedTempalte.title}
                      hintText={<FormattedMessage id="slideTextHint" />}
                      className={classes.slideInputs}
                      maxLength="150"
                      rowsMax={(templateId === 5) ? 2 : 1}
                      multiLine
                      onChange={this.handleInputChange}
                      fullWidth
                    />
                    <TextField
                      name="description"
                      value={selectedTempalte.description}
                      hintText={<FormattedMessage id="slideDescHint" />}
                      className={c(classes.slideInputs, classes.descriptionField)}
                      maxLength="5000"
                      rowsMax={(templateId === 1 || templateId === 2) ? 6 : 2}
                      multiLine
                      onChange={this.handleInputChange}
                      fullWidth
                    />
                  </div>
                  <ImageSelector
                    updateBackgroundImage={this.updateBackgroundImage}
                    includeComponent={templateId === 4}
                    handleOnClick={e => { e.target.value = null; }}
                  />
                </div>
              </div>
            </section>
            <div className={classes.addDeleteButtonContainer}>
              <div className={classes.imageHintTextContent}>
                <FormattedMessage id="imageHintText" />
              </div>
              <div>
                <i
                  className={c('material-icons', classes.addButton, { [classes.disabledButton]: !enableAddSlide })}
                  onClick={enableAddSlide ? this.addCurrentTemplate : null}
                  data-tip={intl.formatMessage({ id: 'addSlide' })}
                  data-class={classes.tooltipStyle}
                  data-place="bottom"
                  data-effect="solid"
                >
                  add_to_photos
                </i>
                <i
                  className={c('material-icons', { [classes.disabledButton]: slideListLength <= 1 })}
                  onClick={slideListLength > 1 ? this.deleteCurrentTemplate : null}
                  data-tip={intl.formatMessage({ id: 'delSlide' })}
                  data-class={classes.tooltipStyle}
                  data-place="bottom"
                  data-effect="solid"
                >
                  delete
                </i>
                <RaisedButton
                  label={<FormattedMessage id="slidePreview" />}
                  onTouchTap={enableAddSlide ? this.createSlidesPreview : null}
                  className={classes.btnSubDetails}
                  primary
                />
                <div className={classes.buttonContainer}>
                  <RaisedButton
                    label={<FormattedMessage id="slideExit" />}
                    onTouchTap={cancelSlideCreation}
                    className={classes.cancelButtonLink}
                    primary
                  />
                  <RaisedButton
                    label={<FormattedMessage id="slideFinish" />}
                    onTouchTap={finishSlideCreation}
                    className={classes.btnSubDetails}
                    primary
                  />
                </div>
              </div>
            </div>
            <ImageUploadDialog
              showImageDialog={showImageDialog}
              handleCloseDialog={this.closeDialog}
              rightButtonCallBack={this.confirmDeleteSlides}
              image={image}
              cropperWidth={cropperWidth}
              covertTobase64={this.covertTobase64}
            />
            <SlideShow
              openSlides={isSlideDialogOpen}
              title="Slide Preview"
              closeSlideShow={this.closeSlideShow}
            />
          </div>
        );
    }
}

CreateSnapshot.propTypes = {
    selectedTempalte: PropTypes.object.isRequired,
    updateSlide: PropTypes.func.isRequired,
    addSlide: PropTypes.func.isRequired,
    deleteSlide: PropTypes.func.isRequired,
    updateSlideThumbnailUrl: PropTypes.func.isRequired,
    cancelSlideCreation: PropTypes.func.isRequired,
    finishSlideCreation: PropTypes.func.isRequired,
    viewSlidesPreview: PropTypes.func.isRequired,
    slideList: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
};

const mapStateToProps = reduxState => ({
    selectedTempalte: reduxState.propertyInformation.selectedTempalte,
    slideList: reduxState.propertyInformation.slideList,
});

const mapDispatchToProps = dispatch => ({
    updateSlide: updatedTempalte => dispatch(updateSlideDesign(updatedTempalte)),
    addSlide: () => dispatch(addCurrentTemplate()),
    deleteSlide: () => dispatch(deleteCurrentTemplate()),
    updateSlideThumbnailUrl: dataUrl => dispatch(updateTemplateThumbnail(dataUrl)),
    viewSlidesPreview: (slides, selectedTempalte) => dispatch(createSlidesPreview(slides, selectedTempalte)),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CreateSnapshot));
