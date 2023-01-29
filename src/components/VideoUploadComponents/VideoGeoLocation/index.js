import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { TextField, SelectField, MenuItem, AutoComplete } from 'material-ui';
import c from 'classnames';
import { pick, trim } from 'lodash';
import ReactTooltip from 'react-tooltip';
import LoadingIndicator from '../../../components/LoadingIndicator';
import ButtonContainer from '../ButtonContainer';
import DatePickerComponent from './DatePickerComponent';
import { fetchStateList, fetchCityList, getCityName, fetchRegionList } from '../../../actions/async/location';
import { emptyCityList } from '../../../actions/locationList';
import { updateLocalContent } from '../../../actions/runTimeSettings';
import { USER_TYPE, AUTO_COMPLETE_CITY_SOURCE_CONFIG } from '../../../constants';
import { getGeoLocation } from '../../../util/browserStorage';
import classes from './styles.scss';
import styles from '../TagUploadComponent/styles';

class VideoGeoLocation extends Component {
    constructor(props) {
        super(props);
        const {
            source,
            neighborhood,
            postalcode,
            latitude,
            longitude,
            license,
            credits,
            rights,
            countryId,
            stateId,
            cityId,
            regionId,
            startDate,
            expiryDate,
            address,
            copyright,
            contentTypeId,
        } = this.props.geoData;
        this.state = {
            showLoader: false,
            loadNextPage: true,
            source,
            neighborhood,
            postalcode,
            latitude: latitude || '',
            longitude: longitude || '',
            license,
            address: address || '',
            credits,
            rights,
            countryId: countryId || '',
            stateId: stateId || '',
            regionId: regionId || '',
            countryName: '',
            stateName: '',
            regionName: '',
            cityId,
            copyright,
            startDate,
            expiryDate,
            contentStartDate: startDate,
            contentEndDate: expiryDate,
            contentTypeId,
            contentGroupId: 1,
            cityErrorLabel: '',
            stateErrorLabel: '',
            countryErrorLabel: '',
            streetErrorLabel: '',
            expiryDateErrorLabel: false,
            citySearchText: '',
            addressMinLengthError: false,
        };
        this.errorMessages = {
            cityError: <FormattedMessage id="cityError" />,
            stateError: <FormattedMessage id="stateError" />,
            countryError: <FormattedMessage id="countryError" />,
            streetError: <FormattedMessage id="streetError" />,
        };
        this.getCityTimer = 0;
        this.searchLatLngTimer = 0;
        this.cancelCityRequest = null;
        this.cancelSearchRequest = null;
        this.setStartDate = this.setStartDate.bind(this);
        this.setLastDate = this.setLastDate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleRegionChange = this.handleRegionChange.bind(this);
        this.contentTypeChange = this.contentTypeChange.bind(this);
        this.validateDatesSelected = this.validateDatesSelected.bind(this);
        this.handleCityInput = this.handleCityInput.bind(this);
        this.handleNewRequest = this.handleNewRequest.bind(this);
        this.validateData = this.validateData.bind(this);
        this.updateLatLong = this.updateLatLong.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.checkAddressLength = this.checkAddressLength.bind(this);
        this.clearRegion = this.clearRegion.bind(this);
    }

    componentDidMount() {
        const { countryId, stateId, regionId, cityId } = this.state;
        const { countries, states, regions, getCity } = this.props;
        if (stateId) {
            const countryName = countries.find(item => item.id === countryId);
            const stateName = states.find(item => item.id === stateId);
            this.setState({ countryName: countryName.name, stateName: stateName.name });
        }

        if (regionId) {
            const regionName = regions.find(item => item.id === regionId);
            if (regionName) {
                this.setState({ regionName: regionName.name });
            }
        }

        if (cityId) {
            getCity(cityId).then(citySearchText => {
                this.setState({ citySearchText }, () => {
                    this.updateLatLong();
                });
            });
        }
        window.scrollTo(0, 0);
    }

