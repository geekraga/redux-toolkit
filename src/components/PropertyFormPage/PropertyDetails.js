import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { TextField, SelectField, MenuItem, AutoComplete, RaisedButton } from 'material-ui';
import ReactTooltip from 'react-tooltip';
import trim from 'lodash/trim';
import c from 'classnames';
import LinkItem from '../LinkItem';
import LoadingIndicator from '../LoadingIndicator';
import { AUTO_COMPLETE_CITY_SOURCE_CONFIG, USER_TYPE, LOCATION_SURVEY_LINK } from '../../constants';
import { fetchStateList, fetchCityList, getCityName } from '../../actions/async/location';
import { emptyCityList } from '../../actions/locationList';
import { toggleLoadingState } from '../../actions/propertyInformation';
import { getGeoLocation } from '../../util/browserStorage';
import { validatePostalCode } from '../../util/regexStorage';
import styles from './styles';
import classes from '../VideoUploadComponents/VideoGeoLocation/styles.scss';
import classesMain from './styles.scss';

class PropertyDetails extends Component {
    constructor(props) {
        super(props);
        const {
            propertyName,
            id,
            countryId,
            stateId,
            cityId,
            streetAddress,
            postalcode,
            latitude,
            longitude,
            isActive,
        } = props.propertyInfo;
        this.state = {
            propertyName,
            id,
            countryId,
            stateId,
            cityId,
            streetAddress,
            postalcode,
            latitude,
            longitude,
            isActive,
            cityErrorLabel: '',
            stateErrorLabel: '',
            countryErrorLabel: '',
            propertyNameErrorLabel: '',
            postalcodeErrorLabel: '',
            streetErrorLabel: '',
            disableNext: false,
            citySearchText: '',
            userChangedAutolocation: false,
        };
        this.getCityTimer = 0;
        this.cancelCityRequest = null;
        this.errorMessages = {
            propertyError: <FormattedMessage id="propertyError" />,
            cityError: <FormattedMessage id="cityError" />,
            stateError: <FormattedMessage id="stateError" />,
            countryError: <FormattedMessage id="countryError" />,
            streetError: <FormattedMessage id="streetError" />,
            postalcodeError: <FormattedMessage id="postalcodeError" />,
        };
        this.handleCityInput = this.handleCityInput.bind(this);
        this.handleCityRequest = this.handleCityRequest.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
    }

    componentDidMount() {
        const { getStateList, getCity, changeLoadingState } = this.props;
        const { countryId, cityId, streetAddress } = this.state;
        let propertyName = this.state.propertyName;
        if (countryId) {
            getStateList(countryId).then(() => {
                if (cityId) {
                    getCity(cityId).then(citySearchText => {
                        if (!propertyName) {
                            propertyName = `Property @ ${streetAddress || citySearchText}`;
                        }
                        this.setState({ citySearchText, propertyName });
                        changeLoadingState(false);
                    });
                } else {
                    changeLoadingState(false);
                }
            });
        } else {
            changeLoadingState(false);
        }
        ReactTooltip.rebuild();
    }

    handleAddressChange = e => {
        const streetAddress = e.target.value;
        this.setState({ streetAddress, streetErrorLabel: '' }, () => {
            if (trim(streetAddress).length > 5) {
                this.updateLatLong();
            }
        });
    }

    updateLatLong = () => {
        const { countries, states } = this.props;
        const { citySearchText, streetAddress, countryId, stateId, propertyName } = this.state;
        if (!trim(citySearchText)) {
            return;
        }
        const countryName = countries.find(item => item.id === countryId).name;
        const stateName = states.find(item => item.id === stateId).name;
        const updatedAddress = `${streetAddress}, ${citySearchText}, ${stateName}, ${countryName}`;
        clearTimeout(this.searchLatLngTimer);
        this.setState({ disableNext: true }, () => {
            this.searchLatLngTimer = setTimeout(() => {
                if (this.cancelSearchRequest) {
                    this.cancelSearchRequest.cancel('Cancel Search Request');
                    this.cancelSearchRequest = null;
                }
                this.cancelSearchRequest = getGeoLocation(updatedAddress).then(res => {
                    const prePropertyString = propertyName ? propertyName.split(' @ ')[0] : 'Property';
                    this.setState({
                        latitude: res.lat,
                        longitude: res.lng,
                        streetErrorLabel: '',
                        disableNext: false,
                        propertyName: `${prePropertyString} @ ${streetAddress || citySearchText}`,
                        propertyNameErrorLabel: '',
                        userChangedAutolocation: true,
                    });
                }).catch(() => {
                    this.setState({
                        latitude: '',
                        longitude: '',
                        streetErrorLabel: this.errorMessages.streetError,
                        disableNext: false,
                    });
                });
            }, 200);
        });
    }

