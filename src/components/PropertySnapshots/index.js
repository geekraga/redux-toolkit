import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LoadingIndicator from '../LoadingIndicator';
import SnapTemplates from './SnapTemplates';
import CreateSnapshot from './CreateSnapshot';
import SlideScreenShot from './SlideScreenSnapShot';
import SlideDialog from './SlideDialog';
import { PROPERTY_CONTENT } from '../../constants';
import { initiateSlideOperation } from '../../actions/async/slidesManagement';
import { updatePropertyHostedInfo } from '../../actions/propertyInformation';
import { clearDeleteSlidesArray, clearSelectedTemplate } from '../../actions/propertySnapshots';
import classes from './styles.scss';

class PropertySnapshots extends Component {

    state = {
        showLoader: false,
        showSlideDialog: false,
        slideDialogHeader: '',
        slideDialogText: '',
        buttonText: '',
        showRightButton: false,
    };

    componentWillUnmount() {
        const { clearDeleteArrayAndSlideList, emptySelectedTemplate } = this.props;
        clearDeleteArrayAndSlideList();
        emptySelectedTemplate();
    }

    closeSlideDialog = () => {
        this.setState(
            {
                showSlideDialog: false,
                slideDialogHeader: '',
                slideDialogText: '',
                buttonText: '',
                showRightButton: false,
            });
    };

    openSlideDialog = () => {
        this.setState(
            {
                showSlideDialog: true,
                slideDialogHeader: 'exitHeaderText',
                slideDialogText: 'exitSlideText',
                buttonText: 'exitSnapShot',
                showRightButton: true,
            });
    };

    handleExitSnapShotBtn = () => {
        this.closeSlideDialog();
        this.props.exitSlideInfo();
    };

    updateSlideInfo = () => {
        const { propertyId, hostVideoTypeId, selectedTempalte, updateInSlides, exitSlideInfo, deletedSlides } = this.props;
        const currentSlides = { ...this.props.slideList };
        this.stopInMiddleFlag = false;
        currentSlides[selectedTempalte.slideId] = { ...currentSlides[selectedTempalte.slideId], ...selectedTempalte };
        let slideList = [];
        Object.values(currentSlides).forEach(slide => {
            const { title, description } = slide;
            const isDataAvailable = title || description;
            if (!isDataAvailable) {
                this.stopInMiddleFlag = true;
                return this.stopInMiddleFlag;
            }
            const { hasUserAdded, thumbnailUrl, imageUrl, ...slideItem } = slide;
            if ('actionFlag' in slide) {
                const slideId = hasUserAdded ? 0 : slide.slideId;
                slideList.push({ ...slideItem, slideId });
            }
        });
        if (this.stopInMiddleFlag) {
            this.setState({
                showSlideDialog: true,
                slideDialogHeader: 'emptySlideHeaderText',
                slideDialogText: 'emptySlideText',
                buttonText: 'gotItText' });
        } else {
            slideList = [...slideList, ...deletedSlides];
            if (slideList.length) {
                this.setState({ showLoader: true });
                this.props.modifySlides({
                    propertyId,
                    hostVideoTypeId,
                    slideList,
                }).then(() => {
                    const slideKeys = Object.keys(currentSlides);
                    const fetchThumbnail = currentSlides[slideKeys[0]];
                    const { base64Thumbnail: thumbnailUrl } = fetchThumbnail;
                    updateInSlides(hostVideoTypeId - 1, PROPERTY_CONTENT, thumbnailUrl);
                    exitSlideInfo();
                });
            } else {
                this.setState({
                    showSlideDialog: true,
                    slideDialogHeader: 'exitHeaderText',
                    slideDialogText: 'emptySlideListLength',
                    buttonText: 'gotItText' });
            }
        }
    };
    render() {
        const { slideList } = this.props;
        const { showLoader, showSlideDialog, slideDialogHeader, slideDialogText, buttonText, showRightButton } = this.state;
        return (
          <div className={classes.snapContainer}>
            {showLoader && <LoadingIndicator />}
            <div className="row">
              <div className="col-xs-12 col-sm-2">
                <div className={classes.slideThumbnails}>
                  <SlideScreenShot slideList={slideList} />
                </div>
              </div>
              <div className="col-xs-12 col-sm-7">
                <CreateSnapshot
                  cancelSlideCreation={this.openSlideDialog}
                  finishSlideCreation={this.updateSlideInfo}
                />
              </div>
              <SnapTemplates outerClasses="col-xs-12 col-sm-3" />
            </div>
            <SlideDialog
              showSlideDialog={showSlideDialog}
              handleCloseDialog={showRightButton ? this.handleExitSnapShotBtn : this.closeSlideDialog}
              slideDialogText={slideDialogText}
              buttonText={buttonText}
              headerText={slideDialogHeader}
              showRightButton={showRightButton}
              rightButtonCallBack={this.closeSlideDialog}
              rightButtonText={'dontExit'}
            />
          </div>
        );
    }
}

PropertySnapshots.propTypes = {
    hostVideoTypeId: PropTypes.number.isRequired,
    propertyId: PropTypes.number.isRequired,
    selectedTempalte: PropTypes.object.isRequired,
    modifySlides: PropTypes.func.isRequired,
    updateInSlides: PropTypes.func.isRequired,
    slideList: PropTypes.object.isRequired,
    deletedSlides: PropTypes.array.isRequired,
    clearDeleteArrayAndSlideList: PropTypes.func.isRequired,
    emptySelectedTemplate: PropTypes.func.isRequired,
    exitSlideInfo: PropTypes.func.isRequired,
};

const mapStateToProps = reduxState => ({
    selectedTempalte: reduxState.propertyInformation.selectedTempalte,
    slideList: reduxState.propertyInformation.slideList,
    deletedSlides: reduxState.propertyInformation.deletedSlides,

});

const mapDispatchToProps = dispatch => ({
    modifySlides: slideObj => dispatch(initiateSlideOperation(slideObj)),
    updateInSlides: (hostVideoTypeId, updatedInfo, thumbnailUrl) => dispatch(updatePropertyHostedInfo(hostVideoTypeId, updatedInfo, thumbnailUrl)),
    clearDeleteArrayAndSlideList: () => dispatch(clearDeleteSlidesArray()),
    emptySelectedTemplate: () => dispatch(clearSelectedTemplate()),

});

export default connect(mapStateToProps, mapDispatchToProps)(PropertySnapshots);
