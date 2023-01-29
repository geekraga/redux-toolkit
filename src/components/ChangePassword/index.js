import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import c from 'classnames';
import classes from '../UserDetails/styles.scss';

export default class ChangePassword extends Component {

    constructor() {
        super();
        this.state = {
            password: '',
            confirmPassword: '',
            showSubmitSuccess: false,
            showSubmitError: '',
            passwordErrorLabel: '',
            confirmPasswordErrorLabel: '',
        };

        this.errorMessages = {
            passwordError: <FormattedMessage id="passwordError" />,
            confirmPasswordError: <FormattedMessage id="confirmPasswordError" />,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentWillReceiveProps(nextprops) {
        const { showSubmitError, showSubmitSuccess } = nextprops;
        if (showSubmitSuccess && !showSubmitError) {
            this.setState({ showSubmitSuccess, showSubmitError: '', password: '', confirmPassword: '' });
        } else {
            this.setState({ showSubmitSuccess: false, showSubmitError });
        }
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
        const { password, confirmPassword } = this.state;

        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                this.setState({ showSubmitError: 'samePasswordError' });
            } else {
                this.props.changePassword({ newPassword: password, confirmPassword });
            }
        } else {
            if (password === '') {
                this.setState({ passwordErrorLabel: this.errorMessages.passwordError });
            }
            if (confirmPassword === '') {
                this.setState({ confirmPasswordErrorLabel: this.errorMessages.confirmPasswordError });
            }
        }
    }

    render() {
        const passwordTextValue = <FormattedMessage id="passwordText" />;
        const confirmPasswordTextValue = <FormattedMessage id="confirmPasswordText" />;

        const {
            password,
            confirmPassword,
            passwordErrorLabel,
            confirmPasswordErrorLabel,
            showSubmitError,
            showSubmitSuccess,
        } = this.state;

        const { showHeader, classname, buttonText } = this.props;

        return (
          <div className={c(classes.userDetailsContainer, classname)}>
            {
              showHeader ? (
                <h3 className={classes.userDetailsHeader}>
                  <FormattedMessage id="changePassword" />
                </h3>
              ) : null
            }

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
                    <FormattedMessage id="passwordChangeSuccess" />
                  </div>
                ) : null
              }
              <TextField
                name="password"
                hintText={passwordTextValue}
                floatingLabelText={passwordTextValue}
                fullWidth
                type="password"
                value={password}
                onChange={this.handleInputChange}
                errorText={passwordErrorLabel}
                maxLength="25"
              />
              <TextField
                name="confirmPassword"
                hintText={confirmPasswordTextValue}
                floatingLabelText={confirmPasswordTextValue}
                fullWidth
                type="password"
                value={confirmPassword}
                onChange={this.handleInputChange}
                errorText={confirmPasswordErrorLabel}
                maxLength="25"
              />
              <RaisedButton
                label={<FormattedMessage id={buttonText} />}
                className={classes.btnDetails}
                icon={<FontIcon className="material-icons">loop</FontIcon>}
                containerElement='label'
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

ChangePassword.propTypes = {
    showSubmitSuccess: PropTypes.bool.isRequired,
    showSubmitError: PropTypes.string.isRequired,
    changePassword: PropTypes.func.isRequired,
    classname: PropTypes.string,
    buttonText: PropTypes.string,
    showHeader: PropTypes.bool,
};

ChangePassword.defaultProps = {
    classname: '',
    showHeader: true,
    buttonText: 'changePassword',
};
