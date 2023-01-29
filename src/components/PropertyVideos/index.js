import React, { PropTypes } from 'react';
import DesktopView from './desktopView';
import MobileView from './mobileView';

const PropertyVideos = props => {
    const {
        videoList,
        previewContent,
        addCategoryVideos,
        showHideLoadingIndicator,
        propertyId,
        langId,
        currentWidth,
    } = props;

    if (!currentWidth) return null;

    if (currentWidth > 768) {
        return (
          <DesktopView
            newVideos={videoList}
            previewContent={previewContent}
            addCategoryVideos={addCategoryVideos}
          />
        );
    }

    return (
      <MobileView
        newVideos={videoList}
        previewContent={previewContent}
        showHideLoadingIndicator={showHideLoadingIndicator}
        propertyId={propertyId}
        langId={langId}
      />
    );
};

PropertyVideos.propTypes = {
    videoList: PropTypes.object.isRequired,
    previewContent: PropTypes.func.isRequired,
    addCategoryVideos: PropTypes.func.isRequired,
    showHideLoadingIndicator: PropTypes.func.isRequired,
    propertyId: PropTypes.string.isRequired,
    langId: PropTypes.number.isRequired,
    currentWidth: PropTypes.number,
};

PropertyVideos.defaultProps = { currentWidth: null };

export default PropertyVideos;
