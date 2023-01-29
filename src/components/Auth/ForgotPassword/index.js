import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import ReactGA from 'react-ga';
import LoadingIndicator from '../../LoadingIndicator';
import { forgotPasswordResponse } from '../../../actions/async/authentication';
import { validateEmail } from '../../../util/regexStorage';
import styles from '../styles';
import classes from '../styles.scss';

class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            emailErrorLabel: '',
            showLoader: false,
            showEmailSentMessage: false,
            message: 'forgotPasswordHeader',
            emailResponseFailed: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        const page = '/forgot_password';
        ReactGA.set({ page });
        ReactGA.pageview(page);
    }

    handleInputChange(e) {
        this.setState({ email: e.target.value, emailErrorLabel: '', emailResponseFailed: '' });
    }


    handleFormSubmit(event) {
        event.preventDefault();
        const { email, showLoader } = this.state;
        if (validateEmail(email) && !showLoader) {
            this.setState({ showLoader: true });
            this.props.getEmailResponse({ email }).then(
                response => {
                    this.setState({ showLoader: false });
                    if (response.status === 200) {
                        this.setState({
                            showEmailSentMessage: true,
                            message: 'emailAuthSuccess',
                        });
                    } else if (response.error.response) {
                        this.setState({ emailResponseFailed: response.error.response.data.message });
                    } else {
                        this.setState({ emailResponseFailed: 'apiError' });
                    }
                });
        } else {
            this.setState({ emailErrorLabel: <FormattedMessage id="emailValidError" /> });
        }
    }

    render() {
        const { message, email, emailErrorLabel, showLoader, emailResponseFailed } = this.state;
        const { intl } = this.props;
        const emailTextValue = <FormattedMessage id="emailText" />;
        const emailAuthFailure = emailResponseFailed ?
          <FormattedMessage id={emailResponseFailed} defaultMessage={emailResponseFailed} /> :
          null;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        return (
          <div>
            <div style={styles.boxContainer}>
              { loadingIndicator }
              <Paper style={styles.paper}>
                <div>
                  <div style={styles.title}>
                    <FormattedMessage id="forgotPasswordLabel" />
                  </div>
                  <div className={classes.logoSmallContainer} />
                </div>
                <hr />
                <p className={classes.forgotPassMessage}>
                  <FormattedMessage id={message} />
                </p>
                <p className={classes.emailFailed}>
                  {emailAuthFailure}
                </p>

                <form onSubmit={this.handleFormSubmit}>
                  {
                    this.state.showEmailSentMessage ? null :
                    (
                      <TextField
                        hintText={emailTextValue}
                        floatingLabelText={emailTextValue}
                        fullWidth
                        value={email}
                        onChange={this.handleInputChange}
                        errorText={emailErrorLabel}
                        maxLength="100"
                      />
                    )
                  }

                  <div style={styles.forgotbuttonsContainer}>
                    <RaisedButton
                      label={<FormattedMessage id="goBack" />}
                      onClick={this.props.onGoBack}
                    />

                    {
                      this.state.showEmailSentMessage ? null :
                      (
                        <input
                          type="submit"
                          className={classes.submitForgotButton}
                          value={intl.formatMessage({ id: 'submit' })}
                        />

                      )
                    }
                  </div>
                </form>
              </Paper>
            </div>
          </div>
        );
    }
}

ForgotPassword.propTypes = {
    onGoBack: PropTypes.func.isRequired,
    getEmailResponse: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
};

const mapDispatchToProps = dispatch => ({
    getEmailResponse(data) {
        return dispatch(forgotPasswordResponse(data));
    },
});

export default injectIntl(connect(null, mapDispatchToProps)(ForgotPassword));
