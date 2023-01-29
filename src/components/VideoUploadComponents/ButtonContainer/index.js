import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import classes from './styles.scss';

export default function ButtonContainer({ showPrevious, showNext, previousBtnHandler, nextBtnHandler, nextBtnLabel }) {
    return (
      <div className={classes.buttonsDiv}>
        {
          (showPrevious) ?
            (
              <RaisedButton
                label={<FormattedMessage id="previous" />}
                primary
                className={classes.previousBtn}
                icon={<FontIcon className="material-icons">chevron_left</FontIcon>}
                onTouchTap={previousBtnHandler}
              />
            ) : null
        }

        {
          (showNext) ?
            (
              <RaisedButton
                label={<FormattedMessage id={nextBtnLabel} />}
                primary
                className={classes.nextBtn}
                icon={<FontIcon className="material-icons">chevron_right</FontIcon>}
                onTouchTap={nextBtnHandler}
                labelPosition="before"
              />
            ) : null
        }
      </div>
    );
}

ButtonContainer.propTypes = {
    showPrevious: PropTypes.bool,
    showNext: PropTypes.bool,
    nextBtnLabel: PropTypes.string,
    previousBtnHandler: PropTypes.func,
    nextBtnHandler: PropTypes.func,
};


ButtonContainer.defaultProps = {
    showPrevious: true,
    showNext: true,
    nextBtnLabel: 'next',
    previousBtnHandler: () => {},
    nextBtnHandler: () => {},
};
