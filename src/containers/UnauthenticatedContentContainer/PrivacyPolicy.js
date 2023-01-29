import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PrivacyText from '../../components/StaticContent/PrivacyText';
import classes from './styles.scss';

function PrivacyPolicy(props) {
    const { intl } = props;
    const privacyPolicy = intl.formatMessage({ id: 'privacyPolicy' });
    return (
      <div className={classes.mainContainer}>
        <h1>
          {privacyPolicy}
        </h1>
        <PrivacyText intl={intl} />
      </div>
    );
}

PrivacyPolicy.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(PrivacyPolicy);
