'use strict';

require('dotenv').config();
import 'babel-polyfill';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import { apiUrl } from './constants/apiConstant';
const server = global.server = express();
import {Provider} from 'react-redux';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';

import logger from './util/logger';
import {port} from './config';
import assets from './assets';

// React And Redux Setup
import configureStore from './configureStore';
import {fetchComponentData} from './util/fetchData';
const ssrEnable = false;

let morgan = require('morgan');
morgan.token('remote-addr', (req, res) => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use('/healthcheck', require('express-healthcheck')());
server.use(express.static(path.join(__dirname, 'public'), {maxAge: 3600000}));
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

//
// Only use morgan logger in production
// -----------------------------------------------------------------------------
if (process.env.NODE_ENV === 'production') {
  server.use(morgan('combined'));
}

server.get('*', (req, res, next) => {
    const template = ejs.compile(require('./view/index.ejs.js'));
    const data = {
      title: 'WelcomeTV',
      entry: assets.index.js,
      vendor: assets.vendor.js,
      stylesheet: assets.index.css,
      geolocationKey: apiUrl.GOOGLE_GEOLOCATION_KEY,
      serverKey: apiUrl.FRONT_END_URL,
      body:""
    };
      res.status(200);
    res.send(template(data));
});

server.listen(port, () => {
  logger.info(`The server is running at http://localhost:${port}/ `);
});
