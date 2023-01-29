import React, { PropTypes } from 'react';
import RecommendedVideos from './recommendedVideos';

const SelectPropertyVideos = props => {
    const {
        showLoader,
        categoryIdFilter,
        fetchVideos,
        previewContent,
        loadPropertyDetails,
        uploadPropertyData,
    } = props;
    return (
        (
          <RecommendedVideos
            showLoader={showLoader}
            categoryIdFilter={categoryIdFilter}
            fetchVideos={fetchVideos}
            loadPropertyDetails={loadPropertyDetails}
            previewContent={previewContent}
            uploadPropertyData={uploadPropertyData}
          />
        )
    );
};

SelectPropertyVideos.defaultProps = {
    categoryIdFilter: null,
};

SelectPropertyVideos.propTypes = {
    showLoader: PropTypes.bool.isRequired,
    fetchVideos: PropTypes.func.isRequired,
    previewContent: PropTypes.func.isRequired,
    loadPropertyDetails: PropTypes.func.isRequired,
    uploadPropertyData: PropTypes.func.isRequired,
    categoryIdFilter: PropTypes.number,
};

export default SelectPropertyVideos;
