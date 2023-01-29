import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import { resetForgotPassword } from '../../../actions/async/authentication';
import ChangePassword from '../../ChangePassword';
import LoadingIndicator from '../../LoadingIndicator';
import styles from '../styles';
import classes from '../styles.scss';

class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            showLoader: false,
            showSubmitSuccess: false,
            showSubmitError: '',
            passwordUpdateSuccess: false,
        };
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChangePassword(data) {
        this.setState({ showLoader: true });
        const { token } = this.props;
        const apiData = { ...data, forgotPasswordToken: token };
        this.props.changePassword(apiData).then(response => {
            this.setState({ showLoader: false });
            if (response === 200) {
                this.setState({ passwordUpdateSuccess: true });
            } else {
                this.setState({ showSubmitError: 'apiError', showSubmitSuccess: false });
            }
        });
    }

    render() {
        const { showLoader, showSubmitSuccess, showSubmitError, passwordUpdateSuccess } = this.state;
        const { token } = this.props;

        const content = token ?
            (
              <ChangePassword
                showSubmitSuccess={showSubmitSuccess}
                showSubmitError={showSubmitError}
                showHeader={false}
                classname={classes.customContainer}
                changePassword={this.handleChangePassword}
                buttonText={'resetPassword'}
              />
            ) :
              <FormattedMessage id="tokenInvalid" />;

        const showContent = passwordUpdateSuccess ?
          <FormattedMessage id="forgotPasswordSuccess" /> :
          content;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const showRedirectLink = (passwordUpdateSuccess || !token) ?
               (
                 <RaisedButton
                   href="/"
                   label={<FormattedMessage id="login" />}
                 />
               ) : null;
        return (
          <div>
            <div style={styles.boxContainer}>
              <Paper style={styles.paper}>
                <div>
                  <div style={styles.title}>
                    <FormattedMessage id="resetPasswordLabel" />
                  </div>
                  <div className={classes.logoSmallContainer} />
                </div>
                <hr />
                <div className={classes.textContainer}>
                  {loadingIndicator}
                  {showContent}
                </div>

                <div style={styles.resetpasswordButtonsContainer}>
                  { showRedirectLink }
                </div>

              </Paper>
            </div>
          </div>
        );
    }
}

ResetPassword.propTypes = {
    token: PropTypes.string.isRequired,
    changePassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    changePassword(data) {
        return dispatch(resetForgotPassword(data));
    },
});

export default connect(null, mapDispatchToProps)(ResetPassword);

