import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import trim from 'lodash/trim';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import c from 'classnames';
import {
    Popover,
    PopoverAnimationVertical,
    MenuItem,
    RaisedButton,
    Menu,
    TextField,
    SelectField,
    AutoComplete,
    DatePicker,
    FloatingActionButton,
    Chip,
} from 'material-ui';
import ReactTooltip from 'react-tooltip';
import { AUTO_COMPLETE_CITY_SOURCE_CONFIG } from '../../constants';
import { fetchFilters } from '../../actions/async/contentSearchManagement';
import { fetchStateList, fetchCityList, fetchRegionList } from '../../actions/async/location';
import { emptyCityList } from '../../actions/locationList';
import { fetchLanguages } from '../../actions/async/videoUpload';
import {
    selectedFilterChange,
    deleteSelectedFilter,
    deleteAppliedFilter,
    handleInputFieldChange,
    resetAppliedFilters,
} from '../../actions/contentSearchInformation';
import styles from './styles';
import classes from './styles.scss';

class ContentSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            openMenu: false,
            citySearchText: '',
            errorMessage: false,
            dateError: '',
        };
        this.getCityTimer = 0;
        this.cancelCityRequest = null;
        this.setDate = this.setDate.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.deleteFilter = this.deleteFilter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCityInput = this.handleCityInput.bind(this);
        this.handleNewRequest = this.handleNewRequest.bind(this);
        this.handleActionClick = this.handleActionClick.bind(this);
        this.actionMenuHandler = this.actionMenuHandler.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.createFilterAction = this.createFilterAction.bind(this);
        this.handleDropDownChange = this.handleDropDownChange.bind(this);
        this.chipAppliedFilterDelete = this.chipAppliedFilterDelete.bind(this);
    }
    componentDidMount() {
        this.props.getFilters();
    }

    componentDidUpdate() {
        ReactTooltip.rebuild();
    }

    componentWillUnmount() {
        this.props.resetFilters();
        if (this.cancelCityRequest) {
            this.cancelCityRequest.cancel('Cancel City Request');
            this.cancelCityRequest = null;
        }
        this.props.removeCity();
        clearTimeout(this.getCityTimer);
    }

    setDate(e, date) {
        const currentDate = moment(new Date(date)).format('YYYY-MM-DD');
        this.props.handleInputChange(currentDate);
        this.setState({ errorMessage: false });
        this.validateDatesSelected();
    }

    validateDatesSelected() {
        const { selectedFilter, appliedFilters, inputData } = this.props;
        const selectedDateKey = selectedFilter.key;
        if (selectedDateKey === 'expiryDate') {
            const startDate = appliedFilters.find(item => item.key === 'startDate');
            if (startDate && !(moment(inputData).isAfter(startDate.currentValue))) {
                this.setState({ dateError: 'expiryDateFilterLabel' });
                return;
            }
        } else if (selectedDateKey === 'startDate') {
            const expiryDate = appliedFilters.find(item => item.key === 'expiryDate');
            if (expiryDate && !(moment(inputData).isBefore(expiryDate.currentValue))) {
                this.setState({ dateError: 'startDateErrorLabel' });
                return;
            }
        }
        this.setState({ dateError: '' });
    }

    handleChange(e) {
        this.setState({ errorMessage: false });
        this.props.handleInputChange(e.target.value);
    }

    handleDropDownChange(index, value, selectedInput) {
        let dropDownValue = '';
        const { countries, states, regions, languages, actionList } = this.props;
        switch (selectedInput) {
        case 'country':
            dropDownValue = countries[index].name;
            break;
        case 'state':
            dropDownValue = states[index].name;
            break;
        case 'region':
            dropDownValue = regions[index].name;
            break;
        case 'language':
            dropDownValue = languages[index].name;
            break;
        case 'contentState':
            dropDownValue = actionList[index].description;
            break;
        default: return null;
        }
        const { handleInputChange } = this.props;
        this.setState({ errorMessage: false });
        handleInputChange(value, dropDownValue);
        return null;
    }

    actionMenuHandler(event) {
        event.preventDefault();
        this.setState({ openMenu: !this.state.openMenu, anchorEl: event.currentTarget });
    }

    handleRequestClose() {
        this.setState({ openMenu: false });
    }

    handleActionClick(filter) {
        const {
            selectedFilterAction,
            appliedFilters,
            intl,
            getState,
            getRegion,
            filterApiData,
            getLanguages,
            showNotification,
        } = this.props;
        if (this.DatePicker) {
            this.DatePicker.setState({ date: undefined });
        }
        if (filter.key === 'language') {
            getLanguages();
        }
        this.setState({ openMenu: false, errorMessage: false, dateError: '' });
        if (filter.parentKey) {
            const isParentPresent = appliedFilters.some(item => item.key === filter.parentKey);
            if (isParentPresent) {
                selectedFilterAction(filter);
                if (filter.key === 'state') {
                    getState(filterApiData.country);
                } else if (filter.key === 'region') {
                    getRegion(filterApiData.state);
                }
            } else {
                const { name, parentName } = filter;
                const message = intl.formatMessage({ id: 'filterElasticError' }, { name, parentName });
                showNotification(message, false);
            }
        } else {
            selectedFilterAction(filter);
        }
    }

    deleteFilter() {
        ReactTooltip.hide();
        const { selectedFilter, deleteFilterAction, holdVideoScreen } = this.props;
        this.setState({
            citySearchText: '',
            errorMessage: false,
            dateError: '',
        });
        holdVideoScreen();
        deleteFilterAction(selectedFilter);
    }

    applyFilter() {
        const { inputData, updateElasticSearch } = this.props;
        const { dateError } = this.state;
        this.setState({ citySearchText: '' });
        if (inputData && !dateError) {
            updateElasticSearch();
        } else {
            this.setState({ errorMessage: true });
        }
    }

    chipAppliedFilterDelete(indexKey) {
        const { appliedFilters, deleteAppliedFilterAction, showNotification, intl, selectedFilter } = this.props;
        deleteAppliedFilterAction(indexKey);
        if (appliedFilters[indexKey].key === 'startDate' || appliedFilters[indexKey].key === 'expiryDate') {
            this.setState({ dateError: '' });
        }
        if (appliedFilters[indexKey].key === 'country' &&
            (
            appliedFilters.some(item => item.parentKey === appliedFilters[indexKey].key)
            ||
            (!isEmpty(selectedFilter) && selectedFilter.parentKey === appliedFilters[indexKey].key)
            )
        ) {
            const message = intl.formatMessage({ id: 'filterRemovedMessage' }, { selectedFilterName: 'Country', parentName: 'State, Region and City' });
            showNotification(message, false);
        }
        if (appliedFilters[indexKey].key === 'state' && (
            (
                appliedFilters.some(item => item.parentKey === appliedFilters[indexKey].key)
                ||
                (!isEmpty(selectedFilter) && selectedFilter.parentKey === appliedFilters[indexKey].key)
            )
            )) {
            const message = intl.formatMessage({ id: 'filterRemovedMessage' }, { selectedFilterName: 'State', parentName: 'Region and City' });
            showNotification(message, false);
        }
    }

    handleCityInput(citySearchText) {
        const { filterApiData, getCity } = this.props;
        const region = filterApiData.region;
        const stateId = filterApiData.state;
        this.setState({ citySearchText, errorMessage: false });
        if (trim(citySearchText)) {
            clearTimeout(this.getCityTimer);
            this.getCityTimer = setTimeout(() => {
                if (this.cancelCityRequest) {
                    this.cancelCityRequest.cancel('Cancel City Request');
                    this.cancelCityRequest = null;
                }
                this.cancelCityRequest = getCity({ stateId, regionId: region || '', citySearchText });
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
        const { cities, handleInputChange } = this.props;
        if (typeof chosenRequest === 'object' && cities.length) {
            handleInputChange(chosenRequest.id, chosenRequest.name);
            this.setState({ citySearchText: chosenRequest.name, cityErrorLabel: '' });
        } else {
            this.setState({ citySearchText: '', cityErrorLabel: '' });
        }
    }

    createFilterAction() {
        const { selectedFilter, inputData, intl, countries, states, cities, regions, languages, actionList } = this.props;
        const { errorMessage, citySearchText, dateError } = this.state;
        const inputError = errorMessage ? intl.formatMessage({ id: 'emptyErrorMessage' }) + selectedFilter.name : null;
        switch (selectedFilter.type) {
        case 'textbox':
            return (
              <TextField
                id="textbox"
                floatingLabelText={selectedFilter.name}
                onChange={this.handleChange}
                value={inputData}
                errorText={inputError}
                fullWidth
                maxLength="100"
              />
            );
        case 'dropdown':
            return (
              <SelectField
                floatingLabelText={selectedFilter.name}
                value={inputData}
                onChange={(e, index, value) => this.handleDropDownChange(index, value, selectedFilter.key)}
                errorText={inputError}
                fullWidth
              >
                {(selectedFilter.key === 'country') ?
                  countries.map(country => (
                    <MenuItem key={country.id} value={country.id} primaryText={country.name} />
                  )) :
                  (selectedFilter.key === 'state') ?
                    (states.length && states.map(state => (
                      <MenuItem key={state.id} value={state.id} primaryText={state.name} />
                    ))) :
                  (selectedFilter.key === 'region') ?
                    (regions.length && regions.map(region => (
                      <MenuItem key={region.id} value={region.id} primaryText={region.name} />
                  ))) :

                  (selectedFilter.key === 'language') ?
                    (languages.length && languages.map(language => (
                      <MenuItem key={language.id} value={language.id} primaryText={language.name} />
                  ))) :
                  (selectedFilter.key === 'contentState') ?
                    (actionList.length && actionList.map(list => (
                      <MenuItem key={list.name} value={list.name} primaryText={list.description} />
                  ))) : null
                }
              </SelectField>
            );
        case 'calander':
            return (
              <div>
                <DatePicker
                  ref={ref => this.DatePicker = ref}
                  hintText={selectedFilter.name}
                  floatingLabelText={selectedFilter.name}
                  onChange={(e, date) => this.setDate(e, date)}
                  mode="portrait"
                  className={classes.datePickerWrapContent}
                  autoOk
                />
                {
                    dateError ?
                    (
                      <div className={classes.expiryDateError}>
                        <FormattedMessage id={dateError} />
                      </div>
                    ) :
                    errorMessage ?
                    (
                      <div className={classes.expiryDateError}>
                        {intl.formatMessage({ id: 'emptyErrorMessage' }) + selectedFilter.name}
                      </div>
                    ) :
                  null
                }
              </div>
            );
        case 'autocomplete':
            return (
              <AutoComplete
                hintText={selectedFilter.name}
                floatingLabelText={selectedFilter.name}
                dataSource={cities}
                searchText={citySearchText}
                errorText={inputError}
                dataSourceConfig={AUTO_COMPLETE_CITY_SOURCE_CONFIG}
                onUpdateInput={this.handleCityInput}
                onNewRequest={this.handleNewRequest}
                filter={AutoComplete.caseInsensitiveFilter}
                fullWidth
              />
            );
        default: return null;
        }
    }

    render() {
        const { anchorEl, openMenu } = this.state;
        const { filters, appliedFilters, intl } = this.props;
        const actionButtonContent = this.createFilterAction();
        const deleteFilterTip = intl.formatMessage({ id: 'deleteFilterTip' });
        const filterInputClass = actionButtonContent ? classes.filterInput : '';

        return (
          <div>
            <div className={classes.filterContainer}>
              <div className={c('row', classes.filterWrapper)}>
                <div className={c('col-xs-12', classes.filterSelector)}>
                  <RaisedButton
                    onTouchTap={this.actionMenuHandler}
                    label={<FormattedMessage id="filters" />}
                    icon={
                      <i className={c('material-icons', classes.btnIcon)}>
                        {openMenu ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                      </i>
                    }
                    className={classes.filterButton}
                    buttonStyle={styles.actionButtonContainer}
                    labelPosition="before"
                    primary
                  />
                  <Popover
                    open={openMenu}
                    anchorEl={anchorEl}
                    onRequestClose={this.handleRequestClose}
                    animation={PopoverAnimationVertical}
                    canAutoPosition
                  >
                    <Menu
                      autoWidth
                      menuItemStyle={styles.menuItemStyle}
                      maxHeight={300}
                    >
                      {(filters.length && filters.map((filter, index) => (
                        <MenuItem
                          key={filter.key}
                          onClick={() => this.handleActionClick(filter, index)}
                          value={filter.key}
                          primaryText={filter.name}
                          style={{ display: filter.isSelected ? 'none' : 'block' }}
                        />
                      )))}
                    </Menu>
                  </Popover>
                </div>
                <div className={c('col-xs-12', classes.filterInputWrapper)}>
                  {
                    actionButtonContent ?
                      (
                        <div className={c('row', filterInputClass)}>
                          <div className={c('col-xs-12', classes.filterActionClass)}>
                            {actionButtonContent}
                          </div>
                          <div className={classes.actionButtons}>
                            <RaisedButton label={<FormattedMessage id="apply" />} primary onTouchTap={this.applyFilter} />
                            <FloatingActionButton
                              onTouchTap={this.deleteFilter}
                              iconStyle={styles.deleteIconStyle}
                              data-tip={deleteFilterTip}
                              data-class={classes.tooltipStyle}
                              data-place="bottom"
                              data-effect="solid"
                              className={classes.deleteFilterMain}
                              mini
                            >
                              <i className="material-icons">clear</i>
                            </FloatingActionButton>
                          </div>
                        </div>
                      ) : null
                  }
                </div>
              </div>
              <div className={c('row', classes.selectedChipWrapper)}>
                <div className="col-xs-12">
                  {
                    (appliedFilters && appliedFilters.map((item, indexKey) => (
                      <Chip
                        onRequestDelete={() => this.chipAppliedFilterDelete(indexKey)}
                        key={indexKey}
                        className={classes.chipClass}
                      >
                        {
                          <span>
                            <span className={classes.selectedChipHead}>{item.name}: </span>
                            <span className={classes.selectedChipVal}> {item.currentValue}</span>
                          </span>
                         }
                      </Chip>
                    )))
                  }
                </div>
              </div>
            </div>
          </div>
        );
    }
}

ContentSearch.propTypes = {
    getFilters: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
    selectedFilterAction: PropTypes.func.isRequired,
    deleteFilterAction: PropTypes.func.isRequired,
    selectedFilter: PropTypes.object.isRequired,
    appliedFilters: PropTypes.array.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    deleteAppliedFilterAction: PropTypes.func.isRequired,
    updateElasticSearch: PropTypes.func.isRequired,
    countries: PropTypes.array.isRequired,
    states: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    regions: PropTypes.array.isRequired,
    getState: PropTypes.func.isRequired,
    getCity: PropTypes.func.isRequired,
    getRegion: PropTypes.func.isRequired,
    removeCity: PropTypes.func.isRequired,
    inputData: PropTypes.any.isRequired,
    filterApiData: PropTypes.object.isRequired,
    languages: PropTypes.array.isRequired,
    getLanguages: PropTypes.func.isRequired,
    resetFilters: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    holdVideoScreen: PropTypes.func.isRequired,
    actionList: PropTypes.array.isRequired,
    intl: intlShape.isRequired,
};

const mapStateToProps = reduxState => ({
    filters: reduxState.contentSearchManagement.filters,
    selectedFilter: reduxState.contentSearchManagement.selectedFilter,
    appliedFilters: reduxState.contentSearchManagement.appliedFilters,
    filterApiData: reduxState.contentSearchManagement.filterApiData,
    inputData: reduxState.contentSearchManagement.inputData,
    countries: reduxState.locationInformation.countries,
    states: reduxState.locationInformation.states,
    cities: reduxState.locationInformation.cities,
    regions: reduxState.locationInformation.regions,
    countryId: reduxState.contentSearchManagement.countryId,
    actionList: reduxState.videoList.actionList,
    languages: reduxState.languages,
});

const mapDispatchToProps = dispatch => ({
    getFilters() {
        return dispatch(fetchFilters());
    },
    selectedFilterAction(filter) {
        return dispatch(selectedFilterChange(filter));
    },
    deleteFilterAction(filter) {
        return dispatch(deleteSelectedFilter(filter));
    },
    deleteAppliedFilterAction(indexKey) {
        return dispatch(deleteAppliedFilter(indexKey));
    },
    handleInputChange(inputData, dropDownValue = '') {
        return dispatch(handleInputFieldChange(inputData, dropDownValue));
    },
    getState(countryId) {
        return dispatch(fetchStateList(countryId));
    },
    getCity(cityObj) {
        return dispatch(fetchCityList(cityObj));
    },
    getRegion(stateId) {
        return dispatch(fetchRegionList(stateId));
    },
    removeCity() {
        dispatch(emptyCityList());
    },
    resetFilters() {
        dispatch(resetAppliedFilters());
    },
    getLanguages() {
        dispatch(fetchLanguages());
    },
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ContentSearch));
