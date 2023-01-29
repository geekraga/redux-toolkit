import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AWS from 'aws-sdk';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import ChipInput from 'material-ui-chip-input';
import moment from 'moment';
import classnames from 'classnames';
import { pick, trim } from 'lodash';
import { red500 } from 'material-ui/styles/colors';
import {
    TextField,
    SelectField,
    MenuItem,
    AutoComplete,
    RaisedButton,
    FontIcon,
    LinearProgress,
    Chip,
} from 'material-ui';
import ReactTooltip from 'react-tooltip';
import LoadingIndicator from '../../LoadingIndicator';
import MetaTagContent from './MetaTagContent';
import ButtonContainer from '../ButtonContainer';
import { validateVideo, validateUrl } from '../../../util/regexStorage';
import { handleFetchError } from '../../../util/errorHandler';
import endpoints from '../../../endpoints/videoContent';
import { USER_TYPE, AUTO_COMPLETE_SOURCE_CONFIG } from '../../../constants';
import { getMetaTags, uploadVideoData, sendUploadStatus } from '../../../actions/async/videoUpload';
import {
    searchMetaTag,
    deleteMetaTagContent,
    inputChangeMetaTagValue,
    prePolulateMetaTags,
    validateVideoUploadedData,
    setIsValidState,
} from '../../../actions/runTimeSettings';
import classes from './styles.scss';
import styles from './styles';

class TagUploadComponent extends Component {
    constructor(props) {
        super(props);
        const {
            keywords,
            videoLanguageId,
            script,
            phone,
            website,
        } = this.props.videoData;

        this.state = {
            title: '',
            originalTitle: '',
            streamFormat: '',
            searchText: '',
            script: script || '',
            phone: phone || '',
            website: website || '',
            dataSource: [],
            sourceUrl: '',
            progressPercent: 0,
            showLoader: false,
            noVideoUploaded: '',
            keywords,
            videoLanguageId,
            uploadInProgress: false,
            uploadFailure: '',
            langErrorText: '',
            id: '',
            keywordsErrorText: '',
            websiteNameError: false,
        };

        this.errorMessages = {
            languageError: <FormattedMessage id="languageError" />,
            keywordsError: <FormattedMessage id="keywordsError" />,
        };
        this.uploadedFile = null;
        this.getTagsTimer = 0;
        this.cancelTagsRequest = null;

        this.uploadVideo = this.uploadVideo.bind(this);
        this.handleMetaInput = this.handleMetaInput.bind(this);
        this.handleNewRequest = this.handleNewRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.languageChange = this.languageChange.bind(this);
        this.selectVideoData = this.selectVideoData.bind(this);
        this.handleAddKeyword = this.handleAddKeyword.bind(this);
        this.handleDeleteKeyword = this.handleDeleteKeyword.bind(this);
        this.validateUpload = this.validateUpload.bind(this);
        this.isVideoEdited = this.isVideoEdited.bind(this);
        this.handleTagInputChange = this.handleTagInputChange.bind(this);
        this.deleteMetaTagContent = this.deleteMetaTagContent.bind(this);
        this.updateDataAndUploadVideo = this.updateDataAndUploadVideo.bind(this);
        this.editChips = this.editChips.bind(this);
    }

    componentWillMount() {
        const { prePopulate, videoData } = this.props;
        prePopulate(videoData.metatags);
    }

    componentDidMount() {
        ReactTooltip.rebuild();
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        const { isValidState } = this.props;
        const { isValid, videoData } = nextProps;
        if (isValid) {
            isValidState();
            this.setState({ showLoader: true }, () => {
                this.updateDataAndUploadVideo(videoData);
            });
        }
    }

    componentDidUpdate() {
        ReactTooltip.hide();
        ReactTooltip.rebuild();
    }

    updateDataAndUploadVideo(videoData) {
        const { videoToUpdate } = this.props;
        this.props.uploadUserData(videoData).then(
            response => {
                this.setState({ showLoader: false, progressPercent: 0 });
                if (response.status === 200) {
                    const { title } = this.state;
                    if (title) {
                        this.setState({ id: response.data.id }, () => {
                            this.uploadVideo(this.uploadedFile);
                        });
                    } else {
                        const messageToSend = videoToUpdate ? 'videoUpdateSuccess' : 'sourceUrlConfirmation';
                        this.props.loadNext(messageToSend);
                    }
                } else if (response.error.response) {
                    this.setState({ uploadFailure: response.error.response.data.message });
                } else {
                    this.setState({ uploadFailure: 'apiError' });
                }
            });
    }

