import React, { PropTypes, Component } from 'react';
import { TextField, FloatingActionButton, FontIcon, Divider } from 'material-ui';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import trim from 'lodash/trim';
import ReactTooltip from 'react-tooltip';
import classes from './styles.scss';
import styles from './styles';

class MetaTagContent extends Component {
    componentDidMount() {
        ReactTooltip.rebuild();
    }
    render() {
        const { localMetaTagInfo, deleteMetaTagContent, keyIndex, handleInputChange, intl } = this.props;
        const tagValueText = <FormattedMessage id="tagValue" />;
        const tagNameErrorText = localMetaTagInfo[keyIndex].checkValidations && (!trim(localMetaTagInfo[keyIndex].value)) ?
          <FormattedMessage id="tagValueError" /> : '';
        return (
          <div>
            <div className="row">
              <div className="col-xs-12 col-sm-4 col-md-5">
                <div
                  className={classes.tagNameHeaders}
                  data-tip={localMetaTagInfo[keyIndex].tagname}
                  data-class={classes.tooltipStyle}
                  data-offset="{'bottom': -10}"
                  data-place="bottom"
                  data-effect="solid"
                >
                  {localMetaTagInfo[keyIndex].tagname}
                </div>
              </div>
              <div className="col-xs-12 col-sm-5  col-md-5">
                <div className={classes.autoCompleteContainer}>
                  <TextField
                    hintText={tagValueText}
                    value={localMetaTagInfo[keyIndex].value}
                    onChange={e => handleInputChange(keyIndex, e)}
                    underlineShow={false}
                    errorText={tagNameErrorText}
                    errorStyle={styles.metaTagInputStyle}
                    maxLength="100"
                    fullWidth
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-3 col-md-2">
                <div className={classes.closeContainer}>
                  <FloatingActionButton
                    onTouchTap={() => deleteMetaTagContent(keyIndex)}
                    iconStyle={styles.deleteIconStyle}
                    data-tip={intl.formatMessage({ id: 'removeTag' })}
                    data-class={classes.tooltipStyle}
                    data-place="bottom"
                    data-effect="solid"
                    mini
                  >
                    <FontIcon className="material-icons">close</FontIcon>
                  </FloatingActionButton>
                </div>
              </div>
            </div>
            <Divider style={styles.dividerStyle} />
          </div>
        );
    }
}

MetaTagContent.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    keyIndex: PropTypes.number.isRequired,
    deleteMetaTagContent: PropTypes.func.isRequired,
    localMetaTagInfo: PropTypes.array.isRequired,
    intl: intlShape.isRequired,
};

export default injectIntl(MetaTagContent);
