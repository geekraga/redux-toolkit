import React, { Component, PropTypes } from 'react';
import ImageGallery from 'react-image-gallery';
import c from 'classnames';
import { FontIcon, Toggle } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import styles from '../ThumbnailDialog/styles';
import classes from '../ThumbnailDialog/styles.scss';
import './style.ignoreHash.css';

class ImageGalleryPage extends Component {
    constructor() {
        super();
        this.state = {
            currentImageIndex: 0,
        };
        this.galleryConfig = {
            showIndex: false,
            slideOnThumbnailHover: false,
            showBullets: true,
            infinite: true,
            showThumbnails: true,
            showFullscreenButton: true,
            showGalleryFullscreenButton: true,
            showPlayButton: true,
            showGalleryPlayButton: true,
            showNav: true,
            slideDuration: 450,
            slideInterval: 2000,
            thumbnailPosition: 'bottom',

        };
        this.getStaticImages = this.getStaticImages.bind(this);
        this.changeImageIndex = this.changeImageIndex.bind(this);
        this.downloadThumbnail = this.downloadThumbnail.bind(this);
        this.deleteThumbnail = this.deleteThumbnail.bind(this);
        this.updateThumbnail = this.updateThumbnail.bind(this);
    }

    getStaticImages(allThumbnails) {
        const images = [];
        allThumbnails.forEach(item => {
            images.push({
                original: item.dataUrl,
                thumbnail: item.dataUrl,
            });
        });
        return images;
    }

    changeImageIndex(currentImageIndex) {
        this.setState({ currentImageIndex });
    }

    downloadThumbnail(allThumbnails) {
        const { currentImageIndex } = this.state;
        const { buttonTooltip } = this.props;
        return (
          <a href={allThumbnails.length ? allThumbnails[currentImageIndex].dataUrl : null}>
            <FontIcon
              className={c('material-icons', classes.customDownloadButton)}
              data-tip={buttonTooltip}
              data-class={classes.tooltipStyle}
              data-place="bottom"
              data-effect="solid"
            >
              archive
            </FontIcon>
          </a>
        );
    }

    updateThumbnail(currentImageIndex) {
        this.setState({ currentImageIndex });
        this.props.changeDefaultThumbnail(currentImageIndex);
    }

    deleteThumbnail(allThumbnails) {
        const { currentImageIndex } = this.state;
        const { removeImageThumbnail, buttonTooltip } = this.props;
        const isDefault = allThumbnails[currentImageIndex] && allThumbnails[currentImageIndex].isDefault;
        return (
          <div className={classes.buttonContainer}>
            <FontIcon
              className={c('material-icons', classes.customButton)}
              onClick={() => removeImageThumbnail(currentImageIndex)}
              style={isDefault ? { display: 'none' } : { display: 'block' }}
              data-tip={buttonTooltip}
              data-class={classes.tooltipStyle}
              data-place="bottom"
              data-effect="solid"
            >
              delete
            </FontIcon>
            <Toggle
              label={<FormattedMessage id="thumbnailDefaultTooltip" />}
              toggled={isDefault}
              onToggle={() => this.updateThumbnail(currentImageIndex)}
              labelPosition="right"
              style={styles.thumbnailToggle}
              labelStyle={styles.thumbnailToggleLabel}
            />
          </div>
        );
    }

    render() {
        const {
            allThumbnails,
            updateToolTip,
            isDownloadable,
        } = this.props;

        const images3 = [].concat(this.getStaticImages(allThumbnails));
        return (
          <ImageGallery
            autoPlay={false}
            items={images3}
            lazyLoad={false}
            infinite={this.galleryConfig.infinite}
            showBullets={this.galleryConfig.showBullets}
            showFullscreenButton={this.galleryConfig.showFullscreenButton && this.galleryConfig.showGalleryFullscreenButton}
            showPlayButton={this.galleryConfig.showPlayButton && this.galleryConfig.showGalleryPlayButton}
            showThumbnails={this.galleryConfig.showThumbnails}
            showIndex={this.galleryConfig.showIndex}
            showNav={this.galleryConfig.showNav}
            thumbnailPosition={this.galleryConfig.thumbnailPosition}
            slideDuration={parseInt(this.galleryConfig.slideDuration, 10)}
            slideInterval={parseInt(this.galleryConfig.slideInterval, 10)}
            slideOnThumbnailHover={this.galleryConfig.slideOnThumbnailHover}
            renderCustomControls={isDownloadable ? () => this.downloadThumbnail(allThumbnails) : () => this.deleteThumbnail(allThumbnails)}
            onSlide={this.changeImageIndex}
            onImageLoad={updateToolTip}
          />
        );
    }
}

ImageGalleryPage.defaultProps = {
    isDownloadable: false,
    changeDefaultThumbnail: () => {},
    removeImageThumbnail: () => {},
};

ImageGalleryPage.propTypes = {
    removeImageThumbnail: PropTypes.func,
    allThumbnails: PropTypes.array.isRequired,
    buttonTooltip: PropTypes.string.isRequired,
    updateToolTip: PropTypes.func.isRequired,
    isDownloadable: PropTypes.bool.isRequired,
    changeDefaultThumbnail: PropTypes.func,
};

export default ImageGalleryPage;