    handleInputChange = event => {
        this.setState(
            {
                [event.target.name]: event.target.value,
                [`${event.target.name}ErrorLabel`]: '',
                showSubmitError: '',
                showSubmitSuccess: false,
                userChangedAutolocation: true,
            },
        );
    }

    handleCountryChange(e, index, selectedCountryId) {
        const { countries, changeLoadingState } = this.props;
        const { countryId } = this.state;
        this.setState({ countryErrorLabel: '' });
        const countryName = countries.find(item => (item.id === selectedCountryId));
        if (countryId !== selectedCountryId) {
            this.setState({
                countryId: selectedCountryId,
                countryName: countryName.name,
                stateName: '',
                stateId: '',
                cityId: '',
                citySearchText: '',
                userChangedAutolocation: true,
            });
            this.props.removeCity();
            changeLoadingState(true);
            this.props.getStateList(selectedCountryId).then(() => {
                changeLoadingState(false);
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
                cityId: '',
                citySearchText: '',
                userChangedAutolocation: true,
            });
        }
    }

    handleCityInput(citySearchText) {
        const { stateId } = this.state;
        this.setState({ citySearchText, cityErrorLabel: '', cityId: '' });
        if (trim(citySearchText) && stateId) {
            clearTimeout(this.getCityTimer);
            this.getCityTimer = setTimeout(() => {
                if (this.cancelCityRequest) {
                    this.cancelCityRequest.cancel('Cancel City Request');
                    this.cancelCityRequest = null;
                }
                this.cancelCityRequest = this.props.getCityList({ stateId, regionId: '', citySearchText });
            }, 200);
        } else {
            if (this.cancelCityRequest) {
                this.cancelCityRequest.cancel('Cancel City Request');
                this.cancelCityRequest = null;
            }
            this.props.removeCity();
        }
    }

    handleCityRequest(chosenRequest) {
        const { cities } = this.props;
        let citySearchText = '';
        let cityId = 0;
        if (typeof chosenRequest === 'object' && cities.length) {
            citySearchText = chosenRequest.name;
            cityId = chosenRequest.id;
        }
        this.setState({ citySearchText, cityId, cityErrorLabel: '', streetAddress: '', userChangedAutolocation: true }, () => {
            this.updateLatLong();
        });
    }

    checkStreetLength = () => {
        const { longitude, streetAddress, citySearchText, countryId, stateId } = this.state;
        const {
            countries,
            states,
        } = this.props;
        if (trim(streetAddress).length && trim(streetAddress).length <= 5) {
            this.setState({
                streetErrorLabel: this.errorMessages.streetError,
            });
            return false;
        } else if (!longitude && citySearchText) {
            const countryName = countries.find(item => item.id === countryId).name;
            const stateName = states.find(item => item.id === stateId).name;
            const updatedAddress = `${citySearchText}, ${stateName}, ${countryName}`;
            getGeoLocation(updatedAddress).then(res => {
                this.setState({
                    latitude: res.lat,
                    longitude: res.lng,
                }, () => {
                    return true;
                });
            }).catch(() => {
                this.setState({
                    latitude: '',
                    longitude: '',
                    streetErrorLabel: this.errorMessages.streetError,
                });
                return false;
            });
        } else {
            return true;
        }
    }

    validateData = event => {
        event.preventDefault();
        const { countryId, stateId, cityId, citySearchText, propertyName, postalcode } = this.state;
        const { getPropertyDetails } = this.props;
        const checkStreet = this.checkStreetLength();
        if (
            cityId
            && trim(citySearchText)
            && stateId
            && countryId
            && trim(propertyName)
            && validatePostalCode(postalcode)
            && checkStreet
        ) {
            const {
                id,
                isActive,
                streetAddress,
                latitude,
                longitude,
            } = this.state;

            const recommendedVideoProp = {
                city: citySearchText,
                latitude,
                longitude,
                postalCode: postalcode,
                propertyId: id,
            };

            const propertyInfo = {
                cityId,
                countryId,
                id,
                isActive,
                propertyName,
                stateId,
                postalcode,
                latitude,
                longitude,
                streetAddress,
            };
            getPropertyDetails(propertyInfo, recommendedVideoProp);
        } else {
            if (!cityId || !trim(citySearchText)) {
                this.setState({ cityErrorLabel: this.errorMessages.cityError });
            }
            if (!stateId) {
                this.setState({ stateErrorLabel: this.errorMessages.stateError });
            }
            if (!countryId) {
                this.setState({ countryErrorLabel: this.errorMessages.countryError });
            }
            if (!trim(propertyName)) {
                this.setState({ propertyNameErrorLabel: this.errorMessages.propertyError });
            }
            if (!validatePostalCode(postalcode)) {
                this.setState({ postalcodeErrorLabel: this.errorMessages.postalcodeError });
            }
        }
    }

