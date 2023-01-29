import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
/*  Commenting the Material ui components and classNames needed to create user as Host
 import Checkbox from 'material-ui/Checkbox';
 import FontIcon from 'material-ui/FontIcon';
 import classNames from 'classnames';
*/
import RaisedButton from 'material-ui/RaisedButton';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import trim from 'lodash/trim';
import ReactTooltip from 'react-tooltip';
import ReactGA from 'react-ga';
import LoadingIndicator from '../../LoadingIndicator';
import LinkItem from '../../LinkItem';
import { createUser } from '../../../actions/async/fetchData';
import { updateRegisteredUser, removeRegisteredUser } from '../../../actions/userDashboard';
import { validateEmail } from '../../../util/regexStorage';
import styles from '../styles';
import classes from '../styles.scss';

class Register extends Component {
    constructor(props) {
        super(props);
        const { firstname, lastname, email, password, confirmPassword } = props.registerData;
        this.state = {
            firstname,
            lastname,
            email,
            password,
            confirmPassword,
            ishost: false,
            showLoader: false,
            showEmailSentMessage: false,
            errorMessage: '',
            firstnameErrorLabel: '',
            lastnameErrorLabel: '',
            emailErrorLabel: '',
            passwordErrorLabel: '',
            confirmPasswordErrorLabel: '',
        };

        this.errorMessages = {
            firstNameError: <FormattedMessage id="firstNameError" />,
            lastNameError: <FormattedMessage id="lastNameError" />,
            emailError: <FormattedMessage id="emailValidError" />,
            passwordError: <FormattedMessage id="passwordError" />,
            confirmPasswordError: <FormattedMessage id="confirmPasswordError" />,
            samePasswordError: <FormattedMessage id="samePasswordError" />,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeHostSettings = this.changeHostSettings.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        ReactTooltip.rebuild();
        const page = '/register';
        ReactGA.set({ page });
        ReactGA.pageview(page);
    }

    handleInputChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
                [`${e.target.name}ErrorLabel`]: '',
                errorMessage: '',
            },
        );
    }

    changeHostSettings() {
        this.setState({ ishost: !this.state.ishost });
    }
    handleFormSubmit(event) {
        event.preventDefault();
        const { firstname, lastname, email, password, confirmPassword, ishost } = this.state;
        if (
            trim(firstname) && trim(lastname) && trim(password) && trim(confirmPassword)
            && validateEmail(email)
            && (password === confirmPassword)
        ) {
            this.setState({ showLoader: true });
            const apiData = {
                firstname,
                lastname,
                email,
                password,
                ishost,
            };
            this.props.removeRegisterFormData();
            this.props.userRegister(apiData).then(
                    response => {
                        this.setState({ showLoader: false });
                        if (response.status === 200) {
                            this.setState({
                                showEmailSentMessage: true,
                                firstname: '',
                                lastname: '',
                                email: '',
                                password: '',
                                confirmPassword: '',
                            });
                        } else if (response.error.response) {
                            this.setState({ errorMessage: response.error.response.data.message });
                        } else {
                            this.setState({ errorMessage: 'apiError' });
                        }
                    });
        } else {
            if (!trim(firstname)) {
                this.setState({ firstnameErrorLabel: this.errorMessages.firstNameError });
            }
            if (!trim(lastname)) {
                this.setState({ lastnameErrorLabel: this.errorMessages.lastNameError });
            }
            if (!trim(password)) {
                this.setState({ passwordErrorLabel: this.errorMessages.passwordError });
            }
            if (!trim(confirmPassword)) {
                this.setState({ confirmPasswordErrorLabel: this.errorMessages.confirmPasswordError });
            }
            if (!validateEmail(email)) {
                this.setState({ emailErrorLabel: this.errorMessages.emailError });
            }
            if (trim(password) && trim(confirmPassword) && (trim(password) !== trim(confirmPassword))) {
                this.setState(
                    {
                        passwordErrorLabel: this.errorMessages.samePasswordError,
                        confirmPasswordErrorLabel: this.errorMessages.samePasswordError,
                    });
            }
        }
    }

    updateRegisterForm = (redirect = true) => {
        const { firstname, lastname, email, password, confirmPassword } = this.state;
        this.props.sendRegisterFormData({ firstname, lastname, email, password, confirmPassword });
        redirect && this.props.onGoBack();
    }

    render() {
        const {
            firstname,
            lastname,
            email,
            password,
            confirmPassword,
            ishost,
            showLoader,
            errorMessage,
            firstnameErrorLabel,
            lastnameErrorLabel,
            emailErrorLabel,
            passwordErrorLabel,
            confirmPasswordErrorLabel,
            showEmailSentMessage,
        } = this.state;

        const { intl } = this.props;
        const emailText = <FormattedMessage id="emailText" />;
        const passwordText = <FormattedMessage id="passwordText" />;
        const confirmPasswordText = <FormattedMessage id="confirmPasswordText" />;
        const firstNameText = <FormattedMessage id="firstNameText" />;
        const lastNameText = <FormattedMessage id="lastNameText" />;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const showError = errorMessage ? <FormattedMessage id={errorMessage} defaultMessage={errorMessage} /> : null;

        return (
          <div>
            <div className={classes.registerContainer}>
              { loadingIndicator }
              <Paper style={styles.paper}>
                <div>
                  <div style={styles.title}>
                    <FormattedMessage id="signUp" />
                  </div>
                  <div className={classes.logoSmallContainer} />
                </div>
                <hr />
                <p className={classes.registerError}>
                  {showError}
                </p>
                <form onSubmit={this.handleFormSubmit}>

                  {
                    showEmailSentMessage ?
                      (
                        <div className={classes.userRegistered}>
                          <FormattedMessage id="userRegsisterSuccess" />
                        </div>
                      )
                    : (
                      <div className="row">
                        <div className="col-xs-12 col-sm-6">
                          <TextField
                            name="firstname"
                            hintText={firstNameText}
                            floatingLabelText={firstNameText}
                            value={firstname}
                            onChange={this.handleInputChange}
                            errorText={firstnameErrorLabel}
                            maxLength="100"
                            fullWidth
                          />
                        </div>
                        <div className="col-xs-12 col-sm-6">
                          <TextField
                            name="lastname"
                            hintText={lastNameText}
                            floatingLabelText={lastNameText}
                            value={lastname}
                            onChange={this.handleInputChange}
                            errorText={lastnameErrorLabel}
                            maxLength="100"
                            fullWidth
                          />
                        </div>
                        <div className="col-xs-12 col-sm-6">
                          <TextField
                            name="password"
                            hintText={passwordText}
                            floatingLabelText={passwordText}
                            type="password"
                            value={password}
                            onChange={this.handleInputChange}
                            errorText={passwordErrorLabel}
                            maxLength="25"
                            fullWidth
                          />
                        </div>
                        <div className="col-xs-12 col-sm-6">
                          <TextField
                            name="confirmPassword"
                            hintText={confirmPasswordText}
                            floatingLabelText={confirmPasswordText}
                            type="password"
                            value={confirmPassword}
                            onChange={this.handleInputChange}
                            errorText={confirmPasswordErrorLabel}
                            maxLength="25"
                            fullWidth
                          />
                        </div>
                        <div className="col-xs-12">
                          <TextField
                            name="email"
                            hintText={emailText}
                            floatingLabelText={emailText}
                            value={email}
                            onChange={this.handleInputChange}
                            errorText={emailErrorLabel}
                            maxLength="100"
                            fullWidth
                          />
                        </div>

                        {/*
                          Commenting the checkbox needed to create user as Host
                          <Checkbox
                            label={
                              <span>
                                <FormattedMessage id="hostMessage" />
                                <FontIcon
                                  className={classNames(classes.infoIcon, 'material-icons')}
                                  data-tip={intl.formatMessage({ id: 'hostMessage' })}
                                  data-class={classes.tooltipStyle}
                                  data-offset="{'bottom': -4}"
                                  data-place="bottom"
                                  data-effect="solid"
                                >
                                  info
                                </FontIcon>
                              </span>
                            }
                            style={styles.checkRemember.style}
                            labelStyle={styles.checkRemember.labelStyle}
                            iconStyle={styles.checkRemember.iconStyle}
                            checked={ishost}
                            onCheck={this.changeHostSettings}
                          />
                        */}
                      </div>
                      )
                  }

                  <div style={styles.registerbuttonsContainer}>
                    <RaisedButton
                      label={<FormattedMessage id="goBack" />}
                      onClick={this.updateRegisterForm}
                    />
                    {
                      showEmailSentMessage ?
                        null :
                        (
                          <input
                            type="submit"
                            className={classes.submitForgotButton}
                            value={intl.formatMessage({ id: 'registerLabel' })}
                          />
                        )
                    }
                  </div>
                </form>
                <div className={classes.registerText}>
                  <FormattedMessage id="registerAccount" />
                  <span onClick={() => this.updateRegisterForm(false)}>
                    <LinkItem to={'/tos'} linkClass={classes.tosButton}>
                      <FormattedMessage id="terms" />
                    </LinkItem>
                  </span>
                  <FormattedMessage id="readText" />
                  <span onClick={() => this.updateRegisterForm(false)}>
                    <LinkItem to={'/policy'} linkClass={classes.privacyButton}>
                      <FormattedMessage id="privacyLinkText" />
                    </LinkItem>
                  </span>.
                </div>
              </Paper>
            </div>
          </div>
        );
    }
}

Register.propTypes = {
    onGoBack: PropTypes.func.isRequired,
    userRegister: PropTypes.func.isRequired,
    sendRegisterFormData: PropTypes.func.isRequired,
    removeRegisterFormData: PropTypes.func.isRequired,
    registerData: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
};

const mapDispatchToProps = dispatch => ({
    userRegister(data) {
        return dispatch(createUser(data));
    },
    sendRegisterFormData(data) {
        return dispatch(updateRegisteredUser(data));
    },
    removeRegisterFormData() {
        return dispatch(removeRegisteredUser());
    },
});

export default injectIntl(connect(null, mapDispatchToProps)(Register));

