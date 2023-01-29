import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import classNames from 'classnames';
import ReactGA from 'react-ga';
import LoadingIndicator from '../../LoadingIndicator';
import { verifyUser } from '../../../actions/async/fetchData';
import styles from '../styles';
import classes from '../styles.scss';

class VerifyUser extends Component {
    constructor() {
        super();
        this.state = {
            showContent: false,
            isUserValid: false,
        };
    }
    componentWillMount() {
        const apiData = this.props.match.params;
        this.props.verifyUserData(apiData).then(response => {
            if (response === 200) {
                this.setState({ showContent: true, isUserValid: true });
            } else {
                this.setState({ showContent: true, isUserValid: false });
            }
        });
    }

    componentDidMount() {
        const page = '/verify_email';
        ReactGA.set({ page });
        ReactGA.pageview(page);
    }

    render() {
        const { showContent, isUserValid } = this.state;

        const loadingIndicator = !showContent ? <LoadingIndicator /> : null;

        const content = isUserValid ?
          <FormattedMessage id="userVerifySuccess" /> :
          <FormattedMessage id="userVerifyFailure" />;

        return (
          <div>
            <div style={styles.boxContainer}>
              {loadingIndicator}
              {
                showContent ?
                  (
                    <Paper style={styles.paper}>
                      <div>
                        <div style={styles.title} />
                        <div className={classes.centerLogoContainer} />
                      </div>
                      <div
                        className={
                          classNames({
                              [classes.userVerifiedSuccess]: isUserValid,
                              [classes.userVerifiedFailed]: !isUserValid,
                          })
                        }
                      >
                        {content}
                      </div>
                      <div style={styles.resetpasswordButtonsContainer}>
                        <RaisedButton
                          href="/"
                          label={<FormattedMessage id="login" />}
                        />
                      </div>
                    </Paper>
                  ) :
                  null
              }
            </div>
          </div>
        );
    }
}

VerifyUser.propTypes = {
    verifyUserData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    verifyUserData(data) {
        return dispatch(verifyUser(data));
    },
});

export default connect(null, mapDispatchToProps)(VerifyUser);
