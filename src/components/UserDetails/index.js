import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import trim from 'lodash/trim';
import classes from './styles.scss';
import { updateUserDashboard } from '../../actions/async/updateData';

class UserDetails extends Component {

    constructor(props) {
        super(props);
        const { userDashboard } = this.props;
        this.state = {
            firstname: userDashboard.firstname,
            lastname: userDashboard.lastname,
            firstnameErrorLabel: '',
            lastnameErrorLabel: '',
            showSubmitError: '',
            showSubmitSuccess: false,
        };

        this.errorMessages = {
            firstNameError: <FormattedMessage id="firstNameError" />,
            lastNameError: <FormattedMessage id="lastNameError" />,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
                [`${e.target.name}ErrorLabel`]: '',
                showSubmitError: '',
                showSubmitSuccess: false,
            },
        );
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const { firstname, lastname } = this.state;
        const { userDashboard, updateUserInfo, showLoader } = this.props;

        if (
            trim(firstname) && trim(lastname) &&
            (firstname !== userDashboard.firstname || lastname !== userDashboard.lastname)
        ) {
            const apiData = { firstname, lastname };
            showLoader(true);
            updateUserInfo(apiData).then(response => {
                showLoader(false);
                if (response === 200) {
                    this.setState({ showSubmitSuccess: true });
                } else {
                    this.setState({ showSubmitError: 'apiError' });
                }
            });
        } else {
            if (!trim(firstname)) {
                this.setState({ firstnameErrorLabel: this.errorMessages.firstNameError });
            }
            if (!trim(lastname)) {
                this.setState({ lastnameErrorLabel: this.errorMessages.lastNameError });
            }
        }
    }

    render() {
        const firstnameTextValue = <FormattedMessage id="firstNameText" />;
        const lastNameTextValue = <FormattedMessage id="lastNameText" />;
        const {
            firstname,
            lastname,
            firstnameErrorLabel,
            lastnameErrorLabel,
            showSubmitError,
            showSubmitSuccess,
          } = this.state;
        return (
          <div className={classes.userDetailsContainer}>
            <h3 className={classes.userDetailsHeader}>
              <FormattedMessage id="userDetails" />
            </h3>
            <form onSubmit={this.handleFormSubmit} className={classes.formContainer}>
              {
                showSubmitError ? (
                  <div className={classes.passwordFailContainer}>
                    <FormattedMessage id={showSubmitError} />
                  </div>
                ) : null
              }
              {
                showSubmitSuccess ? (
                  <div className={classes.passwordSuccessContainer}>
                    <FormattedMessage id="userDetailsChangeSuccess" />
                  </div>
                ) : null
              }
              <TextField
                name="firstname"
                hintText={firstnameTextValue}
                floatingLabelText={firstnameTextValue}
                fullWidth
                value={firstname}
                onChange={this.handleInputChange}
                errorText={firstnameErrorLabel}
                maxLength="100"
              />
              <TextField
                name="lastname"
                hintText={lastNameTextValue}
                floatingLabelText={lastNameTextValue}
                fullWidth
                value={lastname}
                onChange={this.handleInputChange}
                errorText={lastnameErrorLabel}
                maxLength="100"
              />

              <RaisedButton
                label={<FormattedMessage id="updateDetails" />}
                className={classes.btnDetails}
                containerElement="label"
                icon={<FontIcon className="material-icons">loop</FontIcon>}
                primary
                fullWidth
              >
                <input type="submit" className={classes.btnSubmit} />
              </RaisedButton>
            </form>
          </div>
        );
    }
}

UserDetails.propTypes = {
    userDashboard: PropTypes.object.isRequired,
    updateUserInfo: PropTypes.func.isRequired,
    showLoader: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    updateUserInfo(data) {
        return dispatch(updateUserDashboard(data));
    },
});

export default connect(null, mapDispatchToProps)(UserDetails);
