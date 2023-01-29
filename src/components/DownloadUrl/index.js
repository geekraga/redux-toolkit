import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import FontIcon from 'material-ui/FontIcon';
import ImageGalleryPage from '../ImageCarousel/ImageGallery';
import { fetchDownloadUrls } from '../../actions/async/videoManagement';
import { emptyPrepopulatedDownloads } from '../../actions/videoList';
import endpoints from '../../endpoints/videoManagement';
import LoadingIndicator from '../LoadingIndicator';
import styles from './styles';
import classes from './styles.scss';

class DownloadUrls extends Component {
    static allThumbnails(data) {
        const thumbnails = data.map(item => ({ dataUrl: item.downloadUrl }));
        return thumbnails;
    }

    constructor(props) {
        super(props);
        this.state = {
            showLoader: true,
        };
        this.updateToolTip = this.updateToolTip.bind(this);
    }

    componentWillMount() {
        ReactTooltip.hide();
        const { emptyContent } = this.props;
        emptyContent();
    }

    componentDidMount() {
        ReactTooltip.rebuild();
        const { contentId, getUrls } = this.props;
        getUrls(contentId).then(() => {
            this.setState({ showLoader: false });
        });
    }

    updateToolTip() {
        ReactTooltip.rebuild();
        window.dispatchEvent(new Event('resize'));
    }

    render() {
        const { showLoader } = this.state;
        const { downloadUrls, intl } = this.props;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const downloadThumbnailTip = intl.formatMessage({ id: 'downloadThumbnailTip' });
        const downloadVideoTip = intl.formatMessage({ id: 'downloadVideoTip' });
        const downloadVideoContent = intl.formatMessage({ id: 'downloadVideoContent' });
        return (
          <div className={classes.downloadContentContainer}>
            {loadingIndicator}
            <div className="row">
              {(downloadUrls && downloadUrls.contentUrl) ?
                <div className="col-sm-offset-2 col-sm-8 col-xs-12">
                  <figure className={classes.thumbnailContainer}>
                    <img
                      src={downloadUrls.contentUrl.thumbnailUrl}
                      className={classes.thumbnail}
                      alt={<FormattedMessage id="NoPreview" />}
                    />
                    <div className={classes.videoText}>
                      {downloadVideoContent}
                      <a
                        href={downloadUrls.contentUrl.downloadUrl}
                        className={classes.thumbnailDownloader}
                      >
                        <FontIcon
                          className="material-icons"
                          style={styles.playButton}
                          data-tip={downloadVideoTip}
                          data-class={classes.tooltipStyle}
                          data-place="bottom"
                          data-effect="solid"
                        >
                          archive
                        </FontIcon>
                      </a>
                    </div>
                  </figure>

                  <a
                    href={`${endpoints.fileBasePath}${downloadUrls.infofile}`}
                    className={classes.videoContentButton}
                  >
                    Download Video Content
                  </a>
                </div>
                :
                null}
              <div className="col-xs-12" style={styles.imageContainer} >
                {(downloadUrls.thumbnails) ?
                  <ImageGalleryPage
                    allThumbnails={DownloadUrls.allThumbnails(downloadUrls.thumbnails)}
                    buttonTooltip={downloadThumbnailTip}
                    isDownloadable
                    updateToolTip={this.updateToolTip}
                  /> :
                  null
                }
              </div>
            </div>
          </div>
        );
    }
}

DownloadUrls.propTypes = {
    getUrls: PropTypes.func.isRequired,
    emptyContent: PropTypes.func.isRequired,
    contentId: PropTypes.number.isRequired,
    downloadUrls: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
};

const mapStateToProps = reduxState => ({
    downloadUrls: reduxState.videoList.downloadUrls,
    isFormPageValid: reduxState.runtimeSettings.isFormPageValid,
});

const mapDispatchToProps = dispatch => ({
    emptyContent() {
        return dispatch(emptyPrepopulatedDownloads());
    },
    getUrls(contentId) {
        return dispatch(fetchDownloadUrls(contentId));
    },
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(DownloadUrls));