    uploadVideo(uploadedFile) {
        const { title, streamFormat, id } = this.state;
        const { videoToUpdate } = this.props;
        const bucket = new AWS.S3(endpoints.BUCKET_DIR_PARAMS);
        const params = { Key: title, ContentType: streamFormat, Body: uploadedFile };
        this.setState({ uploadInProgress: true }, () => {
            bucket.upload(params).on('httpUploadProgress', evt => {
                const progressPercent = parseInt(((evt.loaded * 100) / evt.total), 10);
                this.setState({ progressPercent });
            }).send((err, data) => {
                this.setState({ uploadInProgress: false });
                let status = 'success';
                if (err) {
                    status = 'failure';
                }
                const dataToServer = {
                    id,
                    status,
                    key: data.Key,
                };
                this.props.sendStatusToServer(dataToServer);
                const messageToSend = videoToUpdate ? 'videoUpdateSuccess' : 'uploadConfirmation';
                this.props.loadNext(messageToSend);
            });
        });
    }

    isVideoEdited() {
        const { validateTagsAndSendData, videoToUpdate } = this.props;
        const { sourceUrl, title, noVideoUploaded, website } = this.state;
        let isDataLegit = true;
        if (trim(sourceUrl)) {
            if (!validateUrl(sourceUrl)) {
                this.setState({ noVideoUploaded: 'videoUrlError' });
                isDataLegit = false;
            }
        }
        if ((trim(website) ? !validateUrl(website) : false)) {
            this.setState({ websiteNameError: true });
            isDataLegit = false;
        }
        if (!noVideoUploaded && isDataLegit) {
            if (sourceUrl) {
                const updatedData = pick(this.state, [
                    'keywords',
                    'videoLanguageId',
                    'script',
                    'sourceUrl',
                    'website',
                    'phone',
                ]);
                this.setState({ title: '', streamFormat: '', websiteNameError: false });
                updatedData.title = '';
                updatedData.streamFormat = '';
                updatedData.contentId = videoToUpdate;
                validateTagsAndSendData(updatedData);
            } else if (title) {
                const updatedData = pick(this.state, [
                    'keywords',
                    'videoLanguageId',
                    'script',
                    'title',
                    'streamFormat',
                    'website',
                    'phone',
                ]);
                this.setState({ websiteNameError: false });
                updatedData.contentId = videoToUpdate;
                updatedData.sourceUrl = '';
                validateTagsAndSendData(updatedData);
            } else {
                const updatedData = pick(this.state, [
                    'keywords',
                    'videoLanguageId',
                    'script',
                    'title',
                    'streamFormat',
                    'sourceUrl',
                    'website',
                    'phone',
                ]);
                this.setState({ websiteNameError: false });
                updatedData.contentId = videoToUpdate;
                updatedData.isNewVideo = false;
                validateTagsAndSendData(updatedData);
            }
        }
    }

    validateUpload() {
        const { videoLanguageId, sourceUrl, title, website } = this.state;
        const { validateTagsAndSendData, videoToUpdate } = this.props;
        window.scrollTo(0, 0);
        if (videoToUpdate) {
            this.isVideoEdited();
        } else {
            if (videoLanguageId && (title || validateUrl(sourceUrl)) && (trim(website) ? validateUrl(website) : true)) {
                if (sourceUrl) {
                    const updatedData = pick(this.state, [
                        'keywords',
                        'videoLanguageId',
                        'script',
                        'sourceUrl',
                        'website',
                        'phone',
                    ]);
                    updatedData.title = '';
                    updatedData.streamFormat = '';
                    this.setState({ title: '', streamFormat: '', websiteNameError: false });
                    validateTagsAndSendData(updatedData);
                } else {
                    const updatedData = pick(this.state, [
                        'keywords',
                        'videoLanguageId',
                        'script',
                        'title',
                        'streamFormat',
                        'website',
                        'phone',
                    ]);
                    this.setState({ website: '', phone: '', websiteNameError: false });
                    validateTagsAndSendData(updatedData);
                }
            } else {
                if (!videoLanguageId) {
                    this.setState({ langErrorText: this.errorMessages.languageError });
                }
                if (!validateUrl(sourceUrl) && !title) {
                    this.setState({ noVideoUploaded: 'videoUrlError' });
                }
                if ((trim(website) ? !validateUrl(website) : false)) {
                    this.setState({ websiteNameError: true });
                }
                if ((trim(website) ? validateUrl(website) : true)) {
                    this.setState({ websiteNameError: false });
                }
            }
        }
    }

