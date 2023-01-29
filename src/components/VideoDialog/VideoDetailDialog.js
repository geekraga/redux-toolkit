import React, { PropTypes } from 'react';
import c from 'classnames';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Chip from 'material-ui/Chip';
import { blue400 } from 'material-ui/styles/colors';
import classes from './styles.scss';
import styles from './styles';

function VideoDetailDialog(props) {
    const { intl } = props;
    const { tabularData, keywords, metatags, localizedInfo, associatedUrls } = props.videoInfo;
    return (
      <div>
        {
          associatedUrls.previewUrl ?
            (
              <div className={classes.videoContainer}>
                <video controls>
                  <source src={associatedUrls.previewUrl} type="video/mp4" />
                  <FormattedMessage id="noVideoSupport" />
                </video>
              </div>
            ) :
            (
              <div className={classes.noVideoContent}>
                <img src={require('../../public/no_content_available.png')} alt="noImage" />
              </div>
            )
        }
        <div className="row">
          {
              tabularData && tabularData.length ?
              (
                <div className="col-xs-12">
                  <span className={classes.itemKeyword}><FormattedMessage id="contentDetails" /></span>
                  <table className={classes.contentTable}>
                    <tbody>
                      {tabularData.map(item => (
                        <tr key={`data${item.itemKey}`} >
                          <td className={classes.leftRow}>
                            {intl.formatMessage({ id: `videoDetail.${item.itemKey}` })}
                          </td>
                          <td data-th={item.itemKey} className={classes.rightRow}>
                            {item.itemValue}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
              : null
          }
          {
              keywords && keywords.length ?
              (
                <div className={c('row col-xs-12', classes.keywordContainer)}>
                  <div className={c('col-xs-12 col-sm-2', classes.itemKeyword)}>
                    <FormattedMessage id="keywords" />
                  </div>
                  <div className="col-xs-12 col-sm-10">
                    {keywords.map(chips => (
                      <Chip
                        key={chips}
                        style={styles.chipStyle}
                        backgroundColor={blue400}
                        className={classes.chipClass}
                      >
                        {chips}
                      </Chip>
                    ))}
                  </div>
                </div>
              ) : null
          }
          {
            metatags && metatags.length ?
              (
                <div className={c('row col-xs-12', classes.keywordContainer)}>
                  <div className={c('col-xs-12', classes.itemKeyword)}>
                    <FormattedMessage id="metatags" />
                  </div>

                  <div className={classes.padLR}>
                    <div className={c('col-xs-12', classes.tableHeader)}>
                      <div className="row">
                        <div className={c('col-xs-6', classes.tableHeaderRow)}>
                          <FormattedMessage id="tagnameText" />
                        </div>
                        <div className={c('col-xs-6', classes.tableHeaderRow)}>
                          <FormattedMessage id="tagValue" />
                        </div>
                      </div>
                    </div>
                    <div className={c('col-xs-12', classes.dataTabel)}>
                      {metatags.map((item, index) => (
                        <div key={index} className={c('row', classes.dataRowContainer)}>
                          <div className={c('col-xs-6', classes.dataRowHeader)}>
                            <div className={classes.mobileHeaders}><FormattedMessage id="tagnameText" /></div>
                            <span className={classes.dataMain}>
                              {item.tagname}
                            </span>
                          </div>
                          <div className={c('col-xs-6', classes.dataRowHeader)}>
                            <div className={classes.mobileHeaders}><FormattedMessage id="tagValue" /></div>
                            <span className={classes.dataMain}>
                              {item.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null
          }

          {
            localizedInfo && localizedInfo.length ?
              (
                <div className={c('row col-xs-12', classes.keywordContainer)}>
                  <div className={c('col-xs-12', classes.itemKeyword)}>
                    <FormattedMessage id="localizedInfo" />
                  </div>
                  <div className={classes.padLR}>
                    <div className={c('col-xs-12', classes.tableHeader)}>
                      <div className="row">
                        <div className={c('col-xs-4', classes.tableHeaderRow)}>
                          <FormattedMessage id="contentName" />
                        </div>
                        <div className={c('col-xs-4', classes.tableHeaderRow)}>
                          <FormattedMessage id="language" />
                        </div>
                        <div className={c('col-xs-4', classes.tableHeaderRow)}>
                          <FormattedMessage id="contentDecription" />
                        </div>
                      </div>
                    </div>
                    <div className={c('col-xs-12', classes.dataTabel)}>
                      {localizedInfo.map((item, index) => (
                        <div key={index} className={c('row', classes.dataRowContainer)}>
                          <div className={c('col-xs-4', classes.dataRowHeader)}>
                            <div className={classes.mobileHeaders}><FormattedMessage id="contentName" /></div>
                            <span className={classes.dataMain}>
                              {item.name}
                            </span>
                          </div>
                          <div className={c('col-xs-4', classes.dataRowHeader)}>
                            <div className={classes.mobileHeaders}><FormattedMessage id="language" /></div>
                            <span className={classes.dataMain}>
                              {item.languageName}
                            </span>
                          </div>
                          <div className={c('col-xs-4', classes.dataRowHeader)}>
                            <div className={classes.mobileHeaders}><FormattedMessage id="contentDecription" /></div>
                            <span className={classes.dataMain}>
                              {item.description}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null
          }
        </div>
      </div>
    );
}

VideoDetailDialog.propTypes = {
    videoInfo: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
};

export default injectIntl(VideoDetailDialog);

