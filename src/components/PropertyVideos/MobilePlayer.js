import React, { PropTypes } from 'react';
import c from 'classnames';
import JwPlayer from '../JwPlayer';
import LoadingIndicator from '../LoadingIndicator';
import classes from './style.scss';

function MobilePlayer(props) {
    const { selectedVideoData, propertyName, updatePreviewContent, hideMobilePlayer, showPlayer, hidePlayerLoader, showMobileLoader } = props;
    if (!showPlayer) {
        return null;
    }
    const loader = showMobileLoader ? <LoadingIndicator /> : null;
    return (
      <div className={classes.mobilePlayerOuter}>
        {loader}
        <div className={classes.jwPlayerMobileWrapper}>
          <JwPlayer
            currentItem={selectedVideoData}
            propertyName={propertyName}
            updatePreviewContent={updatePreviewContent}
            hidePlayerLoader={hidePlayerLoader}
            mobileMode
          />
        </div>
        <i
          className={c('material-icons', classes.closeVideoDialog)}
          onClick={hideMobilePlayer}
        >
          clear
        </i>
      </div>
    );
}

MobilePlayer.propTypes = {
    selectedVideoData: PropTypes.object.isRequired,
    showPlayer: PropTypes.bool.isRequired,
    showMobileLoader: PropTypes.bool.isRequired,
    hideMobilePlayer: PropTypes.func.isRequired,
    hidePlayerLoader: PropTypes.func.isRequired,
    updatePreviewContent: PropTypes.func.isRequired,
    propertyName: PropTypes.string.isRequired,
};

export default MobilePlayer;