    selectVideoData(event) {
        this.setState({ noVideoUploaded: '', uploadFailure: '' });
        const uploadedFile = event.target.files[0];
        const streamFormat = uploadedFile ? uploadedFile.name.split('.').pop().toLowerCase() : null;
        const videoSize = uploadedFile ? uploadedFile.size : 0;
        if (streamFormat && validateVideo(streamFormat, videoSize)) {
            const fileName = uploadedFile ? uploadedFile.name.split('.').shift().toLowerCase() : null;
            const title = `${fileName}_${moment().format('MMMMDoYYYYhmmssa')}.${streamFormat}`;
            this.setState({ title, streamFormat, originalTitle: uploadedFile.name });
            this.uploadedFile = uploadedFile;
        } else {
            this.setState({ noVideoUploaded: 'invalidVideoUpload' });
            this.setState({ title: '', streamFormat: '', originalTitle: '' });
            this.uploadedFile = null;
        }
    }

    handleMetaInput(searchText) {
        clearTimeout(this.getTagsTimer);
        if (trim(searchText)) {
            this.setState({ searchText });
            this.getTagsTimer = setTimeout(() => {
                const getTagsRequest = this.props.getTags(searchText);
                if (this.cancelTagsRequest) {
                    this.cancelTagsRequest.cancel('Cancel Tags Request');
                    this.cancelTagsRequest = null;
                }
                this.cancelTagsRequest = getTagsRequest;
                getTagsRequest.request.then(
                    response => {
                        const tagList = response.status === 200 ? response.data : [];
                        const metaTagSource = tagList && tagList.map(item => {
                            return {
                                tagid: item.id,
                                tagname: item.tagname,
                            };
                        });
                        this.setState({ dataSource: [...metaTagSource] });
                    }).catch(error => {
                        handleFetchError(error);
                    });
            }, 200);
        } else {
            if (this.cancelTagsRequest) {
                this.cancelTagsRequest.cancel('Cancel Tags Request');
                this.cancelTagsRequest = null;
            }
            this.setState({ dataSource: [] });
        }
    }

    handleNewRequest(chosenRequest) {
        if (typeof chosenRequest === 'object') {
            const { dataSource } = this.state;
            const { addMetaTag, localMetaTagInfo } = this.props;
            const isTagPresent = localMetaTagInfo.some(metatag => metatag.tagid === chosenRequest.tagid);
            if (dataSource.length && !isTagPresent) {
                addMetaTag({ ...chosenRequest,
                    value: '',
                    isDataValid: false,
                    checkValidation: false,
                });
            }
            this.setState({ dataSource: [] });
        }
        this.setState({ searchText: '' });
    }

    handleTagInputChange(keyIndex, e) {
        this.props.handleInputMetaTagChange(keyIndex, e.target.value);
    }

    deleteMetaTagContent(keyIndex) {
        this.props.deleteMetaTag(keyIndex);
    }

