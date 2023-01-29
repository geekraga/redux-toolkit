/* eslint-disable no-console */
import React from 'react';
import { render } from 'react-dom';
import 'sanitize.css/sanitize.css';
import 'flexboxgrid/css/flexboxgrid.css';
import App from './App';
import './init';
import configureStore from './configureStore';
import reducers from './reducers';
import './styles/core.scss';

const store = configureStore(reducers);
const areIntlLocalesSupported = require('intl-locales-supported');

const localesMyAppSupports = [
  /* list locales here */
];

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(localesMyAppSupports)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and patch the constructors we need with the polyfill's.
    var IntlPolyfill    = require('intl');
    Intl.NumberFormat   = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = require('intl');
}

// Render the application
render(
  <App store={store} />,
  document.getElementById('app'),
);

