import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import ReactGA from 'react-ga';
import PageBase from '../../components/PageBase';
import TermsText from '../StaticContent/TermsText';
import { updateCurrentPage } from '../../actions/runTimeSettings';
import { PAGES } from '../../constants';

class TermsOfService extends Component {
    componentDidMount() {
        this.props.updateCurrentComponent(PAGES.TOS);
        window.scrollTo(0, 0);
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
    }
    render() {
        const { intl } = this.props;
        return (
          <div>
            <PageBase
              title={<FormattedMessage id="tos" />}
              navigation={<FormattedMessage id="breadCrumbs.termsOfService" />}
              minHeight={300}
            >
              <TermsText intl={intl} />
            </PageBase>
          </div>
        );
    }
}

TermsOfService.propTypes = {
    intl: intlShape.isRequired,
    updateCurrentComponent: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    updateCurrentComponent(data) {
        return dispatch(updateCurrentPage(data));
    },
});

export default injectIntl(connect(null, mapDispatchToProps)(TermsOfService));
