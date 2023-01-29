import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { TextField, SelectField, MenuItem, FloatingActionButton, FontIcon, Toggle } from 'material-ui';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import trim from 'lodash/trim';
import ReactTooltip from 'react-tooltip';
import classes from './styles.scss';
import styles from './styles';

class ContentRow extends Component {

    componentDidMount() {
        ReactTooltip.rebuild();
    }

    render() {
        const {
          keyIndex,
          deleteRow,
          handleInputChange,
          languageChange,
          localInfo,
          isDisabled,
          radioInputChange,
          intl,
          languages,
        } = this.props;
        const nameErrorText = localInfo[keyIndex].checkValidations && (!trim(localInfo[keyIndex].name)) ?
          <FormattedMessage id="contentNameError" /> : '';
        const selectedLangErrorText = (localInfo[keyIndex].languageId.selectedError) ?
          <FormattedMessage id="selectedLangError" /> : '';
        const descpErrorText = localInfo[keyIndex].checkValidations && (!trim(localInfo[keyIndex].description)) ?
          <FormattedMessage id="contentDecriptionError" /> : '';
        const langErrorText = localInfo[keyIndex].checkValidations && (!localInfo[keyIndex].languageId.value) ?
          <FormattedMessage id="languageError" /> : '';
        const nameTextValue = <FormattedMessage id="contentName" />;
        const decpriptionTextValue = <FormattedMessage id="contentDecription" />;
        const languageTextValue = <FormattedMessage id="language" />;
        const deleteContentTip = intl.formatMessage({ id: 'deleteContentTip' });

        return (
          <div className={classnames('row', classes.contentContainer)}>

            <div className="col-xs-12 col-sm-3 col-md-2">
              <Toggle
                toggled={localInfo[keyIndex].defaultLocallanguageId}
                onToggle={() => radioInputChange(keyIndex)}
                label={<FormattedMessage id="default" />}
                thumbSwitchedStyle={styles.thumbSwitched}
                trackSwitchedStyle={styles.trackSwitched}
                style={styles.toggle}
                className={classes.toggleContainer}
                labelPosition="right"
              />
            </div>

            <div className="col-xs-12 col-sm-5 col-md-5">
              <TextField
                name="name"
                hintText={nameTextValue}
                floatingLabelText={nameTextValue}
                errorText={nameErrorText}
                value={localInfo[keyIndex].name}
                onChange={e => handleInputChange(keyIndex, e)}
                maxLength="200"
                fullWidth
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-5">
              <SelectField
                floatingLabelText={languageTextValue}
                hintText={languageTextValue}
                value={localInfo[keyIndex].languageId.value}
                onChange={(e, index, value) => languageChange(e, index, value, keyIndex)}
                errorText={langErrorText || selectedLangErrorText}
                fullWidth
              >
                {(languages && languages.map(item => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                    primaryText={item.name}
                  />
                )))}
              </SelectField>
            </div>

            <div className={classnames('col-xs-12', classes.paddingRight)}>
              <TextField
                name="description"
                hintText={decpriptionTextValue}
                floatingLabelText={decpriptionTextValue}
                value={localInfo[keyIndex].description}
                onChange={e => handleInputChange(keyIndex, e)}
                errorText={descpErrorText}
                maxLength="5000"
                multiLine
                fullWidth
              />
              <FloatingActionButton
                className={classes.deleteVideoContent}
                data-tip={deleteContentTip}
                data-class={classes.tooltipStyle}
                data-place="bottom"
                data-effect="solid"
                onTouchTap={() => deleteRow(keyIndex)}
                disabled={isDisabled}
                mini
              >
                <FontIcon className="material-icons">close</FontIcon>
              </FloatingActionButton>
            </div>
          </div>
        );
    }
}


ContentRow.defaultProps = {
    isDisabled: false,
    languages: [],
};

ContentRow.propTypes = {
    isDisabled: PropTypes.bool,
    languages: PropTypes.array,
    keyIndex: PropTypes.number.isRequired,
    deleteRow: PropTypes.func.isRequired,
    radioInputChange: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    languageChange: PropTypes.func.isRequired,
    localInfo: PropTypes.array.isRequired,
    intl: intlShape.isRequired,
};

export default injectIntl(ContentRow);
