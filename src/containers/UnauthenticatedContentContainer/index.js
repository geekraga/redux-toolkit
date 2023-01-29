import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../../themes/themeDefault';
import UnauthContent from './UnauthContentPane';
import RokuLink from './RokuLink';
import ResetForgotPassword from './ResetForgotPassword';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';
import PublicVideos from './PublicVideos';
import VerifyUser from '../../components/Auth/VerifyUser';
import NoMatch from '../NoMatchContainer';

export default function UnauthenticatedContentContainer() {
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={UnauthContent} />
            <Route path="/tos" component={TermsOfService} />
            <Route path="/policy" component={PrivacyPolicy} />
            <Route path="/link" component={RokuLink} />
            <Route path="/reset_password/:token" component={ResetForgotPassword} />
            <Route path="/verify_email/:email/:token" component={VerifyUser} />
            <Route path="/videoList/:property" component={PublicVideos} />
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider >
    );
}
