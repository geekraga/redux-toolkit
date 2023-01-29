import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';

class JwPlayer extends Component {
    state: {};
    componentDidMount() {
        const { videoPlaylist, currentItem } = this.props;
        const {
            videoUrl: url,
            breakVideoPlayList,
            thumbnailUrl: image,
            videoName: title,
            videoUrl: file,
            videoDescription: desc,
        } = currentItem;
        let playlist = [];
        if (!breakVideoPlayList) {
            const currentItemIndex = videoPlaylist.findIndex(item => item.file === url);
            playlist = [...videoPlaylist.slice(currentItemIndex), ...videoPlaylist.slice(0, currentItemIndex)];
        } else {
            playlist[0] = {
                image,
                title,
                file,
                desc,
            };
        }
        this.updateVideoUrl(playlist, breakVideoPlayList);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.updateLatLong);
        }
    }

    updateLatLong = position => {
        this.setState({
            lat: position.coords.latitude,
            long: position.coords.longitude,
        });
    }

    updateMetatags = currentVideoPlaying => {
        const { image, desc, title } = currentVideoPlaying;
        const metaTags = document.getElementsByTagName('meta');
        for (let i = 0; i < metaTags.length; i += 1) {
            switch (metaTags[i].getAttribute('property')) {
            case 'og:image':
                metaTags[i].setAttribute('content', image);
                break;
            case 'og:description':
                metaTags[i].setAttribute('content', desc);
                break;
            case 'og:title':
                metaTags[i].setAttribute('content', title);
                break;
            }
        }
    }

    updateVideoUrl = (playlist, breakVideoPlayList) => {
        const { propertyName, updatePreviewContent, mobileMode, hidePlayerLoader } = this.props;
        window.jwplayer('videoPlayer').setup({
            playlist,
            autostart: true,
            controls: true,
            sharing: {
                heading: 'Share on facebook',
                sites: ['facebook'],
            },
            cast: {
                appID: 'k23WC3ng',
            },
        });

        window.jwplayer().onBeforePlay(() => {
            const currentVideoPlaying = playlist[window.jwplayer().getPlaylistIndex()];
            const { file, title } = currentVideoPlaying;
            if (!breakVideoPlayList) {
                updatePreviewContent(file);
            }
           // this.updateMetatags(currentVideoPlaying);
            if (mobileMode && !window.jwplayer().getFullscreen()) {
                hidePlayerLoader();
                if (window.navigator.userAgent.indexOf('Mac') === -1) {
                    window.jwplayer().setFullscreen(true);
                }
            }
            window.jwplayer().setVolume(100);
            window.jwplayer().play(true);
            ReactGA.event({
                category: propertyName,
                action: 'Video viewed',
                label: `Video : ${title}`,
            });
        });

        window.jwplayer().onPlay(() => {
            if (this.state && this.state.long && this.state.lat) {
                ReactGA.event({
                    category: 'Guest Level Analytics',
                    action: `Video Viewed: ${playlist[window.jwplayer().getPlaylistIndex()].title}`,
                    label: `Geo-Location : Latitude - ${this.state.lat} Longitude - ${this.state.long}`,
                });
            }
        });

        window.jwplayer().onFullscreen(value => {
            if (value.fullscreen) {
                ReactGA.event({
                    category: propertyName,
                    action: 'Video viewed in full screen',
                    label: `Video : ${playlist[window.jwplayer().getPlaylistIndex()].title}`,
                    nonInteraction: value.fullscreen,
                });
            }
        });
        window.jwplayer().onVolume(() => {
            ReactGA.event({
                category: propertyName,
                action: 'Video volume control selected',
                label: `Video : ${playlist[window.jwplayer().getPlaylistIndex()].title}`,
            });
        });
    }

    render() {
        return (
          <div id="videoPlayer" />
        );
    }
}

JwPlayer.defaultProps = {
    mobileMode: false,
    hidePlayerLoader: () => {},
};

JwPlayer.propTypes = {
    propertyName: PropTypes.string.isRequired,
    videoPlaylist: PropTypes.array.isRequired,
    updatePreviewContent: PropTypes.func.isRequired,
    hidePlayerLoader: PropTypes.func,
    mobileMode: PropTypes.bool,
    currentItem: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
    videoPlaylist: reduxState.publicVideos.videoPlaylist,
});

export default connect(mapStateToProps)(JwPlayer);
