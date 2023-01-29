import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import ReactGA from 'react-ga';
import c from 'classnames';
import { IOS_APP_LINK } from '../../../constants';
import LinkItem from '../../../components/LinkItem';
import classes from './styles.scss';
import appStoreImage from '../../../public/ic-appstore.png';
import wtv from '../../../public/wtv.png';
import createChannel from '../../../public/createChannel.png';
import clinking from '../../../public/clinking.png';
import logo from '../../../public/logoWeb.png';

class RokuLink extends Component {
    state = { heightContainer: '100px' };

    componentDidMount() {
        window.addEventListener('resize', this.updateContentDimensions);
        this.updateContentDimensions();
        const page = '/unAuthenticatedRokuUsersLink';
        ReactGA.set({ page });
        ReactGA.pageview(page);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateContentDimensions);
    }

    updateContentDimensions = () => {
        const heightContainer = `${window.innerHeight}px`;
        this.setState({ heightContainer });
    }

    render() {
        const { intl } = this.props;
        const { heightContainer } = this.state;
        return (
          <div style={{ minHeight: heightContainer }} className={classes.mainContainer}>
            <div className={classes.logoContainer}>
              <img src={logo} alt="Welcome TV Central" />
            </div>
            <div className={classes.textContainer}>
              <div className={c(classes.containerDiv, 'row')}>
                <div className="col-xs-12 col-sm-4">
                  <div className={classes.boxWrapper}>
                    <h2>
                      {intl.formatMessage({ id: 'linkRokuHeadingA1' })}
                      <br />
                      {intl.formatMessage({ id: 'linkRokuHeadingA2' })}
                    </h2>
                    <img src={wtv} alt="Welcome TV" />
                    <p>
                      {intl.formatMessage({ id: 'linkRokuTextA1' })}
                      <br /><br />
                      {intl.formatMessage({ id: 'linkRokuTextA2' })}
                    </p>
                    <a
                      href="http://www.welcometv.net/benefits.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.benefitsLink}
                    >
                      {intl.formatMessage({ id: 'linkRokuClick' })}
                      <i className="material-icons">
                        keyboard_backspace
                      </i>
                    </a>

                  </div>
                </div>
                <div className="col-xs-12 col-sm-4">
                  <div className={classes.boxWrapper}>
                    <h2>
                      {intl.formatMessage({ id: 'linkRokuHeadingC' })}
                    </h2>
                    <img src={createChannel} alt="Welcome TV" />
                    <h3>
                      {intl.formatMessage({ id: 'iPhoneText' })}
                    </h3>
                    <p>
                      {intl.formatMessage({ id: 'linkRokuTextB1' })}
                    </p>

                    <a href={IOS_APP_LINK} target="_blank" rel="noopener noreferrer">
                      <img src={appStoreImage} alt="appstore" />
                    </a>

                    <h3>
                      {intl.formatMessage({ id: 'androidText' })}
                    </h3>
                    <p>
                      {intl.formatMessage({ id: 'linkRokuTextB2' })}
                    </p>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4">
                  <div className={classes.boxWrapper}>
                    <h2>
                      {intl.formatMessage({ id: 'linkRokuHeadingB1' })}
                      <br />
                      {intl.formatMessage({ id: 'linkRokuHeadingB2' })}
                    </h2>
                    <img src={clinking} alt="Welcome TV" />
                    <p>
                      {intl.formatMessage({ id: 'linkRokuTextC1' })}
                      <br /><br />
                      {intl.formatMessage({ id: 'linkRokuTextC2' })}
                    </p>
                  </div>
                </div>
              </div>
              <div className={classes.infoContainer}>
                <div className={classes.backScreen} />
                <div className={classes.infoScreen} >
                  <ul>
                    <li>
                      <span><i>01</i></span>
                      {intl.formatMessage({ id: 'welcomeAppInstruction1' })}
                    </li>
                    <li>
                      <span><i>02</i></span>
                      {intl.formatMessage({ id: 'welcomeAppInstruction2' })}
                    </li>
                    <li>
                      <span><i>03</i></span>
                      {intl.formatMessage({ id: 'welcomeAppInstruction3' })}
                    </li>
                  </ul>
                  <RaisedButton
                    className={classes.loginButtonLink}
                    containerElement="label"
                  >
                    <LinkItem to={'/'} linkClass={classes.loginButton}>
                      {intl.formatMessage({ id: 'getStarted' })}
                    </LinkItem>
                  </RaisedButton>
                </div>
              </div>
            </div>

          </div>
        );
    }
}

RokuLink.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(RokuLink);
