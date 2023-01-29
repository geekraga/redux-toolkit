import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import trim from 'lodash/trim';
import c from 'classnames';
import { AutoComplete, RaisedButton } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import { AUTO_COMPLETE_PROPERTY_SOURCE_CONFIG } from '../../constants';
import PropertyContent from './propertyContent';
import LoadingIndicator from '../LoadingIndicator';
import {
    emptyVideoInfo,
    addNewContent,
    handleContentInput,
    deleteLinkVideoContent,
    validateLinkVideosData,
} from '../../actions/propertyInformation';
import {
    fetchLanguagesName,
} from '../../actions/async/propertyManagement';
import styles from './styles';
import classesForm from '../UserFormPage/styles.scss';
import classes from './styles.scss';

class VideosAssociated extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchtext: '',
        };
        this.videoTimer = 0;
        this.cancelVideoRequest = null;
    }

    componentWillReceiveProps(newProps) {
        const { uploadPropertyData } = this.props;
        const { isAllDataValid, videoAssociationList } = newProps;
        if (isAllDataValid) {
            uploadPropertyData(videoAssociationList);
        }
    }

    handleAutoCompleteInput = hintText => {
        if (trim(hintText)) {
            this.setState({ searchText: hintText });
            clearTimeout(this.videoTimer);
            this.videoTimer = setTimeout(() => {
                if (this.cancelVideoRequest) {
                    this.cancelVideoRequest.cancel('Cancel Video Request');
                    this.cancelVideoRequest = null;
                }
                this.cancelVideoRequest = this.props.getPropertyNames(hintText);
            }, 200);
        } else {
            if (this.cancelVideoRequest) {
                this.cancelVideoRequest.cancel('Cancel Video Request');
                this.cancelVideoRequest = null;
            }
            this.props.emptyVideoSearch();
        }
    }

    handleNewRequest = chosenRequest => {
        const { addVideoContent } = this.props;
        if (chosenRequest === Object(chosenRequest)) {
            addVideoContent(chosenRequest);
            if (this.cancelVideoRequest) {
                this.cancelVideoRequest.cancel('Cancel Video Request');
                this.cancelVideoRequest = null;
            }
        }
        this.setState({ searchText: '' });
    }

    deleteRow = keyIndex => {
        ReactTooltip.hide();
        this.props.deleteVideoContent(keyIndex);
    }

    handleVideosInputChange = (e, index, value, keyIndex, name) => {
        this.props.handleLanguageChange(keyIndex, value, name);
    }

    render() {
        const { searchText } = this.state;
        const {
            videoCategory,
            videoAssociationList,
            displayOrderCategory,
            videoNameHintSearch,
            previewContent,
            validateLinkVideos,
            hideRecommendedVideos,
            showLoader,
        } = this.props;
        const videoNameHint = <FormattedMessage id="videoNameHint" />;
        const searchVideoText = <FormattedMessage id="searchVideoText" />;

        return (
          <div>
            { showLoader && <LoadingIndicator />}
            <div className="row">
              <div className="col-xs-12">
                <h3 className={classesForm.tagHeader}>
                  <FormattedMessage id="linkVideos" />
                </h3>
                <div>
                  <div className="row">
                    <div className="col-xs-12">
                      <div>
                        <AutoComplete
                          hintText={videoNameHint}
                          floatingLabelText={searchVideoText}
                          dataSource={videoNameHintSearch}
                          onUpdateInput={this.handleAutoCompleteInput}
                          onNewRequest={this.handleNewRequest}
                          filter={AutoComplete.caseInsensitiveFilter}
                          dataSourceConfig={AUTO_COMPLETE_PROPERTY_SOURCE_CONFIG}
                          listStyle={styles.autoCompleteList}
                          style={styles.autoCompleteStyle}
                          searchText={searchText}
                          openOnFocus
                          fullWidth
                          animated
                        />
                      </div>
                    </div>
                  </div>
                  {
                    (videoAssociationList && videoAssociationList.map((item, i) => (
                      <PropertyContent
                        key={i}
                        keyIndex={i}
                        videoCategory={videoCategory}
                        videoAssociationList={videoAssociationList}
                        displayOrderCategory={displayOrderCategory}
                        deleteRow={this.deleteRow}
                        handleVideosInputChange={this.handleVideosInputChange}
                        previewContent={previewContent}
                      />
                    )))
                  }
                </div>
                <div className={c('col-xs-12', classes.buttonContainer)}>
                  <RaisedButton
                    label={<FormattedMessage id="back" />}
                    className={classes.cancelButtonLink}
                    onClick={hideRecommendedVideos}
                  />
                  <RaisedButton
                    label={<FormattedMessage id="publish" />}
                    className={classes.btnSubDetails}
                    onClick={validateLinkVideos}
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
}

VideosAssociated.propTypes = {
    videoCategory: PropTypes.array.isRequired,
    videoAssociationList: PropTypes.array.isRequired,
    displayOrderCategory: PropTypes.array.isRequired,
    videoNameHintSearch: PropTypes.array.isRequired,
    emptyVideoSearch: PropTypes.func.isRequired,
    addVideoContent: PropTypes.func.isRequired,
    deleteVideoContent: PropTypes.func.isRequired,
    handleLanguageChange: PropTypes.func.isRequired,
    validateLinkVideos: PropTypes.func.isRequired,
    getPropertyNames: PropTypes.func.isRequired,
    hideRecommendedVideos: PropTypes.func.isRequired,
    previewContent: PropTypes.func.isRequired,
    uploadPropertyData: PropTypes.func.isRequired,
    showLoader: PropTypes.bool.isRequired,
    isAllDataValid: PropTypes.bool.isRequired,
};

const mapStateToProps = reduxState => ({
    videoCategory: reduxState.propertyInformation.videoCategories,
    videoAssociationList: reduxState.propertyInformation.videoAssociationList,
    displayOrderCategory: reduxState.propertyInformation.displayOrderCategory,
    videoNameHintSearch: reduxState.propertyInformation.videoNameHintSearch,
    isAllDataValid: reduxState.propertyInformation.isAllDataValid,
});

const mapDispatchToProps = dispatch => ({
    emptyVideoSearch() {
        return dispatch(emptyVideoInfo());
    },
    addVideoContent(data) {
        return dispatch(addNewContent(data));
    },
    deleteVideoContent(keyIndex) {
        dispatch(deleteLinkVideoContent(keyIndex));
    },
    handleLanguageChange(keyIndex, value, name) {
        dispatch(handleContentInput(keyIndex, value, name));
    },
    validateLinkVideos() {
        return dispatch(validateLinkVideosData());
    },
    getPropertyNames(hintText) {
        return dispatch(fetchLanguagesName(hintText));
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(VideosAssociated);