    setStartDate(e, contentStartDate = '') {
        const startDate = contentStartDate ? moment(new Date(contentStartDate)).format('YYYY-MM-DD') : '';
        this.setState({ startDate }, () => {
            this.validateDatesSelected();
        });
    }

    setLastDate(e, contentEndDate = '') {
        const expiryDate = contentEndDate ? moment(new Date(contentEndDate)).format('YYYY-MM-DD') : '';
        this.setState({ expiryDate }, () => {
            this.validateDatesSelected();
        });
    }

    clearRegion() {
        const { regionId, citySearchText } = this.state;
        if (regionId) {
            ReactTooltip.hide();
            this.setState({ regionId: '', regionName: '' }, () => {
                if (citySearchText) {
                    this.updateLatLong();
                }
            });
        }
    }

    updateLatLong() {
        const { citySearchText, regionName, stateName, countryName, address } = this.state;
        if (trim(address) && address.length < 5) {
            return false;
        }
        const updatedAddress = regionName ?
            `${address}, ${citySearchText}, ${regionName}, ${stateName}, ${countryName}` :
            `${address}, ${citySearchText}, ${stateName}, ${countryName}`;
        clearTimeout(this.searchLatLngTimer);
        this.setState({ loadNextPage: false }, () => {
            this.searchLatLngTimer = setTimeout(() => {
                if (this.cancelSearchRequest) {
                    this.cancelSearchRequest.cancel('Cancel Search Request');
                    this.cancelSearchRequest = null;
                }
                this.cancelSearchRequest = getGeoLocation(updatedAddress).then(res => {
                    this.setState({
                        latitude: res.lat,
                        longitude: res.lng,
                        streetErrorLabel: '',
                        loadNextPage: true,
                        addressMinLengthError: false,
                    });
                }).catch(() => {
                    this.setState({
                        latitude: '',
                        longitude: '',
                        streetErrorLabel: this.errorMessages.streetError,
                        loadNextPage: false,
                        addressMinLengthError: false,
                    });
                });
            }, 200);
        });
        return true;
    }

    handleAddressChange(e) {
        this.setState({ address: e.target.value }, () => {
            this.updateLatLong();
        });
    }

    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCountryChange(e, index, selectedCountryId) {
        const { countryId } = this.state;
        const { countries } = this.props;
        this.setState({ countryErrorLabel: '' });
        const countryName = countries.find(item => (item.id === selectedCountryId));
        if (countryId !== selectedCountryId) {
            this.setState({
                countryId: selectedCountryId,
                countryName: countryName.name,
                stateName: '',
                stateId: '',
                regionId: '',
                cityId: '',
                citySearchText: '',
                showLoader: true,
            });
            this.props.removeCity();
            this.props.getStateList(selectedCountryId).then(() => {
                this.setState({ showLoader: false });
            });
        }
    }

    handleStateChange(e, index, selectedStateId) {
        const { stateId } = this.state;
        const { states } = this.props;
        this.setState({ stateErrorLabel: '' });
        const stateName = states.find(item => (item.id === selectedStateId));
        if (stateId !== selectedStateId) {
            this.props.removeCity();
            this.setState({
                stateId: selectedStateId,
                stateName: stateName.name,
                regionName: '',
                cityId: '',
                regionId: '',
                citySearchText: '',
                showLoader: true,
            });
            this.props.getRegionList(selectedStateId).then(() => {
                this.setState({ showLoader: false });
            });
        }
    }

    handleRegionChange(e, index, selectedRegionId) {
        const { regionId } = this.state;
        const { regions } = this.props;
        const regionName = regions.find(item => (item.id === selectedRegionId));
        if (regionId !== selectedRegionId) {
            this.props.removeCity();
            this.setState({ cityId: '', regionId: selectedRegionId, regionName: regionName.name, citySearchText: '' });
        }
    }

