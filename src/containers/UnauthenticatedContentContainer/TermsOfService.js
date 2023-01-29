import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import TermsText from '../../components/StaticContent/TermsText';
import classes from './styles.scss';

function TermsOfService(props) {
    const { intl } = props;
    const tos = intl.formatMessage({ id: 'tos' });
    return (
      <div className={classes.mainContainer}>
        <h1>
          {tos}
        </h1>
        <TermsText intl={intl} />
      </div>
    );
}
TermsOfService.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(TermsOfService);
