import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import trim from 'lodash/trim';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import c from 'classnames';
import SafeImage from '../SafeImage';
import { updateUserDetails, getUserRoles } from '../../actions/async/userManagement';
import PageBase from '../PageBase';
import LoadingIndicator from '../LoadingIndicator';
import { validateEmail } from '../../util/regexStorage';
import styles from './styles';
import classes from './styles.scss';

class FormPage extends Component {
    constructor(props) {
        super(props);
        const userId = props.match.params.user;
        const { userList } = props;
        let userInfo = {};
        if (userList.length) {
            userList.forEach(item => {
                if (item.id === parseInt(userId, 10)) {
                    userInfo = item;
                }
            });
        }
        this.state = {
            newUser: false,
            editEmail: false,
            showLoader: true,
            userInfo,
            userId: get(userInfo, 'id', 0),
            isEnabled: get(userInfo, 'isEnabled', 'NOT_SET'),
            firstname: get(userInfo, 'firstname', ''),
            lastname: get(userInfo, 'lastname', ''),
            email: get(userInfo, 'email', ''),
            userAvatar: get(userInfo, 'imageUrl', ''),
            password: '',
            conPassword: '',
            roles: [],
            roleValue: get(userInfo, 'roles[0].id', ''),
            firstnameErrorLabel: '',
            lastnameErrorLabel: '',
            isEnabledErrorLabel: '',
            roleErrorLabel: '',
            passwordErrorLabel: '',
            conPasswordErrorLabel: '',
            emailErrorLabel: '',
            emailEditErrorLabel: '',
            showSubmitError: '',
            showSubmitSuccess: false,
        };

        this.errorMessages = {
            firstNameError: <FormattedMessage id="firstNameError" />,
            lastNameError: <FormattedMessage id="lastNameError" />,
            passwordError: <FormattedMessage id="passwordError" />,
            emailError: <FormattedMessage id="emailValidError" />,
            conPasswordErrorLabel: <FormattedMessage id="confirmPasswordError" />,
            sameErrorLabel: <FormattedMessage id="samePasswordError" />,
            emailEditError: <FormattedMessage id="emailEditError" />,
            isEnabledError: <FormattedMessage id="isEnabledError" />,
            roleError: <FormattedMessage id="roleError" />,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.checkIsEmpty = this.checkIsEmpty.bind(this);
        this.passwordValidate = this.passwordValidate.bind(this);
    }

    componentWillMount() {
        ReactTooltip.hide();
        const { history, isFormPageValid } = this.props;
        if (!isFormPageValid) {
            history.push('/users');
        }
    }
    componentDidMount() {
        if (isEmpty(this.state.userInfo)) {
            this.setState({ newUser: true, editEmail: true });
        }
        this.props.userRoles().then(response => {
            if (response.status === 200) {
                this.setState({ roles: this.props.roles, showLoader: false });
            }
        });
    }

    handleRoleChange(event, index, roleValue) {
        this.setState({ roleValue, roleErrorLabel: '' });
    }

    checkIsEmpty(value) {
        if (value === 'NOT_SET') {
            return false;
        }
        return true;
    }

    handleStatusChange(event, index, isEnabled) {
        this.setState({ isEnabled, isEnabledErrorLabel: '' });
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value,
                [`${event.target.name}ErrorLabel`]: '',
                showSubmitError: '',
                showSubmitSuccess: false,
            },
        );
    }
    passwordValidate() {
        const { password, conPassword, newUser } = this.state;
        if ((password === conPassword) && trim(password) && trim(conPassword) && newUser) {
            return true;
        } else if (!newUser) {
            return true;
        } else {
            return false;
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const {
            userId,
            newUser,
            firstname,
            lastname,
            password,
            conPassword,
            email,
            userInfo,
            isEnabled,
            roleValue,
            editEmail,
          } = this.state;
        const { updateUser } = this.props;
        if (userInfo && email !== userInfo.email && !editEmail) {
            this.setState({ emailEditErrorLabel: this.errorMessages.emailEditError });
        } else if (
            trim(firstname) && trim(lastname) && (this.checkIsEmpty(isEnabled)) &&
            (roleValue) && validateEmail(email) && (this.passwordValidate()) &&
            (
              firstname !== userInfo.firstname || lastname !== userInfo.lastname
              || isEnabled !== userInfo.isEnabled || roleValue !== userInfo.roles[0].id || trim(password)
            )
        ) {
            const apiData = { id: userId, firstname, lastname, password, email, isEnabled, roles: [`${roleValue}`] };
            this.setState({ showLoader: true });
            updateUser(apiData).then(response => {
                this.setState({ showLoader: false });
                if (response.status === 200) {
                    this.setState({ showSubmitSuccess: true });
                    this.props.history.push('/users');
                } else if (response.error.response) {
                    this.setState({ showSubmitError: response.error.response.data.message });
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
            if (!trim(password) && newUser) {
                this.setState({ passwordErrorLabel: this.errorMessages.passwordError });
            }
            if (!validateEmail(email)) {
                this.setState({ emailErrorLabel: this.errorMessages.emailError });
            }
            if (isEnabled === 'NOT_SET') {
                this.setState({ isEnabledErrorLabel: this.errorMessages.isEnabledError });
            }
            if (password !== conPassword && newUser) {
                this.setState({ conPasswordErrorLabel: this.errorMessages.sameErrorLabel });
            }
            if (!roleValue) {
                this.setState({ roleErrorLabel: this.errorMessages.roleError });
            }
        }
    }
    render() {
        const { showLoader } = this.state;
        const { roles } = this.props;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const firstnameTextValue = <FormattedMessage id="firstNameText" />;
        const lastNameTextValue = <FormattedMessage id="lastNameText" />;
        const passwordTextValue = <FormattedMessage id="passwordText" />;
        const conPassTextValue = <FormattedMessage id="confirmPasswordText" />;
        const emailTextValue = <FormattedMessage id="emailText" />;
        const isEnabledTextValue = <FormattedMessage id="status" />;
        const roleTextValue = <FormattedMessage id="roleText" />;
        const {
            firstnameErrorLabel,
            lastnameErrorLabel,
            passwordErrorLabel,
            conPasswordErrorLabel,
            isEnabledErrorLabel,
            roleErrorLabel,
            emailErrorLabel,
            emailEditErrorLabel,
            showSubmitError,
            showSubmitSuccess,
            userAvatar,
        } = this.state;
        return (
          <PageBase
            title={<FormattedMessage id="form" />}
            navigation={<FormattedMessage id="breadCrumbs.userform" />}
            minHeight={350}
          >
            {loadingIndicator}
            <form onSubmit={this.handleFormSubmit}>
              {
                showSubmitError ? (
                  <div className={classes.passwordFailContainer}>
                    <FormattedMessage id={showSubmitError} defaultMessage={showSubmitError} />
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

              <div className="row">
                <div className="col-xs-12 col-sm-8">
                  <TextField
                    name="firstname"
                    hintText={firstnameTextValue}
                    defaultValue={this.state.userInfo && this.state.userInfo.firstname}
                    floatingLabelText={firstnameTextValue}
                    fullWidth
                    errorText={firstnameErrorLabel}
                    onChange={this.handleChange}
                  />

                  <TextField
                    name="lastname"
                    hintText={lastNameTextValue}
                    defaultValue={this.state.userInfo && this.state.userInfo.lastname}
                    floatingLabelText={lastNameTextValue}
                    fullWidth
                    errorText={lastnameErrorLabel}
                    onChange={this.handleChange}
                  />
                </div>

                <div className={c('col-xs-12 col-sm-4', classes.userPicContainer)}>
                  <SafeImage
                    imageUrl={userAvatar}
                    componentClass={classes.userProfilePic}
                  />
                </div>
              </div>

              <TextField
                name="password"
                hintText={passwordTextValue}
                value={this.state.password}
                type="password"
                floatingLabelText={passwordTextValue}
                fullWidth
                errorText={passwordErrorLabel}
                onChange={this.handleChange}
              />

              <TextField
                name="conPassword"
                hintText={conPassTextValue}
                value={this.state.conPassword}
                type="password"
                disabled={!this.state.newUser}
                floatingLabelText={conPassTextValue}
                fullWidth
                errorText={conPasswordErrorLabel}
                onChange={this.handleChange}
              />

              <TextField
                name="email"
                hintText={emailTextValue}
                disabled={!this.state.editEmail}
                defaultValue={this.state.userInfo && this.state.userInfo.email}
                floatingLabelText={emailTextValue}
                fullWidth
                errorText={(this.state.editEmail) ? emailErrorLabel : emailEditErrorLabel}
                onChange={this.handleChange}
              />

              <SelectField
                floatingLabelText={roleTextValue}
                hintText={roleTextValue}
                errorText={roleErrorLabel}
                value={this.state.roleValue}
                onChange={this.handleRoleChange}
                fullWidth
              >
                {(roles && roles.map(item => (
                  <MenuItem key={item.id} value={item.id} primaryText={item.role} />
                )))}
              </SelectField>

              <SelectField
                floatingLabelText={isEnabledTextValue}
                hintText={isEnabledTextValue}
                errorText={isEnabledErrorLabel}
                value={(this.state.isEnabled !== 'NOT_SET') ? this.state.isEnabled : ''}
                onChange={this.handleStatusChange}
                fullWidth
              >
                <MenuItem value={true} primaryText={<FormattedMessage id="enable" />} />
                <MenuItem value={false} primaryText={<FormattedMessage id="disable" />} />
              </SelectField>

              <div style={styles.buttons}>
                <Link to="/users" className={classes.cancelButtonLink}>
                  <RaisedButton
                    label={<FormattedMessage id="cancel" />}
                    icon={<FontIcon className="material-icons">clear</FontIcon>}
                  />
                </Link>
                <RaisedButton
                  label={<FormattedMessage id="saveDetails" />}
                  className={classes.btnSubDetails}
                  containerElement="label"
                  icon={<FontIcon className="material-icons">check</FontIcon>}
                  primary
                >
                  <input type="submit" className={classes.btnSubmit} />
                </RaisedButton>
              </div>
            </form>
          </PageBase>
        );
    }
}

FormPage.defaultProps = {
    userList: [],
    roles: [],
};

FormPage.propTypes = {
    updateUser: PropTypes.func.isRequired,
    userRoles: PropTypes.func.isRequired,
    isFormPageValid: PropTypes.bool.isRequired,
    userList: PropTypes.array,
    roles: PropTypes.array,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

const mapStateToProps = reduxState => ({
    userList: reduxState.usersList.allUsers,
    roles: reduxState.formPage.roles,
    isFormPageValid: reduxState.runtimeSettings.isFormPageValid,
});

const mapDispatchToProps = dispatch => ({
    updateUser(data) {
        return dispatch(updateUserDetails(data));
    },
    userRoles() {
        return dispatch(getUserRoles());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
