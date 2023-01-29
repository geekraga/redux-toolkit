import React from 'react';
import { FormattedMessage } from 'react-intl';
import c from 'classnames';
import { SOCIAL_LINKS, RECOMMENDED_VIDEO_FEEDBACK_URL, IOS_APP_LINK } from '../../../constants';
import LinkItem from '../../../components/LinkItem';
import classes from './styles.scss';

const Footer = () => (
  <div className={classes.footerMain}>
    <div className={classes.footerHeader}>
      <div className="row">
        <div className={c('col-xs-12 col-sm-6', classes.feedBackContent)}>
          <img src={require('../../../public/feedbackIcon.png')} alt="" />
          <span className={classes.shareFeedbackText}>
            <FormattedMessage id="shareFeedback1" />
            <a
              href={RECOMMENDED_VIDEO_FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedMessage id="shareFeedback2" />
            </a>.
          </span>
        </div>
        <div className={c('col-xs-12 col-sm-6', classes.hostContent)}>
          <div className={classes.mobileFooter} />
          <span className={classes.hostContentText}>
            <FormattedMessage id="welcomeTvHostContent1" />
            <a
              href={IOS_APP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedMessage id="welcomeTvHostContent2" />
            </a>
            <FormattedMessage id="welcomeTvHostContent3" />
          </span>
        </div>
      </div>
    </div>
    <div className={classes.footerBottom}>
      <div className="row">
        <div className="col-xs-12 col-sm-4">
          &copy;<FormattedMessage id="welcomeSystemsRights" />
        </div>
        <div className={c('col-xs-12 col-sm-4', classes.textCenter)}>
          <a
            href={SOCIAL_LINKS.FACEBOOK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={require('../../../public/facebookIcon.png')} alt="" />
          </a>
          <a
            href={SOCIAL_LINKS.TWITTER}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={require('../../../public/twitterIcon.png')} alt="" />
          </a>
          <a
            href={SOCIAL_LINKS.LINKED_IN}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={require('../../../public/linkedinIcon.png')} alt="" />
          </a>
        </div>
        <div className="col-xs-12 col-sm-4">
          <div className={classes.footerLinks}>
            <LinkItem to={'#'}>
              <FormattedMessage id="support" />
            </LinkItem>
            <LinkItem to={'/tos'}>
              <FormattedMessage id="terms" />
            </LinkItem>
            <LinkItem to={'/policy'}>
              <FormattedMessage id="privacyLinkText" />
            </LinkItem>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
