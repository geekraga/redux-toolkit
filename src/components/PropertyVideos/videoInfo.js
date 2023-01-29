import React, { Component, PropTypes } from 'react';
import c from 'classnames';
import { FormattedMessage } from 'react-intl';
import { fixUrl } from '../../util/regexStorage';
import DetailsDialogBox from '../DialogBox/detailsDialogBox';
import classes from './style.scss';

class VideoInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
            selectedVideoData: {},
        };
        this.openDetails = this.openDetails.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    openDetails(selectedVideoData) {
        this.setState({ isDialogOpen: true, selectedVideoData });
    }

    handleClose() {
        this.setState({ isDialogOpen: false });
    }

    render() {
        const { list, previewContent, breakVideoPlayList } = this.props;
        const { isDialogOpen, selectedVideoData } = this.state;
        return (
          <div className={c('col-xs-12', classes.videoContentContainer)}>
            <figure className={classes.thumbnailContainer}>
              <img src={list.thumbnailUrl} alt="noImage" />
              <div className={classes.playContainerOverlay} />
              <div className={classes.playContainer} onClick={() => previewContent(list, breakVideoPlayList, false, true)}>
                <i className={c('material-icons', classes.videoPlay)}>
                  play_arrow
                </i>
              </div>
            </figure>
            <div className={classes.videoDetailsContainer}>
              <div className={classes.videoTitle}>
                {list.videoName}
              </div>
              <div className={classes.videoDescription} onClick={() => this.openDetails(list)}>
                {list.videoDescription}
              </div>
              {
                list.website ?
                  <div className={classes.mobileContactDetails}>
                    <i className="material-icons">
                      tv
                    </i>
                    <a
                      href={fixUrl(list.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {list.website}
                    </a>
                  </div> :
                  null
              }
              {
                list.phone ?
                  <div className={classes.mobileContactDetails}>
                    <i className="material-icons">
                      phone_iphone
                    </i>
                    <a
                      href={`tel:${list.phone}`}
                    >
                      {list.phone}
                    </a>
                  </div> :
                  null
              }
              <div
                onClick={() => this.openDetails(list)}
                className={classes.detailsButton}
              >
                <FormattedMessage id="viewDetails" />
              </div>
            </div>
            {
              isDialogOpen ?
                <DetailsDialogBox
                  selectedVideoData={selectedVideoData}
                  handleClose={this.handleClose}
                /> :
                null
            }
          </div>
        );
    }
}

VideoInfo.propTypes = {
    list: PropTypes.object.isRequired,
    previewContent: PropTypes.func.isRequired,
    breakVideoPlayList: PropTypes.bool.isRequired,
};

export default VideoInfo;
