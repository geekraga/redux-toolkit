import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import ResetPassword from '../../components/Auth/ResetPassword';
import { validateToken } from '../../actions/async/authentication';

class ResetForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            showContent: false,
            token: '',
        };
    }
    componentWillMount() {
        const apiData = this.props.match.params;
        this.props.validateUrlToken(apiData).then(response => {
            if (response === 200) {
                this.setState({ showContent: true, token: apiData['token'] });
            } else {
                this.setState({ showContent: true });
            }
        });
    }

    componentDidMount() {
        const page = '/reset_password';
        ReactGA.set({ page });
        ReactGA.pageview(page);
    }

    render() {
        const { showContent, token } = this.state;
        if (!showContent) {
            return null;
        }
        return (
          <div>
            <ResetPassword token={token} />
          </div>
        );
    }
}

ResetForgotPassword.propTypes = {
    validateUrlToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    validateUrlToken(data) {
        return dispatch(validateToken(data));
    },
});

export default connect(null, mapDispatchToProps)(ResetForgotPassword);
