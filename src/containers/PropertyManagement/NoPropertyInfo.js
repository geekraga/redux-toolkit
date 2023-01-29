import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { RaisedButton } from 'material-ui';
import { IOS_APP_LINK, WELCOME_STATIC_SITE } from '../../constants';
import LinkItem from '../../components/LinkItem';
import classes from './styles.scss';

export default function NoPropertyInfo({ validateForm, username }) {
    return (
      <div className={classes.noPropAdded}>
        <h2>
          Hello {username}
        </h2>
        <h3>
          Welcome Onboard!
        </h3>
        <p>
          Thanks for signing into WelcomeTV Central, our portal for managing all your guest engagement needs.
          <br />
          <br />
          <strong>
            Mobile App:
          </strong>
          This portal is best suited for vacation rental managers who have a large portfolio of properties.
          If you have only a handful of properties, we recommend trying out WelcomeTV Studio, our mobile app
          for short-term rental hosts. Its built-in camera app makes it very easy to create property videos
          and manage properties.
          <br />
          <br />
          Download the WelcomeTV Studio app from
          <a href={IOS_APP_LINK} target="_blank" rel="noopener noreferrer">
            Apple AppStore
          </a>
          <br />
          <br />
          <strong>
            Free On-boarding Help:
          </strong>
          For videos that can help with the WelcomeTV setup and to signup for a free on-boarding session,
          please check out our
          <a href={WELCOME_STATIC_SITE} target="_blank" rel="noopener noreferrer">
            support page
          </a>.
        </p>
        <RaisedButton
          className={classes.uploadButtonWrapper}
          containerElement="label"
          primary
        >
          <LinkItem to={'property/form/0'}>
            <span className={classes.addProp} onClick={validateForm}>
              <FormattedMessage id="noPropertyMessageLink" />
            </span>
          </LinkItem>
        </RaisedButton>
      </div>
    );
}

NoPropertyInfo.propTypes = {
    validateForm: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
};
