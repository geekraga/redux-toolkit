import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Profile from '../ProfileContainer';
import VideoUploader from '../VideoUploader';
import VideoManagement from '../VideoManagement';
import PropertyInformation from '../PropertyInformation';
import PropertyManagement from '../PropertyManagement';
import PropertyFormPage from '../../components/PropertyFormPage';
import PairDevicesFormPage from '../../components/PairDevicesFormPage';
import TermsOfService from '../../components/TermsOfService';
import PrivacyPolicy from '../../components/PrivacyPolicy';
import LinkDevice from '../LinkDevice';
import PublicVideoContainer from '../UnauthenticatedContentContainer/PublicVideos';
import NoMatch from '../NoMatchContainer';

export default function HostRoutes() {
    return (
      <Switch>
        <Route exact path="/" component={PropertyManagement} />
        <Route path="/profile" component={Profile} />
        <Route path="/videoUpload" component={VideoUploader} />
        <Route path="/property/form/:property" component={PropertyFormPage} />
        <Route path="/property/pair/devices/:pid" component={PairDevicesFormPage} />
        <Route path="/property/addInfo/:pid" component={PropertyInformation} />
        <Route path="/videos" component={VideoManagement} />
        <Route path="/tos" component={TermsOfService} />
        <Route path="/policy" component={PrivacyPolicy} />
        <Route path="/link" component={LinkDevice} />
        <Route path="/videoList/:property" component={PublicVideoContainer} />
        <Route component={NoMatch} />
      </Switch>
    );
}