    handleCityInput(citySearchText) {
        const { stateId, regionId } = this.state;
        this.setState({ citySearchText, cityErrorLabel: '', cityId: '' });
        if (trim(citySearchText) && stateId) {
            clearTimeout(this.getCityTimer);
            this.getCityTimer = setTimeout(() => {
                if (this.cancelCityRequest) {
                    this.cancelCityRequest.cancel('Cancel City Request');
                    this.cancelCityRequest = null;
                }
                this.cancelCityRequest = this.props.getCityList({ stateId, regionId, citySearchText });
            }, 200);
        } else {
            if (this.cancelCityRequest) {
                this.cancelCityRequest.cancel('Cancel City Request');
                this.cancelCityRequest = null;
            }
            this.props.removeCity();
        }
    }

    handleNewRequest(chosenRequest) {
        const { cities } = this.props;
        let citySearchText = '';
        let cityId = 0;
        if (typeof chosenRequest === 'object' && cities.length) {
            citySearchText = chosenRequest.name;
            cityId = chosenRequest.id;
        }
        this.setState({ citySearchText, cityId, cityErrorLabel: '', address: '' }, () => {
            this.updateLatLong();
        });
    }

    contentTypeChange(e, index, contentTypeId) {
        this.setState({ contentTypeId });
    }

    validateDatesSelected() {
        if (this.props.userRole === USER_TYPE.GUEST) {
            this.setState({ expiryDateErrorLabel: false });
            return true;
        }
        const { startDate, expiryDate } = this.state;
        if (expiryDate) {
            if (startDate) {
                if (moment(expiryDate).isAfter(startDate) && moment(expiryDate).isAfter(moment.now())) {
                    this.setState({ expiryDateErrorLabel: false });
                    return true;
                }
            } else {
                if (moment(expiryDate).isAfter(moment.now())) {
                    this.setState({ expiryDateErrorLabel: false });
                    return true;
                }
            }
            this.setState({ expiryDateErrorLabel: true });
            return false;
        }
        this.setState({ expiryDateErrorLabel: false });
        return true;
    }

    checkAddressLength() {
        const { address } = this.state;
        if (address && (trim(address).length < 5)) {
            this.setState({ addressMinLengthError: true });
            return false;
        }
        this.setState({ addressMinLengthError: false });
        return true;
    }