    revertAutoLocation = () => {
        const { userLocation } = this.props;
        const { propertyName } = this.state;
        const prePropertyString = propertyName ? propertyName.split(' @ ')[0] : 'Property';
        const { countryId, stateId, cityId, cityName, streetAddress, postalCode: postalcode, latitude, longitude } = userLocation.location;
        this.setState({
            countryId,
            stateId,
            cityId,
            citySearchText: cityName || '',
            streetAddress,
            postalcode,
            latitude,
            longitude,
            propertyName: cityName ? `${prePropertyString} @ ${streetAddress || cityName}` : prePropertyString,
            userChangedAutolocation: false,
        });
    }

    fillInfoBox = () => {
        const { userLocation, locationUrl } = this.props;
        const { countryId, citySearchText, stateId, userChangedAutolocation } = this.state;
        if (userLocation.userDeniedGeolocation || !userLocation.location) {
            return (
              <div className={classesMain.locDeclinedBox}>
                <i className="material-icons">my_location</i>
                <FormattedMessage id="locDeclinedText" />
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classesMain.enableLocationLink}
                >
                  <FormattedMessage id="settings" />
                </a>
              </div>
            );
        } else if (((!countryId || !citySearchText || !stateId) && !userChangedAutolocation) || !userLocation.isUserLocationValid) {
            return (
              <div>
                <FormattedMessage id="locNoCovered1" />
                <a
                  href={LOCATION_SURVEY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classesMain.enableLocationLink}
                >
                  <FormattedMessage id="locNoCovered2" />
                </a>
                <FormattedMessage id="locNoCovered3" />
              </div>
            );
        } else if (userChangedAutolocation) {
            return (
              <div className={classesMain.userChangedLocation} onClick={this.revertAutoLocation}>
                <i className="material-icons">my_location</i>
                <FormattedMessage id="useCurrentLoc" />
              </div>
            );
        }
        return null;
    }

    render() {
        const {
            id,
            propertyName,
            countryId,
            stateId,
            citySearchText,
            streetAddress,
            postalcode,
            cityErrorLabel,
            stateErrorLabel,
            countryErrorLabel,
            propertyNameErrorLabel,
            streetErrorLabel,
            latitude,
            longitude,
            disableNext,
            postalcodeErrorLabel,
        } = this.state;
        const {
            showLoader,
            countries,
            states,
            cities,
            userRole,
        } = this.props;
        const propertyNameText = <FormattedMessage id="propertyNameText" />;
        const countryTextValue = <FormattedMessage id="country" />;
        const stateTextValue = <FormattedMessage id="state" />;
        const cityTextValue = <FormattedMessage id="city" />;
        const cityHintValue = <FormattedMessage id="cityHint" />;
        const PostalCodeTextValue = <FormattedMessage id="PostalCodeTextValue" />;
        const streetTextValue = <FormattedMessage id="street" />;
        const streetSearchHintText = <FormattedMessage id="streetSearch" />;
        const latitudeTextValue = <FormattedMessage id="latitude" />;
        const longitudeTextValue = <FormattedMessage id="longitude" />;
        const autocompleteClass = c(
          classesMain.autoCompleteWrapper,
          { [classesMain.autoCompleteDisabled]: !stateId },
          'col-sm-6 col-xs-12',
        );
        const nextButtonClass = c(classesMain.btnSubDetails, { [classesMain.btnSubDetailsDisabled]: disableNext });
        return (
          <div className={classesMain.properyDetailsContainer}>
            { showLoader && <LoadingIndicator /> }
            {
              (!id) ? (
                <div className={classesMain.infoBox}>
                  {this.fillInfoBox()}
                </div>
              ) : null
            }
            <form onSubmit={this.validateData}>
              <div className="row">
                <div className="col-sm-6 col-xs-12">
                  <SelectField
                    floatingLabelText={countryTextValue}
                    hintText={countryTextValue}
                    value={countryId}
                    onChange={this.handleCountryChange}
                    className={classesMain.requiredFields}
                    errorText={countryErrorLabel}
                    fullWidth
                  >
                    {
                      (
                        countries.length &&
                        countries.map(item => (
                          <MenuItem key={item.id} value={item.id} primaryText={item.name} />
                        ))
                      )
                    }
                  </SelectField>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 col-xs-12">
                  <SelectField
                    floatingLabelText={stateTextValue}
                    hintText={stateTextValue}
                    value={stateId}
                    onChange={this.handleStateChange}
                    className={classesMain.requiredFields}
                    errorText={stateErrorLabel}
                    fullWidth
                  >
                    {
                      (
                        states.length &&
                        states.map(item => (
                          <MenuItem key={item.id} value={item.id} primaryText={item.name} />
                        ))
                      )
                    }
                  </SelectField>
                </div>
              </div>
              <div className="row">
                <div className={autocompleteClass}>
                  <AutoComplete
                    hintText={cityHintValue}
                    floatingLabelText={cityTextValue}
                    searchText={citySearchText}
                    onUpdateInput={this.handleCityInput}
                    onNewRequest={this.handleCityRequest}
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
                <div className="col-xs-12 col-sm-6">
                  <TextField
                    name="address"
                    floatingLabelText={streetTextValue}
                    hintText={streetSearchHintText}
                    value={streetAddress}
                    errorText={streetErrorLabel}
                    onChange={this.handleAddressChange}
                    autoComplete="off"
                    fullWidth
                  />
                </div>
                {
                  (userRole === USER_TYPE.ADMIN || userRole === USER_TYPE.OPERATOR) ?
                    (
                      <div className={c('col-xs-12 col-sm-6', classes.textContainers)}>
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
                <div className="col-sm-6 col-xs-12">
                  <TextField
                    name="postalcode"
                    hintText={PostalCodeTextValue}
                    floatingLabelText={PostalCodeTextValue}
                    fullWidth
                    value={postalcode}
                    onChange={this.handleInputChange}
                    maxLength="5"
                    errorText={postalcodeErrorLabel}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 col-xs-12">
                  <TextField
                    name="propertyName"
                    hintText={propertyNameText}
                    className={classesMain.requiredFields}
                    floatingLabelText={propertyNameText}
                    fullWidth
                    value={propertyName}
                    onChange={this.handleInputChange}
                    errorText={propertyNameErrorLabel}
                    maxLength="100"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="row">
                <div className={c('col-xs-12', classesMain.buttonContainer)}>
                  <RaisedButton
                    className={classesMain.cancelButtonLink}
                    containerElement="label"
                  >
                    <LinkItem to={'/'} linkClass={classesMain.cancelBtn}>
                      <FormattedMessage id="cancel" />
                    </LinkItem>
                  </RaisedButton>
                  <RaisedButton
                    label={<FormattedMessage id="next" />}
                    className={nextButtonClass}
                    containerElement="label"
                  >
                    <input type="submit" className={classesMain.btnSubmit} />
                  </RaisedButton>
                </div>
              </div>
            </form>
          </div>
        );
    }
}

PropertyDetails.defaultProps = {
    countries: [],
    states: [],
    cities: [],
};

PropertyDetails.propTypes = {
    countries: PropTypes.array.isRequired,
    states: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    userRole: PropTypes.string.isRequired,
    propertyInfo: PropTypes.object.isRequired,
    changeLoadingState: PropTypes.func.isRequired,
    getStateList: PropTypes.func.isRequired,
    getCityList: PropTypes.func.isRequired,
    getCity: PropTypes.func.isRequired,
    removeCity: PropTypes.func.isRequired,
    getPropertyDetails: PropTypes.func.isRequired,
    showLoader: PropTypes.bool.isRequired,
    locationUrl: PropTypes.string.isRequired,
    userLocation: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
    countries: reduxState.locationInformation.countries,
    states: reduxState.locationInformation.states,
    cities: reduxState.locationInformation.cities,
    userRole: reduxState.userDashboard.dashboard.role,
    showLoader: reduxState.propertyInformation.loading,
    locationUrl: reduxState.runtimeSettings.locationUrl,
    userLocation: reduxState.runtimeSettings.userLocation,
});

const mapDispatchToProps = dispatch => ({
    getStateList(countryId) {
        return dispatch(fetchStateList(countryId, true));
    },
    getCityList(cityObj) {
        return dispatch(fetchCityList(cityObj, true));
    },
    getCity(cityId) {
        return dispatch(getCityName(cityId, true));
    },
    removeCity() {
        dispatch(emptyCityList());
    },
    changeLoadingState(loading) {
        dispatch(toggleLoadingState(loading));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetails);