    handleInputChange(e) {
        if (e.target.name === 'sourceUrl') {
            this.setState({ [e.target.name]: e.target.value, noVideoUploaded: '', uploadFailure: '' });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    languageChange(e, index, videoLanguageId) {
        this.setState({ videoLanguageId, langErrorText: '' });
    }

    handleAddKeyword(chip) {
        const showError = chip.length > 100;
        const { keywords } = this.state;
        if (showError) {
            this.setState({ keywordsErrorText: this.errorMessages.keywordsError });
        } else {
            this.setState({ keywords: [...keywords, chip], keywordsErrorText: '' });
        }
    }

    handleDeleteKeyword(chip, keyIndex) {
        const keywords = [
            ...this.state.keywords.slice(0, keyIndex),
            ...this.state.keywords.slice(keyIndex + 1),
        ];
        this.setState({ keywords, keywordsErrorText: '' });
    }

    editChips({ value, isFocused, isDisabled, handleClick, handleRequestDelete, defaultStyle }, key) {
        if (!trim(value) || value.length > 100) {
            return null;
        }
        return (
          <Chip
            key={key}
            style={{ ...defaultStyle, maxWidth: '260px' }}
            onRequestDelete={handleRequestDelete}
            className={classes.chipClass}
            data-tip={value}
            data-class={classes.tooltipStyle}
            data-place="bottom"
            data-effect="solid"
          >
            {value}
          </Chip>
        );
    }

    render() {
        const { loadPrevious, languages, localMetaTagInfo, intl, userRole } = this.props;
        const {
            originalTitle,
            videoLanguageId,
            script,
            phone,
            website,
            langErrorText,
            searchText,
            dataSource,
            sourceUrl,
            keywords,
            noVideoUploaded,
            uploadInProgress,
            progressPercent,
            showLoader,
            uploadFailure,
            keywordsErrorText,
            websiteNameError,
        } = this.state;

        const disableUpload = !!sourceUrl;
        const errorVideoUrl = noVideoUploaded === 'videoUrlError' ? { borderColor: red500, borderWidth: '2px' } : {};
        const errorWebsiteName = websiteNameError ? <FormattedMessage id="websiteNameError" /> : null;
        const languageTextValue = <FormattedMessage id="videoLanguage" />;
        const addTagsText = <FormattedMessage id="searchAutoComplete" />;
        const videoUrlText = <FormattedMessage id="videoUrlText" />;
        const videoUrlFoatingText = <FormattedMessage id="videoUrlFoatingText" />;
        const videoScriptText = <FormattedMessage id="videoScriptText" />;
        const phoneText = <FormattedMessage id="phoneText" />;
        const phoneFoatingText = <FormattedMessage id="phoneFoatingText" />;
        const websiteText = <FormattedMessage id="websiteText" />;
        const websiteFoatingText = <FormattedMessage id="websiteFoatingText" />;
        const videoScriptFoatingText = <FormattedMessage id="videoScriptFoatingText" />;
        const keywordsText = <FormattedMessage id="keywords" />;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const keywordsToolTip = intl.formatMessage({ id: 'keywordsToolTip' });
        const tagSearchToolTip = intl.formatMessage({ id: 'tagSearchToolTip' });
        const videoTypeToolTip = intl.formatMessage({ id: 'videoTypeToolTip' });
        const currentLanguage = languages && languages[videoLanguageId - 1].name;
        const userBasedClass = (userRole === USER_TYPE.ADMIN || userRole === USER_TYPE.OPERATOR) ? 'col-xs-12 col-md-6' : 'col-xs-12';

        return (
          <div className={classes.uploadDataContainer}>
            {loadingIndicator}
            <h3 className={classes.heading}>
              <FormattedMessage id="selectVideo" />
            </h3>
            {
              uploadFailure ? (
                <div className={classes.uploadFailure}>
                  <FormattedMessage id={uploadFailure} defaultMessage={uploadFailure} />
                </div>
              ) : null
            }
            <div className="row">
              <div className={classnames('col-xs-12', classes.uploadWrapper)}>
                <div className="row">
                  <div className={classnames('col-xs-12 col-sm-5', classes.uploadButtonContainer)}>
                    <RaisedButton
                      label={<FormattedMessage id="browseVideo" />}
                      icon={<FontIcon className="material-icons">cloud_upload</FontIcon>}
                      disabled={disableUpload}
                      className={classes.uploadButtonWrapper}
                      containerElement="label"
                      primary
                      fullWidth
                    >
                      <input
                        type="file"
                        className={classes.hideButton}
                        onChange={this.selectVideoData}
                        disabled={disableUpload}
                      />
                    </RaisedButton>
                    <FontIcon
                      className={classnames(classes.uploadButtonTooltip, 'material-icons')}
                      data-tip={videoTypeToolTip}
                      data-class={classes.tooltipStyle}
                      data-place="bottom"
                      data-effect="solid"
                    >
                      info
                    </FontIcon>

                  </div>
                  <div className={classnames('col-xs-12 col-sm-1', classes.orContent)}>
                    <FormattedMessage id="or" />
                  </div>
                  <div className={classnames('col-xs-12 col-sm-6', classes.sourceContainer)}>
                    <TextField
                      hintText={videoUrlText}
                      floatingLabelText={videoUrlFoatingText}
                      value={sourceUrl}
                      name="sourceUrl"
                      onChange={this.handleInputChange}
                      maxLength="2000"
                      underlineStyle={errorVideoUrl}
                      fullWidth
                    />
                  </div>
                </div>
                {
                  noVideoUploaded ? (
                    <div className={classes.noVideoUploaded}>
                      <FormattedMessage id={noVideoUploaded} />
                    </div>
                  ) : null
                }
                {
                  (originalTitle && !disableUpload) ? (
                    <div
                      className={classes.titleContainer}
                      data-tip={originalTitle}
                      data-class={classes.tooltipStyle}
                      data-place="bottom"
                      data-effect="solid"
                    >
                      {originalTitle}
                    </div>
                  ) : null
                }
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <span className={classes.languageLabel}>
                  <FormattedMessage id="languagueNotification" values={{ currentLanguage }} />
                </span>
                <SelectField
                  hintText={languageTextValue}
                  value={videoLanguageId}
                  onChange={this.languageChange}
                  errorText={langErrorText}
                  style={styles.languageRootStyle}
                  menuItemStyle={styles.languageMenuItemStyle}
                >
                  {(languages.map(item => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                      primaryText={item.name}
                    />
                  )))}
                </SelectField>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <TextField
                  hintText={videoScriptText}
                  floatingLabelText={videoScriptFoatingText}
                  value={script}
                  name="script"
                  onChange={this.handleInputChange}
                  maxLength="2000"
                  rowsMax={4}
                  multiLine
                  fullWidth
                />
              </div>
              <div className="col-sm-6 col-xs-12">
                <TextField
                  hintText={phoneText}
                  floatingLabelText={phoneFoatingText}
                  value={phone}
                  name="phone"
                  onChange={this.handleInputChange}
                  maxLength="15"
                  fullWidth
                />
              </div>
              <div className="col-sm-6 col-xs-12">
                <TextField
                  hintText={websiteText}
                  floatingLabelText={websiteFoatingText}
                  value={website}
                  name="website"
                  onChange={this.handleInputChange}
                  maxLength="1000"
                  errorText={errorWebsiteName}
                  fullWidth
                />
              </div>
            </div>

            <div className="row">
              {
                (userRole === USER_TYPE.ADMIN || userRole === USER_TYPE.OPERATOR) ?
                  (
                    <div className={userBasedClass}>
                      <h3 className={classes.tagHeader}>
                        <FormattedMessage id="addTags" />
                        <FontIcon
                          className={classnames(classes.infoIcon, 'material-icons')}
                          data-tip={tagSearchToolTip}
                          data-class={classes.tooltipRightStyle}
                          data-place="right"
                          data-effect="solid"
                        >
                          info
                        </FontIcon>
                      </h3>
                      <div className={classes.tagContainer}>
                        <div className="row">
                          <div className="col-xs-12">
                            <div className={classes.autoCompleteContainer}>
                              <AutoComplete
                                hintText={addTagsText}
                                floatingLabelText={addTagsText}
                                searchText={searchText}
                                onUpdateInput={this.handleMetaInput}
                                onNewRequest={this.handleNewRequest}
                                dataSource={dataSource}
                                dataSourceConfig={AUTO_COMPLETE_SOURCE_CONFIG}
                                listStyle={styles.autoCompleteList}
                                filter={AutoComplete.caseInsensitiveFilter}
                                fullWidth
                                openOnFocus
                              />
                            </div>
                          </div>
                        </div>
                        {
                          (localMetaTagInfo.map((tag, i) => (
                            <MetaTagContent
                              key={tag.tagid}
                              localMetaTagInfo={localMetaTagInfo}
                              keyIndex={i}
                              deleteMetaTagContent={this.deleteMetaTagContent}
                              handleInputChange={(index, e) => this.handleTagInputChange(index, e)}
                            />
                          )))
                        }
                      </div>
                    </div>
                  ) : null
              }
              <div className={classnames(userBasedClass, classes.chipContainerStyles)}>
                <h3 className={classes.tagHeader}>
                  <FormattedMessage id="addKeywords" />
                  <FontIcon
                    className={classnames(classes.infoIcon, 'material-icons')}
                    data-tip={keywordsToolTip}
                    data-class={classes.tooltipRightStyle}
                    data-place="right"
                    data-effect="solid"
                  >
                    info
                  </FontIcon>
                </h3>
                <div className={classes.chipContainerWrapper}>
                  <ChipInput
                    value={keywords}
                    onRequestAdd={chip => this.handleAddKeyword(chip)}
                    onRequestDelete={(chip, index) => this.handleDeleteKeyword(chip, index)}
                    chipRenderer={this.editChips}
                    hintText={keywordsText}
                    floatingLabelText={keywordsText}
                    style={styles.chipStyle}
                    errorText={keywordsErrorText}
                    fullWidth
                  />
                </div>
              </div>
            </div>
            {
              uploadInProgress ? (
                <div className={classes.progressContainerOuter}>
                  <div className={classes.progressContainerBackground}>
                    <LinearProgress
                      mode="determinate"
                      value={progressPercent}
                      style={styles.progressBar}
                      color={styles.progressBarColor}
                    />
                    <div className={classes.progressContent}>
                      {progressPercent}<FormattedMessage id="uploadPercent" />
                    </div>
                  </div>
                </div>
              ) : null
            }
            <ButtonContainer
              previousBtnHandler={loadPrevious}
              nextBtnHandler={this.validateUpload}
              nextBtnLabel={'submit'}
            />
          </div>
        );
    }
}

TagUploadComponent.propTypes = {
    userRole: PropTypes.string.isRequired,
    languages: PropTypes.array.isRequired,
    localMetaTagInfo: PropTypes.array.isRequired,
    videoData: PropTypes.object.isRequired,
    isValid: PropTypes.bool.isRequired,
    loadNext: PropTypes.func.isRequired,
    loadPrevious: PropTypes.func.isRequired,
    getTags: PropTypes.func.isRequired,
    isValidState: PropTypes.func.isRequired,
    prePopulate: PropTypes.func.isRequired,
    uploadUserData: PropTypes.func.isRequired,
    sendStatusToServer: PropTypes.func.isRequired,
    validateTagsAndSendData: PropTypes.func.isRequired,
    addMetaTag: PropTypes.func.isRequired,
    deleteMetaTag: PropTypes.func.isRequired,
    handleInputMetaTagChange: PropTypes.func.isRequired,
    videoToUpdate: PropTypes.number.isRequired,
    intl: intlShape.isRequired,
};

const mapStateToProps = reduxState => ({
    languages: reduxState.languages,
    localMetaTagInfo: reduxState.runtimeSettings.localMetaTagInfo,
    videoData: reduxState.runtimeSettings.videoData,
    isValid: reduxState.runtimeSettings.isValid,
    videoToUpdate: reduxState.runtimeSettings.videoToUpdate,
});

const mapDispatchToProps = dispatch => ({
    getTags(data) {
        return dispatch(getMetaTags(data));
    },
    prePopulate(metaTags) {
        return dispatch(prePolulateMetaTags(metaTags));
    },
    addMetaTag(tagData) {
        return dispatch(searchMetaTag(tagData));
    },
    deleteMetaTag(keyIndex) {
        return dispatch(deleteMetaTagContent(keyIndex));
    },
    handleInputMetaTagChange(keyIndex, value) {
        return dispatch(inputChangeMetaTagValue(keyIndex, value));
    },
    validateTagsAndSendData(data) {
        return dispatch(validateVideoUploadedData(data));
    },
    isValidState() {
        dispatch(setIsValidState());
    },
    uploadUserData(data) {
        return dispatch(uploadVideoData(data));
    },
    sendStatusToServer(data) {
        dispatch(sendUploadStatus(data));
    },
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TagUploadComponent));
