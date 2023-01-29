import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Profile from '../ProfileContainer';
import VideoUploader from '../VideoUploader';
import VideoManagement from '../VideoManagement';
import TermsOfService from '../../components/TermsOfService';
import PrivacyPolicy from '../../components/PrivacyPolicy';
import NoMatch from '../NoMatchContainer';

export default function UserRoutes() {
    return (
      <Switch>
        <Route exact path="/" component={VideoManagement} />
        <Route path="/videos" component={VideoManagement} />
        <Route path="/profile" component={Profile} />
        <Route path="/videoUpload" component={VideoUploader} />
        <Route path="/tos" component={TermsOfService} />
        <Route path="/policy" component={PrivacyPolicy} />
        <Route component={NoMatch} />
      </Switch>
    );
}
