import { PropTypes } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { IntlProvider, intlShape } from 'react-intl';

// takes array of message keys and returns an object where keys and values are the same
function buildMessages(messageKeys = []) {
    return messageKeys.reduce((messages, key) => ({ ...messages, [key]: key }), {});
}

export function getIntl(messageKeys = []) {
    const intlProvider = new IntlProvider({ locale: 'en', messages: buildMessages(messageKeys) }, {});
    return intlProvider.getChildContext().intl;
}

// returns context and childContextTypes for intl and muiTheme
export function standardContext({ messageKeys = [] } = {}) {
    return {
        context: { muiTheme: getMuiTheme(), intl: getIntl(messageKeys) },
        childContextTypes: { muiTheme: PropTypes.object, intl: intlShape },
    };
}