    validateData() {
        const { countryId, stateId, cityId, regionId, streetErrorLabel, citySearchText, loadNextPage } = this.state;
        if (
            countryId &&
            stateId &&
            cityId &&
            !streetErrorLabel &&
            loadNextPage &&
            this.validateDatesSelected() &&
            this.checkAddressLength()
        ) {
            const updatedData = pick(this.state, [
                'source',
                'neighborhood',
                'postalcode',
                'latitude',
                'longitude',
                'countryId',
                'stateId',
                'cityId',
                'startDate',
                'expiryDate',
                'license',
                'credits',
                'rights',
                'address',
                'contentGroupId',
                'copyright',
                'contentTypeId',
            ]);
            updatedData.regionId = regionId || null;
            this.props.updateContent(updatedData);
            this.props.loadNext();
        } else {
            window.scrollTo(0, 0);
            if (!cityId || !trim(citySearchText)) {
                this.setState({ cityErrorLabel: this.errorMessages.cityError });
            }
            if (!stateId) {
                this.setState({ stateErrorLabel: this.errorMessages.stateError });
            }
            if (!countryId) {
                this.setState({ countryErrorLabel: this.errorMessages.countryError });
            }
            this.validateDatesSelected();
        }
    }
    render() {
        const {
            source,
            neighborhood,
            postalcode,
            latitude,
            longitude,
            license,
            credits,
            rights,
            copyright,
            countryId,
            stateId,
            regionId,
            address,
            cityId,
            citySearchText,
            contentTypeId,
            contentStartDate,
            contentEndDate,
            showLoader,
            cityErrorLabel,
            stateErrorLabel,
            countryErrorLabel,
            streetErrorLabel,
            expiryDateErrorLabel,
            addressMinLengthError,
            startDate,
            expiryDate,
        } = this.state;
        const { countries, states, regions, cities, loadPrevious, userRole, videoContentGroup, intl } = this.props;
        const loadingIndicator = (showLoader || (cityId && !citySearchText)) ? <LoadingIndicator /> : null;
        const sourceTextValue = <FormattedMessage id="source" />;
        const neighborhoodTextValue = <FormattedMessage id="neighborhood" />;
        const postalcodeTextValue = <FormattedMessage id="postalcode" />;
        const countryTextValue = <FormattedMessage id="country" />;
        const stateTextValue = <FormattedMessage id="state" />;
        const regionTextValue = <FormattedMessage id="region" />;
        const cityTextValue = <FormattedMessage id="city" />;
        const cityHintValue = <FormattedMessage id="cityHint" />;
        const streetTextValue = <FormattedMessage id="street" />;
        const streetSearchHintText = <FormattedMessage id="streetSearch" />;
        const licenseTextValue = <FormattedMessage id="license" />;
        const creditsTextValue = <FormattedMessage id="credits" />;
        const rightsTextValue = <FormattedMessage id="rights" />;
        const copyrightTextValue = <FormattedMessage id="copyright" />;
        const videoContentTextValue = <FormattedMessage id="videoContent" />;
        const addressMinLengthErrorLabel = addressMinLengthError ? <FormattedMessage id="streetError" /> : null;
        const clearRegionText = intl.formatMessage({ id: 'clearRegion' });
        const clearDateText = intl.formatMessage({ id: 'clearDate' });
        const latitudeTextValue = intl.formatMessage({ id: 'latitude' });
        const longitudeTextValue = intl.formatMessage({ id: 'longitude' });
        const adminAddressClass = (userRole === USER_TYPE.ADMIN || userRole === USER_TYPE.OPERATOR) ? 'col-xs-12 col-sm-6 col-md-3' : 'col-xs-12 col-sm-4';
        const autocompleteClass = c(classes.autoCompleteWrapper, { [classes.autoCompleteDisabled]: !stateId }, adminAddressClass);
        return (
          <div className={classes.geoContainer}>
            <h3 className={classes.heading}>
              <FormattedMessage id="contentMeta" />
            </h3>
            {loadingIndicator}
            {
                userRole === USER_TYPE.GUEST ?
                    null :
                    (
                      <div className={c('row', classes.dateContainer)}>
                        <div className="col-xs-12 col-sm-4 col-md-3">
                          <DatePickerComponent
                            hintText={'startDate'}
                            defaultDate={contentStartDate}
                            onDateChangeHandler={this.setStartDate}
                            showResetButton={startDate}
                            clearDateText={clearDateText}
                          />
                        </div>
                        <div className={c('col-xs-12 col-sm-4 col-md-3', classes.datePickerContainer)}>
                          <DatePickerComponent
                            hintText={'expiryDate'}
                            defaultDate={contentEndDate}
                            onDateChangeHandler={this.setLastDate}
                            showResetButton={expiryDate}
                            clearDateText={clearDateText}
                          />
                          {
                            expiryDateErrorLabel ?
                              (
                                <div className={classes.expiryDateError}>
                                  <FormattedMessage id="expiryDateErrorLabel" />
                                </div>
                              ) : null
                          }
                        </div>
                        {
                          (userRole === USER_TYPE.HOST || userRole === USER_TYPE.VENDOR) ?
                          null :
                            (
                              <div className="col-xs-12 col-sm-4 col-md-6">
                                <TextField
                                  name="source"
                                  hintText={sourceTextValue}
                                  floatingLabelText={sourceTextValue}
                                  fullWidth
                                  value={source}
                                  onChange={this.handleInputChange}
                                  maxLength="150"
                                />
                              </div>
                            )
                        }
                      </div>
                    )
            }
            <div className="row">
              <div className={adminAddressClass}>
                <SelectField
                  floatingLabelText={countryTextValue}
                  hintText={countryTextValue}
                  value={countryId}
                  onChange={this.handleCountryChange}
                  className={classes.requiredFields}
                  errorText={countryErrorLabel}
                  fullWidth
                >
                  {
                    (
                      countries.length &&
                      countries.map(item => <MenuItem key={item.id} value={item.id} primaryText={item.name} />)
                    )
                  }
                </SelectField>
              </div>
              <div className={adminAddressClass}>
                <SelectField
                  floatingLabelText={stateTextValue}
                  hintText={stateTextValue}
                  value={stateId}
                  onChange={this.handleStateChange}
                  className={classes.requiredFields}
                  errorText={stateErrorLabel}
                  fullWidth
                >
                  {
                    (
                      states.length &&
                      states.map(item => <MenuItem key={item.id} value={item.id} primaryText={item.name} />)
                    )
                  }
                </SelectField>
              </div>
              {
                (userRole === USER_TYPE.ADMIN || userRole === USER_TYPE.OPERATOR) ?
                  (
                    <div className={adminAddressClass}>
                      <div className={classes.regionWrapper}>
                        <SelectField
                          floatingLabelText={regionTextValue}
                          hintText={regionTextValue}
                          value={regionId}
                          onChange={this.handleRegionChange}
                          fullWidth
                        >
                          {
                            (
                              regions.length &&
                              regions.map(item => <MenuItem key={item.id} value={item.id} primaryText={item.name} />)
                            )
                          }
                        </SelectField>
                        {
                          regionId ?
                            <i
                              className="material-icons"
                              onClick={this.clearRegion}
                              style={styles.clearDateButton}
                              data-tip={clearRegionText}
                              data-class={classes.tooltipStyle}
                              data-place="bottom"
                              data-effect="solid"
                            >
                              cancel
                            </i> : null
                        }
                      </div>
                    </div>
                  ) : null
              }

              <div className={autocompleteClass}>
                <AutoComplete
                  hintText={cityHintValue}
                  floatingLabelText={cityTextValue}
                  searchText={citySearchText}
                  onUpdateInput={this.handleCityInput}
                  onNewRequest={this.handleNewRequest}
                  dataSource={cities}
                  dataSourceConfig={AUTO_COMPLETE_CITY_SOURCE_CONFIG}
                  listStyle={styles.autoCompleteList}
                  filter={AutoComplete.caseInsensitiveFilter}
                  errorText={cityErrorLabel}
                  openOnFocus
                  fullWidth
                  animated
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-7">
                <TextField
                  name="address"
                  floatingLabelText={streetTextValue}
                  hintText={streetSearchHintText}
                  value={address}
                  errorText={streetErrorLabel || addressMinLengthErrorLabel}
                  onChange={this.handleAddressChange}
                  autoComplete="off"
                  fullWidth
                />
              </div>
              {
                (userRole === USER_TYPE.ADMIN || userRole === USER_TYPE.OPERATOR) ?
                  (
                    <div className={c('col-xs-12 col-sm-6 col-md-5', classes.textContainers)}>
                      <span className={classes.latContent}>
                        <span className={classes.contentColor}>
                          {latitudeTextValue} :
                        </span>{latitude ? latitude.toFixed(2) : null},
                      </span>
                      <span className={classes.contentColor}>
                        {longitudeTextValue} :
                        </span>{longitude ? longitude.toFixed(2) : null}
                    </div>
                  ) : null
              }

            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <TextField
                  name="postalcode"
                  hintText={postalcodeTextValue}
                  floatingLabelText={postalcodeTextValue}
                  fullWidth
                  value={postalcode}
                  onChange={this.handleInputChange}
                  maxLength="100"
                  type="text"
                />
              </div>
              <div className="col-xs-12 col-sm-6">
                <TextField
                  name="neighborhood"
                  hintText={neighborhoodTextValue}
                  floatingLabelText={neighborhoodTextValue}
                  fullWidth
                  value={neighborhood}
                  onChange={this.handleInputChange}
                  maxLength="100"
                />
              </div>
            </div>
            {
              (userRole === USER_TYPE.GUEST || userRole === USER_TYPE.HOST || userRole === USER_TYPE.VENDOR) ?
                null :
                (
                  <div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-6">
                        <TextField
                          name="license"
                          hintText={licenseTextValue}
                          floatingLabelText={licenseTextValue}
                          value={license}
                          onChange={this.handleInputChange}
                          maxLength="1000"
                          fullWidth
                        />
                      </div>
                      <div className="col-xs-12 col-sm-6">
                        <SelectField
                          floatingLabelText={videoContentTextValue}
                          hintText={videoContentTextValue}
                          value={contentTypeId}
                          onChange={this.contentTypeChange}
                          fullWidth
                        >
                          {(videoContentGroup && videoContentGroup.map(item => (
                            <MenuItem
                              key={item.id}
                              value={item.id}
                              primaryText={item.name}
                            />
                          )))}
                        </SelectField>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-4">
                        <TextField
                          name="rights"
                          hintText={rightsTextValue}
                          floatingLabelText={rightsTextValue}
                          value={rights}
                          onChange={this.handleInputChange}
                          maxLength="200"
                          fullWidth
                        />
                      </div>
                      <div className="col-xs-12  col-sm-4">
                        <TextField
                          name="copyright"
                          hintText={copyrightTextValue}
                          floatingLabelText={copyrightTextValue}
                          value={copyright}
                          onChange={this.handleInputChange}
                          maxLength="1000"
                          fullWidth
                        />
                      </div>
                      <div className="col-xs-12 col-sm-4">
                        <TextField
                          name="credits"
                          hintText={creditsTextValue}
                          floatingLabelText={creditsTextValue}
                          value={credits}
                          onChange={this.handleInputChange}
                          maxLength="200"
                          fullWidth
                        />
                      </div>
                    </div>
                  </div>

                )
            }

            <ButtonContainer
              previousBtnHandler={loadPrevious}
              nextBtnHandler={this.validateData}
            />
          </div>
        );
    }
}


