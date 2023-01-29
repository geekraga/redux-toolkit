import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, FontIcon, SelectField, MenuItem, Divider } from 'material-ui';
import trim from 'lodash/trim';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import c from 'classnames';
import classes from './styles.scss';
import styles from './styles';

class PropertyContent extends Component {
    componentDidUpdate() {
        ReactTooltip.rebuild();
    }

    componentWillUnmount() {
        ReactTooltip.hide();
    }

    render() {
        const {
            keyIndex,
            videoCategory,
            videoAssociationList,
            displayOrderCategory,
            handleVideosInputChange,
            deleteRow,
            previewContent,
            intl,
        } = this.props;
        const categoryName = <FormattedMessage id="categoryName" />;
        const displayOrder = <FormattedMessage id="displayOrder" />;
        const previewToolTip = intl.formatMessage({ id: 'previewButton' });
        const deleteContentTip = intl.formatMessage({ id: 'deleteContentTip' });
        const categoryError = videoAssociationList[keyIndex].validationCheck &&
        (!trim(videoAssociationList[keyIndex].categoryId)) ?
          <FormattedMessage id="categoryNameError" /> :
          videoAssociationList[keyIndex].validationCheck &&
          (trim(videoAssociationList[keyIndex].categoryId)) ?
            <FormattedMessage id="duplicateLinkVideoError" /> :
            '';
        const displayOrderError = videoAssociationList[keyIndex].orderValidationCheck &&
        (!trim(videoAssociationList[keyIndex].order)) ?
          <FormattedMessage id="displayOrderError" /> :
          videoAssociationList[keyIndex].orderValidationCheck &&
          (trim(videoAssociationList[keyIndex].order)) ?
            <FormattedMessage id="duplicateDisplayOrderError" /> :
            '';
        const categoryId = 'categoryId';
        const order = 'order';

        return (
          <div
            className={c({ [classes.hiddenVideoAssociated]: (!videoAssociationList[keyIndex].actionFlag) })}
          >
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-3">
                <div
                  className={classes.contentNameHeaders}
                  data-tip={videoAssociationList[keyIndex].contentName}
                  data-offset="{'bottom': -8}"
                  data-class={classes.tooltipStyle}
                  data-place="bottom"
                  data-effect="solid"
                >
                  {videoAssociationList[keyIndex].contentName}
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-4">
                <div className={classes.categoryContainer}>
                  <SelectField
                    floatingLabelText={categoryName}
                    onChange={(e, index, value) => handleVideosInputChange(e, index, value, keyIndex, categoryId)}
                    value={videoAssociationList[keyIndex].categoryId}
                    errorText={categoryError}
                    errorStyle={styles.selectErrorStyle}
                    underlineStyle={styles.underlineStyle}
                    style={styles.selectStyle}
                    hintStyle={styles.hintStyle}
                    fullWidth
                  >
                    { (videoCategory && videoCategory.filter(e => e.id).map(item => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        primaryText={item.name}
                      />
                    )))
                    }
                  </SelectField>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-3">
                <div className={classes.categoryContainer}>
                  <SelectField
                    floatingLabelText={displayOrder}
                    value={videoAssociationList[keyIndex].order}
                    onChange={(e, index, value) => handleVideosInputChange(e, index, value, keyIndex, order)}
                    errorText={displayOrderError}
                    errorStyle={styles.selectErrorStyle}
                    underlineStyle={styles.underlineStyle}
                    style={styles.selectStyle}
                    hintStyle={styles.hintStyle}
                    fullWidth
                  >
                    { (displayOrderCategory.map(item => (
                      <MenuItem
                        key={item}
                        value={item}
                        primaryText={item}
                      />
                    )))
                    }
                  </SelectField>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-2">
                <div className={classes.closeContainer}>
                  <FloatingActionButton
                    onTouchTap={() => deleteRow(keyIndex)}
                    iconStyle={styles.deleteIconStyle}
                    data-tip={deleteContentTip}
                    data-class={classes.tooltipStyle}
                    data-place="bottom"
                    data-effect="solid"
                    mini
                  >
                    <FontIcon className="material-icons">close</FontIcon>
                  </FloatingActionButton>
                  <FontIcon
                    className="material-icons"
                    style={styles.playButton}
                    onClick={() => previewContent(videoAssociationList[keyIndex].contentId)}
                    data-tip={previewToolTip}
                    data-class={classes.tooltipStyle}
                    data-place="bottom"
                    data-effect="solid"
                  >
                    play_circle_outline
                  </FontIcon>
                </div>
              </div>
            </div>
            <Divider style={styles.dividerStyle} />
          </div>
        );
    }
}

PropertyContent.propTypes = {
    keyIndex: PropTypes.number.isRequired,
    videoCategory: PropTypes.array.isRequired,
    videoAssociationList: PropTypes.array.isRequired,
    displayOrderCategory: PropTypes.array.isRequired,
    handleVideosInputChange: PropTypes.func.isRequired,
    deleteRow: PropTypes.func.isRequired,
    previewContent: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
};

export default injectIntl(PropertyContent);
