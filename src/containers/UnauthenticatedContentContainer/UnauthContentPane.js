import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Login from '../../components/Auth/Login';
import ForgotPassword from '../../components/Auth/ForgotPassword';
import Register from '../../components/Auth/Register';
import { changeAuthForgot } from '../../actions/common';

class UnauthContentPane extends Component {
    constructor() {
        super();
        this.showLogin = this.showLogin.bind(this);
        this.showRegister = this.showRegister.bind(this);
        this.showForgotPassword = this.showForgotPassword.bind(this);
    }

    showLogin() {
        this.props.changeView({ showForgotPassword: false, showRegister: false });
    }
    showRegister() {
        this.props.changeView({ showForgotPassword: false, showRegister: true });
    }
    showForgotPassword() {
        this.props.changeView({ showForgotPassword: true, showRegister: false });
    }

    render() {
        const { showForgotPassword, showRegister, registerData } = this.props;
        const secondaryContent = showForgotPassword ?
          <ForgotPassword onGoBack={this.showLogin} /> :
          <Login onRegister={this.showRegister} onForgotPassword={this.showForgotPassword} />;
        const content = showRegister ?
          <Register onGoBack={this.showLogin} registerData={registerData} /> :
          secondaryContent;

        return (
          <div>
            {content}
          </div >
        );
    }
}

UnauthContentPane.propTypes = {
    changeView: PropTypes.func.isRequired,
    showForgotPassword: PropTypes.bool.isRequired,
    showRegister: PropTypes.bool.isRequired,
    registerData: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
    showForgotPassword: reduxState.authentication.showForgotPassword,
    showRegister: reduxState.authentication.showRegister,
    registerData: reduxState.authentication.registerData,
});

const mapDispatchToProps = dispatch => ({
    changeView(data) {
        return dispatch(changeAuthForgot(data));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UnauthContentPane);
