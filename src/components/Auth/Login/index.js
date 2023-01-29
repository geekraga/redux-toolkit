import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import classnames from 'classnames';
import trim from 'lodash/trim';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import ReactGA from 'react-ga';
import LoadingIndicator from '../../LoadingIndicator';
import LinkItem from '../../LinkItem';
import { login, socialLogin } from '../../../actions/async/authentication';
import { changeDashboardLoadingStatus } from '../../../actions/common';
import { removeRegisteredUser } from '../../../actions/userDashboard';
import endpoints from '../../../endpoints/authentication';
import styles from '../styles';
import classes from './styles.scss';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            emailErrorLabel: '',
            password: '',
            passwordErrorLabel: '',
            showLoader: false,
            showAuthenticateError: '',
            cookiesError: false,
        };
        this.socialLoginData = {
            token: '',
        };
        this.errorMessages = {
            emailError: <FormattedMessage id="emailError" />,
            passwordError: <FormattedMessage id="passwordError" />,
        };
        this.chromeTextInterval = null;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.showGoogleApiError = this.showGoogleApiError.bind(this);
    }

    componentDidMount() {
        /* Code for resolving hintText issue on Chrome. https://github.com/callemall/material-ui/issues/718 */
        let times = 0;
        this.chromeTextInterval = setInterval(() => {
            times += 1;
            if (this.EmailTextInput.getValue()) {
                const oldState = this.PasswordTextInput.state;
                this.PasswordTextInput.setState({ ...oldState, hasValue: true });
                clearInterval(this.chromeTextInterval);
            } else if (times >= 10) {
                clearInterval(this.chromeTextInterval);
            }
        }, 100);
        const page = '/login';
        ReactGA.set({ page });
        ReactGA.pageview(page);
    }

    componentWillUnmount() {
        clearInterval(this.chromeTextInterval);
    }

    handleInputChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
                [`${e.target.name}ErrorLabel`]: '',
                showAuthenticateError: false,
            },
        );
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;

        if (trim(email) && trim(password)) {
            this.setState({ showLoader: true });
            const data = {
                username: email,
                password,
            };
            this.props.authenticate(data).then(
                response => this.handleResponse(response, 'authErrorText'),
            );
        } else {
            if (!trim(email)) {
                this.setState({ emailErrorLabel: this.errorMessages.emailError });
            }
            if (!trim(password)) {
                this.setState({ passwordErrorLabel: this.errorMessages.passwordError });
            }
        }
    }

    handleResponse(response, errorText) {
        if (response.status !== 200) {
            this.setState({ showLoader: false, showAuthenticateError: errorText });
        } else {
            this.props.removeRegisterFormData();
            this.props.changeDashboardState({ status: true });
        }
    }

    responseFacebook(facebookUser) {
        if (facebookUser.accessToken) {
            this.setState({ showLoader: true });
            this.socialLoginData.token = facebookUser.accessToken;
            const errorText = 'fbauthErrorText';
            this.props.social_authenticate(endpoints.fbAuthPath, this.socialLoginData).then(
                response => this.handleResponse(response, errorText),
            );
        }
    }

    responseGoogle(googleUser) {
        const { accessToken } = googleUser;
        if (accessToken) {
            this.setState({ showLoader: true });
            this.socialLoginData.token = accessToken;
            const errorText = 'googleauthErrorText';
            this.props.social_authenticate(endpoints.googleAuthPath, this.socialLoginData).then(
                response => this.handleResponse(response, errorText),
            );
        }
    }

    showGoogleApiError(googleError) {
        const { error } = googleError;
        const { cookiesError } = this.state;

        if (cookiesError) {
            if (error) {
                this.setState({ showAuthenticateError: 'googleCookieErrorText' });
            } else {
                this.setState({ cookiesError: false, showAuthenticateError: '' });
            }
        } else {
            if (error === 'idpiframe_initialization_failed') {
                this.setState({ cookiesError: true });
            } else {
                this.setState({ cookiesError: false });
            }
        }
    }

    render() {
        const { email, password, emailErrorLabel, passwordErrorLabel, showLoader, showAuthenticateError, cookiesError } = this.state;
        const { intl, cookieUrl } = this.props;
        const fbBtnClass = classnames(classes.btn, classes.btnFacebook);
        const googleBtnClass = classnames(classes.btn, classes.btnGoogle);
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const emailTextValue = <FormattedMessage id="emailText" />;
        const passwordTextValue = <FormattedMessage id="passwordText" />;
        return (
          <div>
            {
              cookiesError ?
                (
                  <div className={classes.cookiesError}>
                    <FormattedMessage id="cookiesError" />
                    <a
                      href={cookieUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FormattedMessage id="enableCookie" />
                    </a>
                  </div>
                ) : null
            }
            <div className={classes.boxContainer}>
              { loadingIndicator }
              <Paper style={styles.paper}>
                <div className={classes.logoContainer} />
                <div className={classes.loginText}>
                  <FormattedMessage id="loginWith" />
                </div>
                <div className={classes.buttonsDiv}>
                  <div className={fbBtnClass}>
                    <i className="fa fa-facebook fa-lg" />
                    <FormattedMessage id="loginFb" />
                    <FacebookLogin
                      appId={endpoints.FB_CLIENT_ID}
                      autoLoad={false}
                      callback={this.responseFacebook}
                      cssClass={classes.hideButton}
                    />
                  </div>
                  <div className={googleBtnClass}>
                    <i className="fa fa-google-plus fa-lg" />
                    <FormattedMessage id="loginGoogle" />
                    <GoogleLogin
                      clientId={endpoints.GOOGLE_CLIENT_ID}
                      className={classes.hideButton}
                      autoLoad={false}
                      onSuccess={this.responseGoogle}
                      onFailure={this.showGoogleApiError}
                    />
                  </div>
                </div>

                <div className={classes.emailTextContainer}>
                  <span className={classes.emailText}>
                    <FormattedMessage id="loginEmail" />
                  </span>
                </div>
                {
                    showAuthenticateError ? (
                      <div className={classes.authFailContainer}>
                        <p style={styles.errorMessage}>
                          <FormattedMessage id={showAuthenticateError} />
                        </p>
                      </div>
                    ) : null
                }

                <form onSubmit={this.handleFormSubmit}>
                  <TextField
                    name="email"
                    hintText={emailTextValue}
                    floatingLabelText={emailTextValue}
                    fullWidth
                    value={email}
                    onChange={this.handleInputChange}
                    errorText={emailErrorLabel}
                    maxLength="100"
                    ref={input => { this.EmailTextInput = input; }}
                  />
                  <TextField
                    name="password"
                    hintText={passwordTextValue}
                    floatingLabelText={passwordTextValue}
                    fullWidth
                    type="password"
                    value={password}
                    onChange={this.handleInputChange}
                    errorText={passwordErrorLabel}
                    maxLength="100"
                    ref={input => { this.PasswordTextInput = input; }}
                  />

                  <input
                    type="submit"
                    className={classes.submitButton}
                    value={intl.formatMessage({ id: 'login' })}
                  />
                </form>
              </Paper>

              <div style={styles.buttonsDiv}>
                <FlatButton
                  label={<FormattedMessage id="forgotPasswordLabel" />}
                  labelStyle={styles.flatLabel}
                  style={styles.flatLoginButton}
                  icon={<FontIcon className="material-icons">help</FontIcon>}
                  onClick={this.props.onForgotPassword}
                />
                <FlatButton
                  label={<FormattedMessage id="registerLabel" />}
                  labelStyle={styles.flatLabel}
                  style={styles.flatLoginButton}
                  icon={<FontIcon className="material-icons">person_add</FontIcon>}
                  onClick={this.props.onRegister}
                />
              </div>

              <div className={classes.registerText}>
                <FormattedMessage id="registerAccount" />
                <LinkItem to={'/tos'} linkClass={classes.tosButton}>
                  <FormattedMessage id="terms" />
                </LinkItem>
                <FormattedMessage id="readText" />
                <LinkItem to={'/policy'} linkClass={classes.privacyButton}>
                  <FormattedMessage id="privacyLinkText" />
                </LinkItem>.
              </div>
            </div>
          </div>
        );
    }
}

Login.propTypes = {
    authenticate: PropTypes.func.isRequired,
    social_authenticate: PropTypes.func.isRequired,
    changeDashboardState: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
    onForgotPassword: PropTypes.func.isRequired,
    removeRegisterFormData: PropTypes.func.isRequired,
    cookieUrl: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
};

const mapStateToProps = reduxState => ({ cookieUrl: reduxState.runtimeSettings.cookieUrl });

const mapDispatchToProps = dispatch => ({
    authenticate(data) {
        return dispatch(login(data));
    },
    social_authenticate(url, data) {
        return dispatch(socialLogin(url, data));
    },
    changeDashboardState(loadingStatus) {
        dispatch(changeDashboardLoadingStatus(loadingStatus));
    },
    removeRegisterFormData() {
        return dispatch(removeRegisteredUser());
    },
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Login));
