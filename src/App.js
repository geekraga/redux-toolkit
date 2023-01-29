import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'babel-polyfill';
import ThemeDefault from './themes/themeDefault';
import Gatekeeper from './Gatekeeper';

export default function App({ store }) {
    return (
      <Provider store={store}>
        <IntlProvider store={store}>
          <MuiThemeProvider muiTheme={ThemeDefault}>
            <Gatekeeper />
          </MuiThemeProvider>
        </IntlProvider>
      </Provider>
    );
}

App.propTypes = {
    store: React.PropTypes.object.isRequired,
};