VideoGeoLocation.defaultProps = {
    countries: [],
    states: [],
    regions: [],
    cities: [],
    videoContentGroup: [],
};

VideoGeoLocation.propTypes = {
    countries: PropTypes.array,
    cities: PropTypes.array,
    states: PropTypes.array,
    regions: PropTypes.array,
    videoContentGroup: PropTypes.array,
    loadNext: PropTypes.func.isRequired,
    loadPrevious: PropTypes.func.isRequired,
    getStateList: PropTypes.func.isRequired,
    getRegionList: PropTypes.func.isRequired,
    getCityList: PropTypes.func.isRequired,
    getCity: PropTypes.func.isRequired,
    removeCity: PropTypes.func.isRequired,
    updateContent: PropTypes.func.isRequired,
    userRole: PropTypes.string.isRequired,
    geoData: PropTypes.shape({
        source: PropTypes.string,
        neighborhood: PropTypes.string.isRequired,
        postalcode: PropTypes.string.isRequired,
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        countryId: PropTypes.number.isRequired,
        cityId: PropTypes.number.isRequired,
        stateId: PropTypes.number.isRequired,
        regionId: PropTypes.number.isRequired,
        expiryDate: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        credits: PropTypes.string.isRequired,
        rights: PropTypes.string.isRequired,
        license: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        copyright: PropTypes.string.isRequired,
        contentTypeId: PropTypes.number.isRequired,
    }).isRequired,
    intl: intlShape.isRequired,
};

const mapStateToProps = reduxState => ({
    countries: reduxState.locationInformation.countries,
    states: reduxState.locationInformation.states,
    regions: reduxState.locationInformation.regions,
    cities: reduxState.locationInformation.cities,
});

const mapDispatchToProps = dispatch => ({
    getStateList(countryId) {
        return dispatch(fetchStateList(countryId));
    },
    getRegionList(stateId) {
        return dispatch(fetchRegionList(stateId));
    },
    getCityList(cityObj) {
        return dispatch(fetchCityList(cityObj));
    },
    getCity(cityId) {
        return dispatch(getCityName(cityId));
    },
    removeCity() {
        dispatch(emptyCityList());
    },
    updateContent(data) {
        dispatch(updateLocalContent(data));
    },
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(VideoGeoLocation));
