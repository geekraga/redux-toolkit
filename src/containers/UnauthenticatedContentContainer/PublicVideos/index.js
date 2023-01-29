import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import isEmpty from 'lodash/isEmpty';
import c from 'classnames';
import {
  Popover,
  PopoverAnimationVertical,
  RaisedButton,
  Menu,
  MenuItem,
} from 'material-ui';
import ReactGA from 'react-ga';
import Footer from './Footer';
import LinkItem from '../../../components/LinkItem';
import PropertyVideos from '../../../components/PropertyVideos';
import VideoDialog from '../../../components/PropertyVideos/videoDialog';
import MobilePlayer from '../../../components/PropertyVideos/MobilePlayer';
import LoadingIndicator from '../../../components/LoadingIndicator';
import SlideShow from '../../../components/PropertyVideos/SlideShow';
import {
    fetchVideoCategories,
    fetchLanguages,
    fetchHostdetails,
    addVideosInCategory,
    fetchSlides,
} from '../../../actions/async/publicVideos';
import { freeCategoryData } from '../../../actions/videoList';
import { updateCurrentPage } from '../../../actions/runTimeSettings';
import { PROPERTY_CONTENT, CATEGORY_VIDEOS_SIZE } from '../../../constants';
import classes from './styles.scss';
import styles from './styles';

