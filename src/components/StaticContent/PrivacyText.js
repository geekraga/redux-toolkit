import React from 'react';
import { intlShape } from 'react-intl';
import classes from './styles.scss';

export default function PrivacyText(props) {
    const { intl } = props;
    const privacyPolicyA = intl.formatMessage({ id: 'privacyPolicyA' });
    const heading1 = intl.formatMessage({ id: 'heading1' });
    const infoContent = intl.formatMessage({ id: 'infoContent' });
    const infoLiAheading = intl.formatMessage({ id: 'infoLiAheading' });
    const infoLiAcontent = intl.formatMessage({ id: 'infoLiAcontent' });
    const infoLiBheading = intl.formatMessage({ id: 'infoLiBheading' });
    const infoLiBcontent = intl.formatMessage({ id: 'infoLiBcontent' });
    const infoLiCheading = intl.formatMessage({ id: 'infoLiCheading' });
    const infoLiCcontent = intl.formatMessage({ id: 'infoLiCcontent' });
    const infoLiDheading = intl.formatMessage({ id: 'infoLiDheading' });
    const infoLiDcontent = intl.formatMessage({ id: 'infoLiDcontent' });
    const infoLiEheading = intl.formatMessage({ id: 'infoLiEheading' });
    const infoLiEcontent = intl.formatMessage({ id: 'infoLiEcontent' });
    const heading2 = intl.formatMessage({ id: 'heading2' });
    const cookiesLi1 = intl.formatMessage({ id: 'cookiesLi1' });
    const cookiesLi2 = intl.formatMessage({ id: 'cookiesLi2' });
    const heading3 = intl.formatMessage({ id: 'heading3' });
    const heading3Content = intl.formatMessage({ id: 'heading3Content' });
    const heading3Li1Heading = intl.formatMessage({ id: 'heading3Li1Heading' });
    const heading3Li1Content = intl.formatMessage({ id: 'heading3Li1Content' });
    const heading3Li2Heading = intl.formatMessage({ id: 'heading3Li2Heading' });
    const heading3Li2Content = intl.formatMessage({ id: 'heading3Li2Content' });
    const heading3Li3Heading = intl.formatMessage({ id: 'heading3Li3Heading' });
    const heading3Li3Content = intl.formatMessage({ id: 'heading3Li3Content' });
    const heading3Li4Heading = intl.formatMessage({ id: 'heading3Li4Heading' });
    const heading3Li4Content = intl.formatMessage({ id: 'heading3Li4Content' });
    const heading4 = intl.formatMessage({ id: 'heading4' });
    const heading4Content = intl.formatMessage({ id: 'heading4Content' });
    const heading5 = intl.formatMessage({ id: 'heading5' });
    const heading5Content = intl.formatMessage({ id: 'heading5Content' });
    const heading6 = intl.formatMessage({ id: 'heading6' });
    const heading6Content = intl.formatMessage({ id: 'heading6Content' });
    const heading6ContentContinued = intl.formatMessage({ id: 'heading6ContentContinued' });
    const heading7 = intl.formatMessage({ id: 'heading7' });
    const heading7Li1Content = intl.formatMessage({ id: 'heading7Li1Content' });
    const heading7Li2Content = intl.formatMessage({ id: 'heading7Li2Content' });
    const heading7Li3Content = intl.formatMessage({ id: 'heading7Li3Content' });
    const heading7Li3ContentContinued = intl.formatMessage({ id: 'heading7Li3ContentContinued' });
    const heading8 = intl.formatMessage({ id: 'heading8' });
    const heading8Content = intl.formatMessage({ id: 'heading8Content' });
    const heading9 = intl.formatMessage({ id: 'heading9' });
    const heading9Content = intl.formatMessage({ id: 'heading9Content' });
    const heading10 = intl.formatMessage({ id: 'heading10' });
    const heading10Content = intl.formatMessage({ id: 'heading10Content' });
    const heading10ContentContinued = intl.formatMessage({ id: 'heading10ContentContinued' });

    return (
      <div className={classes.mainContent}>
        <div>{privacyPolicyA}</div>
        <h3>{heading1}</h3>
        <div>{infoContent}</div>
        <ul>
          <li><h3>{infoLiAheading}</h3>{infoLiAcontent}</li>
          <li><h3>{infoLiBheading}</h3>{infoLiBcontent}</li>
          <li><h3>{infoLiCheading}</h3>{infoLiCcontent}</li>
          <li><h3>{infoLiDheading}</h3>{infoLiDcontent}</li>
          <li><h3>{infoLiEheading}</h3>{infoLiEcontent}</li>
        </ul>
        <h3>{heading2}</h3>
        <ul>
          <li>{cookiesLi1}</li>
          <li>{cookiesLi2}</li>
        </ul>
        <h3>{heading3}</h3>
        <div>{heading3Content}</div>
        <ul>
          <li><h3>{heading3Li1Heading}</h3>{heading3Li1Content}</li>
          <li>
            <h3>{heading3Li2Heading}</h3>
            {heading3Li2Content}
            <a href="mailto:privacy@welcometv.net" target="_top">privacy@welcometv.net</a>.
          </li>
          <li><h3>{heading3Li3Heading}</h3>{heading3Li3Content}</li>
          <li><h3>{heading3Li4Heading}</h3>{heading3Li4Content}</li>
        </ul>
        <h3>{heading4}</h3>
        <div>{heading4Content}</div>
        <h3>{heading5}</h3>
        <div>{heading5Content}</div>
        <h3>{heading6}</h3>
        <div>
          {heading6Content}
          <a href="mailto:support@welcometv.net" target="_top">support@welcometv.net</a>.
          {heading6ContentContinued}
        </div>
        <h3>{heading7}</h3>
        <ul>
          <li>{heading7Li1Content}</li>
          <li>{heading7Li2Content}</li>
          <li>
            {heading7Li3Content}
            <a href="mailto:privacy@welcometv.net" target="_top">privacy@welcometv.net</a>.
            {heading7Li3ContentContinued}
          </li>
        </ul>
        <h3>{heading8}</h3>
        <div>{heading8Content}</div>
        <h3>{heading9}</h3>
        <div>
          {heading9Content}
          <a href="mailto:support@welcometv.net" target="_top">support@welcometv.net</a>
        </div>
        <h3>{heading10}</h3>
        <div>
          {heading10Content}
          <a href="mailto:webmaster@welcometv.net" target="_top">webmaster@welcometv.net</a>.
          {heading10ContentContinued}
        </div>
      </div>
    );
}

PrivacyText.propTypes = {
    intl: intlShape.isRequired,
};
