import React, { Component, PropTypes } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Dialog, FlatButton, RaisedButton, FontIcon } from 'material-ui';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import { validatePicture } from '../../util/regexStorage';
import ImageGalleryPage from '../ImageCarousel/ImageGallery';
import LoadingIndicator from '../LoadingIndicator';
import styles from './styles';
import classes from './styles.scss';
import {
  uploadImageThumbnails,
  fetchImageThumbnails,
  deleteImageThumbnails,
  setDefaultThumbnail,
} from '../../actions/async/thumbnailsManagement';

class ThumbnailManagement extends Component {
    constructor() {
        super();
        this.state = {
            maxUpload: 0,
            allThumbnails: [],
            imagesPrepoulate: [],
            thumbnailsToBeDeleted: [],
            showLoader: true,
            errorMessage: '',
            defaultThumbnailValues: {},
            defaultThumbnailFilename: 'empty',
        };
        this.getBase64 = this.getBase64.bind(this);
        this.updateToolTip = this.updateToolTip.bind(this);
        this.removeImageThumbnail = this.removeImageThumbnail.bind(this);
        this.handleFileInputChange = this.handleFileInputChange.bind(this);
        this.handleThumbnailSubmit = this.handleThumbnailSubmit.bind(this);
        this.changeDefaultThumbnail = this.changeDefaultThumbnail.bind(this);
    }

