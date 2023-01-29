import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import ReactGA from 'react-ga';
import PageBase from '../../components/PageBase';
import PrivacyText from '../StaticContent/PrivacyText';
import { updateCurrentPage } from '../../actions/runTimeSettings';
import { PAGES } from '../../constants';

class PrivacyPolicy extends Component {
    componentDidMount() {
        this.props.updateCurrentComponent(PAGES.POLICY);
        window.scrollTo(0, 0);
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
    }
    render() {
        const { intl } = this.props;
        const privacyPolicy = intl.formatMessage({ id: 'privacyPolicy' });
        return (
          <div>
            <PageBase
              title={privacyPolicy}
              navigation={<FormattedMessage id="breadCrumbs.privacyPolicy" />}
              minHeight={300}
            >
              <PrivacyText intl={intl} />
            </PageBase>
          </div>
        );
    }
}

PrivacyPolicy.propTypes = {
    intl: intlShape.isRequired,
    updateCurrentComponent: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    updateCurrentComponent(data) {
        return dispatch(updateCurrentPage(data));
    },
});

export default injectIntl(connect(null, mapDispatchToProps)(PrivacyPolicy));
