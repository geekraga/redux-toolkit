import React, { PropTypes, Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import DatePicker from 'material-ui/DatePicker';
import { FormattedMessage } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import classes from './styles.scss';
import styles from '../TagUploadComponent/styles';

class DatePickerComponent extends Component {
    constructor() {
        super();
        this.clearDate = this.clearDate.bind(this);
    }

    componentDidUpdate() {
        ReactTooltip.rebuild();
    }

    clearDate() {
        this.DatePicker.setState({ date: undefined });
        ReactTooltip.hide();
        this.props.onDateChangeHandler();
    }

    render() {
        const { hintText, defaultDate, onDateChangeHandler, showResetButton, clearDateText } = this.props;
        return (
          defaultDate ?
            (
              <div className={classes.datePickerMain}>
                <DatePicker
                  ref={ref => this.DatePicker = ref}
                  hintText={<FormattedMessage id={hintText} />}
                  floatingLabelText={<FormattedMessage id={hintText} />}
                  mode="portrait"
                  defaultDate={new Date(defaultDate)}
                  onChange={onDateChangeHandler}
                  className={classes.datePickerWrapContent}
                  autoOk
                />
                {
                  showResetButton ?
                    (
                      <FontIcon
                        className="material-icons"
                        onClick={this.clearDate}
                        style={styles.clearDateButton}
                        data-tip={clearDateText}
                        data-class={classes.tooltipStyle}
                        data-place="bottom"
                        data-effect="solid"
                      >
                        cancel
                      </FontIcon>
                    ) : null
                }
              </div>
            ) :
            (
              <div className={classes.datePickerMain}>
                <DatePicker
                  ref={ref => this.DatePicker = ref}
                  hintText={<FormattedMessage id={hintText} />}
                  floatingLabelText={<FormattedMessage id={hintText} />}
                  mode="portrait"
                  onChange={onDateChangeHandler}
                  style={styles.datePicker}
                  className={classes.datePickerWrapContent}
                  autoOk
                />
                {
                  showResetButton ?
                    (
                      <FontIcon
                        className="material-icons"
                        onClick={this.clearDate}
                        style={styles.clearDateButton}
                        data-tip={clearDateText}
                        data-class={classes.tooltipStyle}
                        data-place="bottom"
                        data-effect="solid"
                      >
                        cancel
                      </FontIcon>
                    ) : null
                }
              </div>
            )
        );
    }
}

DatePickerComponent.propTypes = {
    hintText: PropTypes.string.isRequired,
    defaultDate: PropTypes.string.isRequired,
    showResetButton: PropTypes.string.isRequired,
    clearDateText: PropTypes.string.isRequired,
    onDateChangeHandler: PropTypes.func.isRequired,
};

export default DatePickerComponent;
