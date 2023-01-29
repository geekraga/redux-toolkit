import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import SafeImage from '../../components/SafeImage';
import { changeProfilePic } from '../../actions/async/updateData';
import { validatePicture } from '../../util/regexStorage';
import styles from './styles';
import classes from './styles.scss';

class ProfilePicComponent extends Component {
    constructor() {
        super();
        this.state = {
            invalidUpload: '',
        };
        this.selectProfilePic = this.selectProfilePic.bind(this);
        this.uploadProfilePic = this.uploadProfilePic.bind(this);
    }

    selectProfilePic(event) {
        const { showLoader } = this.props;
        this.setState({ invalidUpload: '' });
        const uploadedFile = event.target.files[0];
        const extension = uploadedFile ? uploadedFile.name.split('.').pop().toLowerCase() : null;
        const imageSize = uploadedFile ? uploadedFile.size : 0;
        if (extension && imageSize) {
            if (validatePicture({ extension, imageSize })) {
                showLoader(true);
                this.uploadProfilePic(uploadedFile);
            } else {
                this.setState({ invalidUpload: 'invalidProfilePic' });
            }
        }
    }

    uploadProfilePic(upload) {
        const { uploadProfilePic, showLoader } = this.props;
        const formData = new FormData();
        formData.append('file', upload);
        uploadProfilePic(formData).then(
            response => {
                showLoader(false);
                if (response.status !== 200) {
                    this.setState({ invalidUpload: 'apiError' });
                }
            });
    }

    render() {
        const { profilepicurl } = this.props;
        const { invalidUpload } = this.state;
        return (
          <div className={classes.avatarContainer}>
            <h3 className={classes.avatarHeader}>
              <FormattedMessage id="avatar" />
            </h3>
            <div className={classes.avatarIconContainer}>
              <SafeImage
                imageUrl={profilepicurl}
                componentClass={classes.avatarIcon}
              />
            </div>
            {
                invalidUpload ? (
                  <div className={classes.errorContainer}>
                    <FormattedMessage id={invalidUpload} />
                  </div>
                ) : null
            }
            <FlatButton
              label={<FormattedMessage id="changeProfile" />}
              style={styles.changeProfileButton}
              icon={<FontIcon className="material-icons">camera_alt</FontIcon>}
              className={classes.changeProfileBtn}
              containerElement="label"
            >
              <input type="file" accept="image/*" className={classes.hideButton} onChange={this.selectProfilePic} />
            </FlatButton>
          </div>
        );
    }
}

ProfilePicComponent.propTypes = {
    profilepicurl: PropTypes.string.isRequired,
    showLoader: PropTypes.func.isRequired,
    uploadProfilePic: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => ({
    uploadProfilePic(data) {
        return dispatch(changeProfilePic(data));
    },
});

export default connect(null, mapDispatchToProps)(ProfilePicComponent);

