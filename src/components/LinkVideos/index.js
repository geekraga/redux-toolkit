import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import { fetchStateList, fetchCityList } from '../../actions/async/location';
import LoadingIndicator from '../../components/LoadingIndicator';
import classes from '../../components/VideoUploadComponents/VideoGeoLocation/styles.scss';

class PropertyManagement extends Component {
    constructor() {
        super();
        this.state = {
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value,
                [`${event.target.name}ErrorLabel`]: '',
                showSubmitError: '',
                showSubmitSuccess: false,
            },
        );
    }

    render() {
        const {
        } = this.state;
        const {

        } =
        return(
            <div>
                Link Videos
            </div>
        )
    }
}

LinkVideos.defaultProps = {
};

LinkVideos.propTypes = {
};

const mapStateToProps = reduxState => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkVideos);
