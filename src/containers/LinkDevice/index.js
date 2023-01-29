import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import c from 'classnames';
import { pick, trim } from 'lodash';
import { FontIcon, TextField, AutoComplete, RaisedButton } from 'material-ui';
import ReactGA from 'react-ga';
import PageBase from '../../components/PageBase';
import LoadingIndicator from '../../components/LoadingIndicator';
import LinkItem from '../../components/LinkItem';
import { updateCurrentPage } from '../../actions/runTimeSettings';
import { PAGES, AUTO_COMPLETE_PROPERTY_SEARCH_SOURCE_CONFIG } from '../../constants';
import { sortPropertyList, propertySearch, pairDevice } from '../../actions/async/propertyManagement';
import { emptyPropertyList } from '../../actions/propertyInformation';
import classes from './styles.scss';
import styles from './styles';

class LinkDevice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoader: true,
            searchText: '',
            propertyId: null,
            propertyName: '',
            pairingCode: '',
            messageToShow: '',
            errorClass: false,
        };

        this.getPropertyTimer = 0;
        this.cancelPropertyRequest = null;
        this.handleInput = this.handleInput.bind(this);
        this.handleNewRequest = this.handleNewRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.pairDevice = this.pairDevice.bind(this);
        this.removeDeviceToPair = this.removeDeviceToPair.bind(this);
    }

    componentDidMount() {
        this.props.updateCurrentComponent(PAGES.LINKDEVICE);
        window.scrollTo(0, 0);
        this.props.getProperties({ pageNo: 1, asc: false, sortBy: '', isActive: '', search: '' }).then(() => {
            this.setState({ showLoader: false });
        }).catch(() => this.setState({ showLoader: false }));
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
    }

    componentDidUpdate() {
        ReactTooltip.rebuild();
    }

    componentWillUnmount() {
        clearTimeout(this.getPropertyTimer);
        if (this.cancelPropertyRequest) {
            this.cancelPropertyRequest.cancel('Cancel Property Request');
        }
        this.props.clearProperty();
    }

    handleInput(searchText) {
        this.setState({ searchText });
        if (trim(searchText)) {
            clearTimeout(this.getPropertyTimer);
            this.getPropertyTimer = setTimeout(() => {
                if (this.cancelPropertyRequest) {
                    this.cancelPropertyRequest.cancel('Cancel Property Request');
                    this.cancelPropertyRequest = null;
                }
                this.cancelPropertyRequest = this.props.getProperty(searchText);
            }, 200);
        } else {
            if (this.cancelPropertyRequest) {
                this.cancelPropertyRequest.cancel('Cancel Property Request');
                this.cancelPropertyRequest = null;
            }
            this.props.clearProperty();
        }
    }

    handleNewRequest(chosenRequest) {
        let { propertyName, propertyId } = this.state;
        if (typeof chosenRequest === 'object' && propertyId !== chosenRequest.id) {
            propertyName = chosenRequest.name;
            propertyId = chosenRequest.id;
            this.setState({ propertyId, propertyName, pairingCode: '', searchText: '' });
        }
        this.setState({ searchText: '' });
        this.props.clearProperty();
    }

    handleInputChange(e) {
        this.setState({ errorClass: false, pairingCode: e.target.value, messageToShow: '' });
    }

    pairDevice() {
        const deviceParams = pick(this.state, [
            'propertyId',
            'pairingCode',
        ]);
        this.setState({ showLoader: true });
        this.props.requestToPairDevice(deviceParams).then(
            response => {
                this.setState({ showLoader: false });
                if (response.status === 200) {
                    this.setState({ messageToShow: response.data.message, errorClass: false, propertyId: null, propertyName: '', pairingCode: '' });
                } else if (response.error.response) {
                    this.setState({ messageToShow: response.error.response.data.message, errorClass: true });
                } else {
                    this.setState({ messageToShow: 'apiError', errorClass: true });
                }
            },
        );
    }

    removeDeviceToPair() {
        this.setState({ propertyId: null, propertyName: '', pairingCode: '' });
        ReactTooltip.hide();
    }

    render() {
        const { showLoader, searchText, propertyId, propertyName, pairingCode, messageToShow, errorClass } = this.state;
        const { totalProperties, searchedProperties, intl } = this.props;
        const loadingIndicator = showLoader ? <LoadingIndicator /> : null;
        const addDeviceText = <FormattedMessage id="deviceFloatingLabel" />;
        const deviceFloatingLabel = <FormattedMessage id="deviceAutoComplete" />;
        const pairCodeText = <FormattedMessage id="pairCodeText" />;
        const pairDeviceButton = <FormattedMessage id="pairDeviceButton" />;
        const cancelTip = intl.formatMessage({ id: 'cancel' });
        const deviceName = intl.formatMessage({ id: 'propertyName' });
        const reponseClass = errorClass ? classes.failure : classes.success;

        return (
          <div className={classes.mainContainer}>
            <PageBase
              title={<FormattedMessage id="pairDeviceToolTip" />}
              navigation={<FormattedMessage id="breadCrumbs.pairDevice" />}
              minHeight={300}
            >
              {loadingIndicator}
              {
                messageToShow ?
                  (
                    <div className={c(classes.messageToShowResponse, reponseClass)}>
                      <FormattedMessage id={messageToShow} defaultMessage={messageToShow} />
                    </div>
                  ) : null
              }
              {totalProperties ? (
                <div>
                  <div className={classes.pairDeviceContent}>
                    <FormattedMessage id="pairDeviceContent" />
                  </div>
                  <AutoComplete
                    hintText={addDeviceText}
                    floatingLabelText={deviceFloatingLabel}
                    searchText={searchText}
                    onUpdateInput={this.handleInput}
                    onNewRequest={this.handleNewRequest}
                    dataSource={searchedProperties}
                    dataSourceConfig={AUTO_COMPLETE_PROPERTY_SEARCH_SOURCE_CONFIG}
                    listStyle={styles.autoCompleteList}
                    filter={AutoComplete.caseInsensitiveFilter}
                    fullWidth
                    openOnFocus
                  />
                </div>
              ) : showLoader ? null : (
                <div className={classes.noContentAvailable}>
                  <FormattedMessage id="noPropertyMessage" />
                  <LinkItem to={'/'} linkClass={classes.addVideo}>
                    <FormattedMessage id="noPropertyMessageLink" />
                  </LinkItem>
                  <FormattedMessage id="noPropertyMessageEnd" />
                </div>
              )}
              { propertyId ? (
                <div className="row">
                  <div className="col-xs-12">
                    <div className={classes.itemKeyword}><FormattedMessage id="propertyDetails" /></div>
                    <table className={classes.contentTable}>
                      <tbody>
                        <tr>
                          <td className={classes.leftRow} data-th={deviceName}>
                            {propertyName}
                          </td>
                          <td className={classes.rightRow}>
                            <TextField
                              hintText={pairCodeText}
                              floatingLabelText={pairCodeText}
                              value={pairingCode}
                              maxLength="8"
                              onChange={e => this.handleInputChange(e)}
                              style={styles.pairCodeInput}
                              className={classes.pairTextBox}
                            />
                            <RaisedButton
                              label={pairDeviceButton}
                              onTouchTap={this.pairDevice}
                              icon={<FontIcon className="material-icons">done</FontIcon>}
                              disabled={!pairingCode}
                              className={classes.pairButton}
                              primary
                            />
                            <FontIcon
                              className="material-icons"
                              style={styles.cancelButton}
                              onTouchTap={this.removeDeviceToPair}
                              data-tip={cancelTip}
                              data-class={classes.tooltipStyle}
                              data-place="bottom"
                              data-effect="solid"
                            >
                              cancel
                            </FontIcon>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null }
              {
                totalProperties ? (
                  <div className={classes.pairDeviceSuggestion}>
                    <span className={classes.mainHeader}>
                      <FormattedMessage id="pairDeviceContent2" />
                    </span>
                    <span className={classes.leftBreakSpace}>
                      <FormattedMessage id="pairDeviceContent3" />
                    </span>
                    <LinkItem to={'/'} linkClass={classes.addVideo}>
                      <FormattedMessage id="pairDeviceContent4" />
                    </LinkItem>
                    <FormattedMessage id="pairDeviceContent5" />
                    <i className={c('material-icons', classes.iconClass)}>live_tv</i>
                  </div>) : null }
            </PageBase>
          </div>
        );
    }
}

LinkDevice.defaultProps = {
    totalProperties: 0,
};

LinkDevice.propTypes = {
    intl: intlShape.isRequired,
    totalProperties: PropTypes.number,
    updateCurrentComponent: PropTypes.func.isRequired,
    getProperties: PropTypes.func.isRequired,
    getProperty: PropTypes.func.isRequired,
    clearProperty: PropTypes.func.isRequired,
    requestToPairDevice: PropTypes.func.isRequired,
    searchedProperties: PropTypes.array.isRequired,
};

const mapStateToProps = reduxState => ({
    totalProperties: reduxState.propertyInformation.totalProperties,
    searchedProperties: reduxState.propertyInformation.propertySearchedList,
});

const mapDispatchToProps = dispatch => ({
    updateCurrentComponent(data) {
        return dispatch(updateCurrentPage(data));
    },
    getProperties(data) {
        return dispatch(sortPropertyList(data));
    },
    getProperty(data) {
        return dispatch(propertySearch(data));
    },
    clearProperty() {
        dispatch(emptyPropertyList());
    },
    requestToPairDevice(data) {
        return dispatch(pairDevice(data));
    },
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(LinkDevice));