    componentDidMount() {
        const { fetchThumbnails, videoId, handleCloseDialogOnSubmit } = this.props;
        fetchThumbnails(videoId).then(response => {
            if (response.status === 200) {
                const data = response.data.thumbnails;
                const prepopulatedData = data.map(item => (
                  { dataUrl: item.thumbnailUrl, indexValue: item.thumbnailId, isDefault: item.isDefault }
            ));
                this.setState({ allThumbnails: prepopulatedData, imagesPrepoulate: prepopulatedData, showLoader: false });
            } else {
                handleCloseDialogOnSubmit('blocedVideoOpen');
            }
        });
        ReactTooltip.rebuild();
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve({ file, dataUrl: reader.result, indexValue: -1, isDefault: false });
            };
            reader.onerror = function (error) {
                reject(error);
            };
        });
    }

    updateToolTip() {
        ReactTooltip.rebuild();
    }

    handleFileInputChange(event) {
        const { imagesPrepoulate, allThumbnails } = this.state;
        const uploadedImages = [];
        for (let i = 0; i < event.target.files.length; i += 1) {
            const uploadedFile = event.target.files[i];
            const extension = uploadedFile ? uploadedFile.name.split('.').pop().toLowerCase() : null;
            const imageSize = uploadedFile ? uploadedFile.size : 0;
            if (extension && imageSize) {
                if (validatePicture({ extension, imageSize })) {
                    uploadedImages.push(this.getBase64(event.target.files[i]));
                }
            }
        }
        Promise.all(uploadedImages).then(newThumbnails => {
            let { defaultThumbnailFilename } = this.state;
            if (defaultThumbnailFilename === 'empty' && !imagesPrepoulate.length) {
                defaultThumbnailFilename = newThumbnails[0].file.name;
                newThumbnails[0].isDefault = true;
            }
            this.setState({ defaultThumbnailFilename });
            const imagesToAdd = 10 - allThumbnails.length + imagesPrepoulate.length;
            if (imagesToAdd > 0) {
                this.setState({
                    allThumbnails: [...allThumbnails, ...newThumbnails.slice(0, imagesToAdd)],
                    maxUpload: this.state.maxUpload + newThumbnails.slice(0, imagesToAdd).length,
                });
            }
        });
    }
    removeImageThumbnail(index) {
        const { allThumbnails, thumbnailsToBeDeleted } = this.state;
        const indexedData = allThumbnails[index];
        const tobeDeletedIndexes = [];
        if (indexedData.indexValue !== -1) {
            tobeDeletedIndexes.push(indexedData.indexValue);
        } else {
            this.setState({
                maxUpload: this.state.maxUpload -= 1,
            });
        }
        this.setState({
            allThumbnails: [...allThumbnails.slice(0, index), ...allThumbnails.slice(index + 1)],
            thumbnailsToBeDeleted: [...thumbnailsToBeDeleted, ...tobeDeletedIndexes],
        });
        ReactTooltip.hide();
    }

    changeDefaultThumbnail(currentIndex) {
        const { allThumbnails } = this.state;
        const { videoId } = this.props;
        const updateThumbNails = allThumbnails.map((thumbnail, i) => {
            if (currentIndex !== i) {
                thumbnail.isDefault = false;
                return thumbnail;
            }
            thumbnail.isDefault = true;
            return thumbnail;
        });
        if (allThumbnails[currentIndex].indexValue !== -1) {
            this.setState({
                defaultThumbnailValues: { videoId, tnIndex: allThumbnails[currentIndex].indexValue },
                defaultThumbnailFilename: 'empty',
                allThumbnails: updateThumbNails,
            });
        } else {
            this.setState({
                defaultThumbnailFilename: allThumbnails[currentIndex].file.name,
                allThumbnails: updateThumbNails,
                defaultThumbnailValues: '',
            });
        }
    }

    handleThumbnailSubmit(videoId) {
        let containsNewFormData = false;
        const {
            allThumbnails,
            thumbnailsToBeDeleted,
            isMaxUploadExceeded,
            defaultThumbnailValues,
        } = this.state;
        let { defaultThumbnailFilename } = this.state;
        const { uploadThumbnails, deleteThumbnails, handleCloseDialogOnSubmit, defaultThumbnailAction } = this.props;
        const formData = new FormData();
        for (let i = 0; i < allThumbnails.length; i += 1) {
            if (allThumbnails[i].file) {
                const id = uniqueId('Thumbnail_');
                const fileName = `${id}_${allThumbnails[i].file.name}`;
                formData.append('thumbnailFiles', allThumbnails[i].file, fileName);
                if (allThumbnails[i].isDefault) {
                    defaultThumbnailFilename = fileName;
                }
            }
        }
        formData.append('defaultThumbnail', defaultThumbnailFilename);

        for (let i = 0; i < allThumbnails.length; i += 1) {
            if (allThumbnails[i].file) {
                containsNewFormData = true;
                break;
            }
        }
        this.setState({ showLoader: true });

        let reloadMainPage = '';

        if (thumbnailsToBeDeleted.length) {
            deleteThumbnails({ thumbnailIds: thumbnailsToBeDeleted }, videoId);
            reloadMainPage = 'thumbnailUpdateSuccess';
        }

        if (containsNewFormData && !isMaxUploadExceeded) {
            uploadThumbnails(formData, videoId);
            reloadMainPage = '';
        }

        if (!isEmpty(defaultThumbnailValues)) {
            defaultThumbnailAction(defaultThumbnailValues).then(response => {
                if (response.status === 200) {
                    handleCloseDialogOnSubmit('thumbnailUpdateSuccess');
                } else if (response.error.response) {
                    handleCloseDialogOnSubmit(response.error.response.data.message);
                }
            });
        } else {
            handleCloseDialogOnSubmit(reloadMainPage);
        }
    }

    render() {
        const { handleCloseDialog, openDialog, videoId, intl } = this.props;
        const { allThumbnails, showLoader, maxUpload } = this.state;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const disableUpload = maxUpload > 9 ? true : false;
        const deleteButtonTooltip = intl.formatMessage({ id: 'thumbnailDeleteTooltip' });
        const cancelLabel = intl.formatMessage({ id: 'cancel' });
        const submitLabel = intl.formatMessage({ id: 'submit' });
        const actions = [
          <FlatButton
            label={cancelLabel}
            onTouchTap={handleCloseDialog}
            disabled={showLoader}
            primary
          />,
          <RaisedButton
            label={submitLabel}
            onTouchTap={() => this.handleThumbnailSubmit(videoId)}
            disabled={showLoader}
            style={styles.submitStyle}
            primary
          />,
        ];
        return (
          <div>
            <Dialog
              title={<h3><FormattedMessage id="thumbnailManagement" /></h3>}
              actions={actions}
              modal
              open={openDialog}
              contentStyle={styles.customContentStyle}
              bodyStyle={styles.bodyStyle}
              actionsContainerStyle={styles.actionsContainerStyle}
              onRequestClose={handleCloseDialog}
              autoScrollBodyContent
            >
              {loadingIndicator}
              <div>
                <RaisedButton
                  label={<FormattedMessage id="thumbnailUpload" />}
                  icon={<FontIcon className="material-icons">camera_alt</FontIcon>}
                  className={classes.thumbnailUploadBtn}
                  disabled={disableUpload}
                  containerElement="label"
                  primary
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className={classes.hideButton}
                    onChange={this.handleFileInputChange}
                    disabled={disableUpload}
                  />
                </RaisedButton>
                <span className={classes.thumbnailSelect}>
                  <FormattedMessage id="thumbnailSelect" />
                </span>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  {(allThumbnails.length) ?
                    <div className={classes.thumbnailContainer}>
                      <ImageGalleryPage
                        allThumbnails={allThumbnails}
                        removeImageThumbnail={this.removeImageThumbnail}
                        buttonTooltip={deleteButtonTooltip}
                        updateToolTip={this.updateToolTip}
                        changeDefaultThumbnail={this.changeDefaultThumbnail}
                      />
                    </div> :
                    null
                  }
                </div>
              </div>
            </Dialog>
          </div>
        );
    }
}

ThumbnailManagement.propTypes = {
    handleCloseDialogOnSubmit: PropTypes.func.isRequired,
    uploadThumbnails: PropTypes.func.isRequired,
    deleteThumbnails: PropTypes.func.isRequired,
    fetchThumbnails: PropTypes.func.isRequired,
    handleCloseDialog: PropTypes.func.isRequired,
    defaultThumbnailAction: PropTypes.func.isRequired,
    videoId: PropTypes.number.isRequired,
    openDialog: PropTypes.bool.isRequired,
    intl: intlShape.isRequired,
};

const mapDispatchToProps = dispatch => ({
    fetchThumbnails(videoId) {
        return dispatch(fetchImageThumbnails(videoId));
    },
    uploadThumbnails(formData, videoId) {
        dispatch(uploadImageThumbnails(formData, videoId));
    },
    deleteThumbnails(data, videoId) {
        dispatch(deleteImageThumbnails(data, videoId));
    },
    defaultThumbnailAction(data) {
        return dispatch(setDefaultThumbnail(data));
    },
});

export default injectIntl(connect(null, mapDispatchToProps)(ThumbnailManagement));
