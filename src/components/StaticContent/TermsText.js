import React from 'react';
import { intlShape } from 'react-intl';
import classes from './styles.scss';

export default function TermsText(props) {
    const { intl } = props;
    const overviewHeading = intl.formatMessage({ id: 'overviewHeading' });
    const overview = intl.formatMessage({ id: 'overview' });
    const point1Heading = intl.formatMessage({ id: 'point1Heading' });
    const point1 = intl.formatMessage({ id: 'point1' });
    const point1continued = intl.formatMessage({ id: 'point1continued' });
    const point2Heading = intl.formatMessage({ id: 'point2Heading' });
    const point2 = intl.formatMessage({ id: 'point2' });
    const point3Heading = intl.formatMessage({ id: 'point3Heading' });
    const point3 = intl.formatMessage({ id: 'point3' });
    const point4Heading = intl.formatMessage({ id: 'point4Heading' });
    const point4 = intl.formatMessage({ id: 'point4' });
    const point5Heading = intl.formatMessage({ id: 'point5Heading' });
    const point5 = intl.formatMessage({ id: 'point5' });
    const point6Heading = intl.formatMessage({ id: 'point6Heading' });
    const point6 = intl.formatMessage({ id: 'point6' });
    const point6A = intl.formatMessage({ id: 'point6A' });
    const point6B = intl.formatMessage({ id: 'point6B' });
    const point6C = intl.formatMessage({ id: 'point6C' });
    const point7Heading = intl.formatMessage({ id: 'point7Heading' });
    const point7Aa = intl.formatMessage({ id: 'point7Aa' });
    const point7Ali1 = intl.formatMessage({ id: 'point7Ali1' });
    const point7Ali2 = intl.formatMessage({ id: 'point7Ali2' });
    const point7Ali3 = intl.formatMessage({ id: 'point7Ali3' });
    const point7Ali4 = intl.formatMessage({ id: 'point7Ali4' });
    const point7Ali5 = intl.formatMessage({ id: 'point7Ali5' });
    const point7Ali6 = intl.formatMessage({ id: 'point7Ali6' });
    const point7Ali7 = intl.formatMessage({ id: 'point7Ali7' });
    const point7Ali8 = intl.formatMessage({ id: 'point7Ali8' });
    const point7Ali9 = intl.formatMessage({ id: 'point7Ali9' });
    const point7Ali10 = intl.formatMessage({ id: 'point7Ali10' });
    const point7Ali11 = intl.formatMessage({ id: 'point7Ali11' });
    const point7Ali12 = intl.formatMessage({ id: 'point7Ali12' });
    const point7Ali13 = intl.formatMessage({ id: 'point7Ali13' });
    const point7Ali14 = intl.formatMessage({ id: 'point7Ali14' });
    const point7Ali15 = intl.formatMessage({ id: 'point7Ali15' });
    const point7Ali16 = intl.formatMessage({ id: 'point7Ali16' });
    const point7Ali17 = intl.formatMessage({ id: 'point7Ali17' });
    const point7Cli1 = intl.formatMessage({ id: 'point7Cli1' });
    const point7Cli2 = intl.formatMessage({ id: 'point7Cli2' });
    const point7Cli3 = intl.formatMessage({ id: 'point7Cli3' });
    const point7B = intl.formatMessage({ id: 'point7B' });
    const point7C = intl.formatMessage({ id: 'point7C' });
    const point8Heading = intl.formatMessage({ id: 'point8Heading' });
    const point8A = intl.formatMessage({ id: 'point8A' });
    const point8AContinued = intl.formatMessage({ id: 'point8AContinued' });
    const point8B = intl.formatMessage({ id: 'point8B' });
    const point8BContinued = intl.formatMessage({ id: 'point8BContinued' });
    const point8Ca = intl.formatMessage({ id: 'point8Ca' });
    const point8Cb = intl.formatMessage({ id: 'point8Cb' });
    const point8Cc = intl.formatMessage({ id: 'point8Cc' });
    const point8CcContinued = intl.formatMessage({ id: 'point8CcContinued' });
    const point8Cd = intl.formatMessage({ id: 'point8Cd' });
    const point8Ce = intl.formatMessage({ id: 'point8Ce' });
    const point8CeContnued = intl.formatMessage({ id: 'point8CeContnued' });
    const point8Cf = intl.formatMessage({ id: 'point8Cf' });
    const point8CfContnued = intl.formatMessage({ id: 'point8CfContnued' });
    const point9Heading = intl.formatMessage({ id: 'point9Heading' });
    const point9A = intl.formatMessage({ id: 'point9A' });
    const point9B = intl.formatMessage({ id: 'point9B' });
    const point9C = intl.formatMessage({ id: 'point9C' });
    const point9D = intl.formatMessage({ id: 'point9D' });
    const point10Heading = intl.formatMessage({ id: 'point10Heading' });
    const point10 = intl.formatMessage({ id: 'point10' });
    const point11Heading = intl.formatMessage({ id: 'point11Heading' });
    const point11 = intl.formatMessage({ id: 'point11' });
    const point12Heading = intl.formatMessage({ id: 'point12Heading' });
    const point12 = intl.formatMessage({ id: 'point12' });
    const point12li1 = intl.formatMessage({ id: 'point12li1' });
    const point12li2 = intl.formatMessage({ id: 'point12li2' });
    const point12li3 = intl.formatMessage({ id: 'point12li3' });
    const point12li4 = intl.formatMessage({ id: 'point12li4' });
    const point12li5 = intl.formatMessage({ id: 'point12li5' });
    const point12li6 = intl.formatMessage({ id: 'point12li6' });
    const point13Heading = intl.formatMessage({ id: 'point13Heading' });
    const point13 = intl.formatMessage({ id: 'point13' });
    const point14Heading = intl.formatMessage({ id: 'point14Heading' });
    const point14 = intl.formatMessage({ id: 'point14' });
    const point15Heading = intl.formatMessage({ id: 'point15Heading' });
    const point15 = intl.formatMessage({ id: 'point15' });
    const point15Continued = intl.formatMessage({ id: 'point15Continued' });
    const point16Heading = intl.formatMessage({ id: 'point16Heading' });
    const point16 = intl.formatMessage({ id: 'point16' });

    return (
      <div className={classes.mainContent}>
        <h2>{overviewHeading}</h2>
        <span>{overview}</span>
        <h3>{point1Heading}</h3>
        <span>
          {point1}
          (<a href="policy" target="_blank" rel="noopener noreferrer">LINK</a>)
          {point1continued}
        </span>
        <h3>{point2Heading}</h3>
        <span>{point2} (<a href="policy" target="_blank" rel="noopener noreferrer">LINK</a>)</span>
        <h3>{point3Heading}</h3>
        <span>{point3}</span>
        <h3>{point4Heading}</h3>
        <span>{point4}</span>
        <h3>{point5Heading}</h3>
        <span>{point5}</span>
        <h3>{point6Heading}</h3>
        <span>{point6}</span>
        <div>{point6A}</div>
        <div>{point6B}</div>
        <div>{point6C}</div>
        <h3>{point7Heading}</h3>
        <div>{point7Aa}</div>
        <ul>
          <li>{point7Ali1}</li>
          <li>{point7Ali2}</li>
          <li>{point7Ali3}</li>
          <li>{point7Ali4}</li>
          <li>{point7Ali5}</li>
          <li>{point7Ali6}</li>
          <li>{point7Ali7}</li>
          <li>{point7Ali8}</li>
          <li>{point7Ali9}</li>
          <li>{point7Ali10}</li>
          <li>{point7Ali11}</li>
          <li>{point7Ali12}</li>
          <li>{point7Ali13}</li>
          <li>{point7Ali14}</li>
          <li>{point7Ali15}</li>
          <li>{point7Ali16}</li>
          <li>{point7Ali17}</li>
        </ul>
        <div>{point7B}</div>
        <div>{point7C}</div>
        <ul>
          <li>{point7Cli1}</li>
          <li>{point7Cli2}</li>
          <li>{point7Cli3}</li>
        </ul>
        <h3>{point8Heading}</h3>
        <div>
          {point8A}
          (<a href="/" target="_blank" rel="noopener noreferrer">Link</a>)
          {point8AContinued}
        </div>
        <div>
          {point8B}
          (<a href="/" target="_blank" rel="noopener noreferrer">Link</a>)
          {point8BContinued}
        </div>
        <div>{point8Ca}</div>
        <div>{point8Cb}</div>
        <div>
          {point8Cc}
          (<a href="/" target="_blank" rel="noopener noreferrer">Link</a>)
          {point8CcContinued}
        </div>
        <div>{point8Cd}</div>
        <div>
          {point8Ce}
          (<a href="/" target="_blank" rel="noopener noreferrer">Link</a>)
          {point8CeContnued}
        </div>
        <div>
          {point8Cf}
          (<a href="/" target="_blank" rel="noopener noreferrer">Link</a>)
          {point8CfContnued}
        </div>
        <h3>{point9Heading}</h3>
        <div>{point9A}</div>
        <div>{point9B}</div>
        <div>{point9C}</div>
        <div>{point9D}</div>
        <h3>{point10Heading}</h3>
        <div>{point10}</div>
        <h3>{point11Heading}</h3>
        <div>{point11}</div>
        <h3>{point12Heading}</h3>
        <div>{point12}</div>
        <ul>
          <li>{point12li1}</li>
          <li>{point12li2}</li>
          <li>{point12li3}</li>
          <li>{point12li4}</li>
          <li>{point12li5}</li>
          <li>{point12li6}</li>
        </ul>
        <h3>{point13Heading}</h3>
        <div>{point13}</div>
        <h3>{point14Heading}</h3>
        <div>{point14}</div>
        <h3>{point15Heading}</h3>
        <div>
          {point15}
          <a href="mailto:support@welcometv.net" target="_top">support@welcometv.net</a>.
          {point15Continued}
        </div>
        <h3>{point16Heading}</h3>
        <div>{point16}</div>
      </div>
    );
}

TermsText.propTypes = {
    intl: intlShape.isRequired,
};
