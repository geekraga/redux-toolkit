import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ReactGA from 'react-ga';
import PageBase from '../../components/PageBase';
import UserDetails from '../../components/UserDetails';
import ChangePassword from '../../components/ChangePassword';
import ProfilePicture from '../../components/ProfilePicComponent';
import LoadingIndicator from '../../components/LoadingIndicator';
import { changeUserPassword } from '../../actions/async/updateData';
import { updateCurrentPage } from '../../actions/runTimeSettings';
import { PAGES } from '../../constants';
import styles from './styles';
import classes from './styles.scss';

class ProfileContainer extends Component {
    constructor() {
        super();
        this.state = {
            showUserDetails: true,
            showLoader: false,
            showSubmitSuccess: false,
            showSubmitError: '',
        };
        this.enableUserDetails = this.enableUserDetails.bind(this);
        this.enableShowPassword = this.enableShowPassword.bind(this);
        this.displayLoader = this.displayLoader.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    componentDidMount() {
        this.props.updateCurrentComponent(PAGES.PROFILE);
        window.scrollTo(0, 0);
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
    }

    enableUserDetails() {
        this.setState({ showUserDetails: true });
    }

    enableShowPassword() {
        this.setState({ showUserDetails: false });
    }

    displayLoader(showLoader) {
        this.setState({ showLoader });
    }

    handleChangePassword(data) {
        this.displayLoader(true);
        this.props.changePassword(data).then(response => {
            this.displayLoader(false);
            if (response === 200) {
                this.setState({ showSubmitSuccess: true, showSubmitError: '' });
            } else {
                this.setState({ showSubmitError: 'apiError', showSubmitSuccess: false });
            }
        });
    }

    render() {
        const { userDashboard } = this.props;
        const { showUserDetails, showLoader, showSubmitSuccess, showSubmitError } = this.state;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;

        const content = showUserDetails ?
          <UserDetails userDashboard={userDashboard} showLoader={this.displayLoader} /> :
          (
            <ChangePassword
              showSubmitSuccess={showSubmitSuccess}
              showSubmitError={showSubmitError}
              changePassword={this.handleChangePassword}
            />
          );

        return (
          <PageBase
            title={<span>{userDashboard.firstname} {userDashboard.lastname}</span>}
            navigation={<FormattedMessage id="breadCrumbs.profile" />}
            minHeight={180}
          >
            <div className={classes.buttonContainer}>

              <FlatButton
                label={<FormattedMessage id="details" />}
                style={styles.flatButton}
                icon={<FontIcon className="material-icons">view_module</FontIcon>}
                className={classNames({ [classes.button]: showUserDetails })}
                labelStyle={styles.spanstyle}
                onClick={this.enableUserDetails}
                disabled={showLoader}
              />

              <FlatButton
                label={<FormattedMessage id="changePassword" />}
                style={styles.flatButton}
                icon={<FontIcon className="material-icons">lock_open</FontIcon>}
                className={classNames({ [classes.button]: !showUserDetails })}
                labelStyle={styles.spanstyle}
                onClick={this.enableShowPassword}
                disabled={showLoader}
              />
            </div>

            <div className={classes.profileContainer}>
              {loadingIndicator}
              <div className={classNames(classes.paddingNone, 'container-fluid')}>
                <div className="row">

                  <div className="col-xs-12 col-sm-6">
                    {content}
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <ProfilePicture
                      profilepicurl={userDashboard.profilepicurl}
                      showLoader={this.displayLoader}
                    />
                  </div>
                </div>
              </div>
            </div>
          </PageBase>
        );
    }
}

ProfileContainer.propTypes = {
    userDashboard: PropTypes.object.isRequired,
    changePassword: PropTypes.func.isRequired,
    updateCurrentComponent: PropTypes.func.isRequired,
};

function mapStateToProps(reduxState) {
    return {
        userDashboard: reduxState.userDashboard.dashboard,
    };
}

const mapDispatchToProps = dispatch => ({
    changePassword(data) {
        return dispatch(changeUserPassword(data));
    },
    updateCurrentComponent(data) {
        return dispatch(updateCurrentPage(data));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