class PublicVideos extends Component {
    constructor(props) {
        super(props);
        const propertyId = props.match.params.property;
        this.state = {
            showLoader: true,
            isDataLoaded: false,
            isLanguagesLodaed: false,
            propertyId,
            heightContainer: '100px',
            widthContainer: null,
            messageToShow: 'noContentAvailablePublic',
            errorClass: false,
            openMenu: false,
            openMobileMenu: false,
            showTextContent: true,
            selectedVideoData: {},
            isDialogOpen: false,
            isMobileDialogOpen: false,
            isSlideDialogOpen: false,
            showMobileLoader: true,
            langId: 1,
            langToDisplay: '',
            languageSelectedCount: 0,
        };
        this.updateContentDimensions = this.updateContentDimensions.bind(this);
        this.getVideoList = this.getVideoList.bind(this);
        this.languageMenuHandler = this.languageMenuHandler.bind(this);
        this.languageMobileMenuHandler = this.languageMobileMenuHandler.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.updateLanguage = this.updateLanguage.bind(this);
        this.hideTextContent = this.hideTextContent.bind(this);
        this.previewContent = this.previewContent.bind(this);
        this.hideMobileContent = this.hideMobileContent.bind(this);
        this.hideMobileLoader = this.hideMobileLoader.bind(this);
        this.updatePreviewContent = this.updatePreviewContent.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateContentDimensions);
        this.props.updateCurrentComponent(-1);
        this.props.getLanguages().then(response => {
            const languages = response.data;
            let langToDisplay = '';
            if (languages && languages.length) {
                langToDisplay = languages[0].name;
            }
            if (response.status === 200) {
                this.setState({ isLanguagesLodaed: true, langToDisplay });
            } else {
                this.setState({ isLanguagesLodaed: false, langToDisplay });
            }
        });
        this.props.getHostdetails(this.state.propertyId).then(response => {
            const propertyId = window.location.pathname.split('videoList/')[1];
            const page = (response && response.data) ? `/videoList/${response.data.propertyName}/${propertyId}` : null;
            if (page) {
                ReactGA.set({ page });
                ReactGA.pageview(page);
            }
        });
        this.getVideoList();
        this.updateContentDimensions();
    }

    componentDidUpdate() {
        ReactTooltip.rebuild();
    }

    componentWillUnmount() {
        const { propertyName } = this.props;
        ReactGA.event({
            category: propertyName,
            action: 'Language Control selected count',
            value: this.state.languageSelectedCount,
        });
        window.removeEventListener('resize', this.updateContentDimensions);
    }

    getVideoList() {
        const { propertyId, langId } = this.state;
        this.props.getVideoCategories({ propertyId, langId, size: CATEGORY_VIDEOS_SIZE }).then(response => {
            if (response.status === 200) {
                this.setState({ showLoader: false, isDataLoaded: true });
            } else if (response.error.response) {
                this.setState({
                    showLoader: false,
                    messageToShow: 'errorPublicMessage',
                    errorClass: true,
                    isDataLoaded: true,
                    isLanguagesLodaed: false,
                });
            } else {
                this.setState({
                    showLoader: false,
                    messageToShow: 'apiError',
                    errorClass: true,
                    isDataLoaded: true,
                    isLanguagesLodaed: false,
                });
            }
        });
    }

    updateContentDimensions() {
        const heightContainer = `${window.innerHeight}px`;
        const widthContainer = window.innerWidth;
        this.setState({ heightContainer, widthContainer });
    }

    languageMenuHandler(event) {
        event.preventDefault();
        this.setState({ openMenu: !this.state.openMenu, anchorEl: event.currentTarget });
    }

    languageMobileMenuHandler(event) {
        event.preventDefault();
        this.setState({ openMobileMenu: !this.state.openMobileMenu, anchorEl: event.currentTarget });
    }

    handleLanguageChange() {
        this.setState({ openMenu: false, openMobileMenu: false });
    }

    updateLanguage(langObj) {
        const { id, name } = langObj;
        const { languageSelectedCount } = this.state;
        const { propertyName, clearCategoryData } = this.props;
        ReactGA.event({
            category: propertyName,
            action: 'Language selected',
            label: name,
        });
        clearCategoryData();
        this.setState({
            openMenu: false,
            openMobileMenu: false,
            isDataLoaded: false,
            langId: id,
            langToDisplay: name,
            showLoader: true,
            languageSelectedCount: languageSelectedCount + 1,
        }, () => {
            this.getVideoList();
        });
    }

    hideTextContent() {
        this.setState({ showTextContent: false });
    }

    hideMobileContent() {
        this.setState({ isMobileDialogOpen: false });
        window.document.body.style.overflowY = 'auto';
    }

    hideMobileLoader() {
        this.setState({ showMobileLoader: false });
    }

    previewContent(data, breakVideoPlayList, isDialogOpen = true, isMobileDialogOpen = false) {
        const isItemSlide = data.contentGroup === PROPERTY_CONTENT;
        this.setState({ selectedVideoData: { ...data, breakVideoPlayList } });
        const { hostVideoTypeId } = data;
        const { propertyId } = this.state;
        if (isItemSlide) {
            this.setState({ showLoader: true });
            this.props.getSlideData({ propertyId, hostVideoTypeId }).then(() => {
                this.setState({ showLoader: false, isSlideDialogOpen: true });
            });
        } else {
            this.setState({ isDialogOpen, isMobileDialogOpen });
        }
    }

    closeSlideShow = () => {
        this.setState({ isSlideDialogOpen: false });
    }

    updatePreviewContent(videoUrl) {
        window.dispatchEvent(new Event('resize'));
        const { videoList } = this.props;
        Object.keys(videoList).forEach(videoCategory => {
            const data = videoList[videoCategory].contentDetail.find(videoItem => videoItem.videoUrl === videoUrl);
            if (data) {
                this.setState({ selectedVideoData: { ...data } });
            }
        });
    }

    handleClose() {
        this.setState({ isDialogOpen: false });
    }

    addCategoryVideos = (categoryInfo, categoryName) => {
        const { categoryId, pageNumber, contentDetail, total } = categoryInfo;
        const { propertyId, langId } = this.state;
        const bodyObj = {
            propertyId,
            categoryId,
            categoryName,
            langId,
            page: pageNumber + 1,
            size: CATEGORY_VIDEOS_SIZE,
        };
        if (total > contentDetail.length) {
            this.props.updateCategoryVideos(bodyObj);
        }
    }

    showHideLoadingIndicator = showLoader => {
        this.setState({ showLoader });
    }

    render() {
        const { videoList, languages, hostName, hostAvatar, propertyName, intl } = this.props;
        const {
            heightContainer,
            widthContainer,
            showLoader,
            isDataLoaded,
            isLanguagesLodaed,
            langToDisplay,
            messageToShow,
            errorClass,
            openMenu,
            openMobileMenu,
            anchorEl,
            showTextContent,
            selectedVideoData,
            isDialogOpen,
            isMobileDialogOpen,
            isSlideDialogOpen,
            showMobileLoader,
            propertyId,
            langId,
        } = this.state;
        const hostHeadStart = intl.formatMessage({ id: 'hostHeadStart' });
        const hostHeadText = intl.formatMessage({ id: 'hostHeadText' }, { name: hostName.split(' ')[0] });
        const hostSubText = intl.formatMessage({ id: 'hostSubText' });
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const reponseClass = errorClass ? classes.failure : '';

        return (
          <div className={classes.mainContainer} style={{ minHeight: heightContainer }}>
            {loadingIndicator}
            <div className={classes.headerOuterMain}>
              <div className={classes.headerMain}>
                <LinkItem to={'/'} linkClass={classes.logoHead}>
                  <img src={require('../../../public/logo.png')} alt="" />
                </LinkItem>
                {
                  (isLanguagesLodaed && isDataLoaded) ? (
                    <div className={classes.desktopMenuWrapper}>
                      <div className={classes.hostMenuWrapper}>
                        <img src={hostAvatar} alt="" />
                        <div className={classes.hostDetails}>
                          <h3>
                            {hostName}
                          </h3>
                          <p>
                            {propertyName}
                          </p>
                        </div>
                      </div>
                      <RaisedButton
                        onTouchTap={this.languageMenuHandler}
                        label={langToDisplay}
                        icon={
                          <i className={c('material-icons', classes.btnIcon)}>
                            {openMenu ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                          </i>
                        }
                        className={classes.languageButton}
                        labelPosition="before"
                        buttonStyle={styles.buttonStyle}
                        labelStyle={styles.labelStyle}
                        overlayStyle={styles.overlayStyle}
                        style={styles.buttonMainStyle}
                        primary
                      />
                      <Popover
                        open={openMenu}
                        anchorEl={anchorEl}
                        onRequestClose={this.handleLanguageChange}
                        animation={PopoverAnimationVertical}
                      >
                        <Menu
                          autoWidth
                          maxHeight={300}
                        >
                          {(languages.map(item => (
                            <MenuItem
                              key={item.id}
                              value={item.id}
                              primaryText={item.name}
                              onClick={() => this.updateLanguage(item)}
                            />
                          )))}
                        </Menu>
                      </Popover>
                    </div>
                  ) : null
                }
              </div>
              {
                (isLanguagesLodaed && isDataLoaded) ? (
                  <div>
                    <div className={c(classes.upperTextContainer, { [classes.hideContent]: !showTextContent })}>
                      <h2>
                        {hostHeadStart}
                        <span className={classes.headDynamic}>{hostHeadText}</span>
                        <i
                          className={c('material-icons', classes.closeTextContainer)}
                          onClick={this.hideTextContent}
                        >
                          close
                        </i>
                      </h2>
                      <p>
                        <span className={classes.mobileText}>{hostHeadText}</span>
                        {hostSubText}
                      </p>
                    </div>
                    <div className={classes.mobileDropContainer}>
                      <div className={classes.hostMenuWrapper}>
                        <img src={hostAvatar} alt="" />
                        <div className={classes.hostDetails}>
                          <h3>
                            {hostName}
                          </h3>
                          <p>
                            {propertyName}
                          </p>
                        </div>
                      </div>
                      <RaisedButton
                        onTouchTap={this.languageMobileMenuHandler}
                        label={langToDisplay}
                        icon={
                          <i className={c('material-icons', classes.btnIcon)}>
                            {openMobileMenu ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                          </i>
                        }
                        className={classes.mobileButton}
                        labelPosition="before"
                        buttonStyle={styles.buttonMobileStyle}
                        labelStyle={styles.labelMobileStyle}
                        overlayStyle={styles.overlayMobileStyle}
                        style={styles.buttonMainMobileStyle}
                        primary
                      />
                      <Popover
                        open={openMobileMenu}
                        anchorEl={anchorEl}
                        onRequestClose={this.handleLanguageChange}
                        animation={PopoverAnimationVertical}
                      >
                        <Menu
                          menuItemStyle={styles.menuItemStyle}
                        >
                          {(languages.map(item => (
                            <MenuItem
                              key={item.id}
                              value={item.id}
                              primaryText={item.name}
                              onClick={() => this.updateLanguage(item)}
                            />
                          )))}
                        </Menu>
                      </Popover>
                      <div className={classes.tvIconOuter} />
                    </div>
                  </div>
                ) : null
              }
            </div>
            {
              (!isEmpty(videoList) && isDataLoaded) ? (
                <PropertyVideos
                  videoList={videoList}
                  previewContent={this.previewContent}
                  addCategoryVideos={this.addCategoryVideos}
                  showHideLoadingIndicator={this.showHideLoadingIndicator}
                  propertyId={propertyId}
                  langId={langId}
                  currentWidth={widthContainer}
                />
              ) : null
            }
            {
              (isDataLoaded && isEmpty(videoList)) ?
                (
                  <div className={c(classes.videoActionResponse, reponseClass)}>
                    <FormattedMessage id={messageToShow} defaultMessage={messageToShow} values={{ langToDisplay }} />
                  </div>
                ) : null
            }
            {
              isDialogOpen ?
                <VideoDialog
                  selectedVideoData={selectedVideoData}
                  updatePreviewContent={this.updatePreviewContent}
                  handleClose={this.handleClose}
                  isOpen={isDialogOpen}
                  propertyName={propertyName}
                /> :
                null
            }
            <MobilePlayer
              selectedVideoData={selectedVideoData}
              propertyName={propertyName}
              updatePreviewContent={this.updatePreviewContent}
              hideMobilePlayer={this.hideMobileContent}
              showPlayer={isMobileDialogOpen}
              hidePlayerLoader={this.hideMobileLoader}
              showMobileLoader={showMobileLoader}
            />

            <SlideShow
              openSlides={isSlideDialogOpen}
              title={selectedVideoData.videoName}
              closeSlideShow={this.closeSlideShow}
            />
            <Footer />
          </div>
        );
    }
}

PublicVideos.propTypes = {
    match: PropTypes.object.isRequired,
    videoList: PropTypes.object.isRequired,
    getLanguages: PropTypes.func.isRequired,
    getVideoCategories: PropTypes.func.isRequired,
    getHostdetails: PropTypes.func.isRequired,
    updateCategoryVideos: PropTypes.func.isRequired,
    clearCategoryData: PropTypes.func.isRequired,
    updateCurrentComponent: PropTypes.func.isRequired,
    getSlideData: PropTypes.func.isRequired,
    languages: PropTypes.array.isRequired,
    hostName: PropTypes.string.isRequired,
    hostAvatar: PropTypes.string.isRequired,
    propertyName: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
};

const mapStateToProps = reduxState => ({
    videoList: reduxState.publicVideos.categories,
    hostName: reduxState.publicVideos.hostName,
    hostAvatar: reduxState.publicVideos.hostAvatar,
    propertyName: reduxState.publicVideos.propertyName,
    languages: reduxState.languages,
});

const mapDispatchToProps = dispatch => ({
    getVideoCategories(data) {
        return dispatch(fetchVideoCategories(data));
    },
    getSlideData(data) {
        return dispatch(fetchSlides(data));
    },
    updateCategoryVideos(data) {
        dispatch(addVideosInCategory(data));
    },
    getLanguages() {
        return dispatch(fetchLanguages());
    },
    getHostdetails(data) {
        return dispatch(fetchHostdetails(data));
    },
    clearCategoryData() {
        dispatch(freeCategoryData());
    },
    updateCurrentComponent(data) {
        return dispatch(updateCurrentPage(data));
    },
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(PublicVideos));
