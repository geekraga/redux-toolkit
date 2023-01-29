import deepFreeze from 'deep-freeze-es6';
import cloneDeep from 'lodash/cloneDeep';
import difference from 'lodash/difference';

import {
    LOGOUT_SUCCESS,
    SESSION_TERMINATED,
    FETCH_FILTERS,
    FILTER_CHANGE,
    DELETE_FILTER_ACTION,
    APPLY_FILTER_ACTION,
    DELETE_APPLIED_FILTER_ACTION,
    HANDLE_INPUT_FEILD_CHANGE,
    RESET_FILTERS,
} from '../constants';

const initialState = {
    filters: [],
    selectedFilter: {},
    appliedFilters: [],
    inputData: '',
    countryId: '',
    dropDownValue: '',
    filterApiData: {},
};

function resetData(state) {
    return { ...state, ...initialState };
}

function fetchFiltersData(state, { records }) {
    const result = records.map(record => ({ ...record, isSelected: false, currentValue: '' }));
    return { ...state, filters: result };
}

function selectedFilterChange(state, { selectedFilter }) {
    const filters = cloneDeep(state.filters);
    const updatedFilter = filters.map(item => {
        if (item.key === selectedFilter.key || state.appliedFilters.some((appliedItem) => appliedItem.key === item.key)) {
            return { ...item, isSelected: true };
        }
        return { ...item, isSelected: false };
    });
    return { ...state, filters: updatedFilter, selectedFilter, inputData: '' };
}

function deleteSelectedFilterAction(state, { filter }) {
    const updatedFilters = state.filters.map(item => {
        if (item.key === filter.key) {
            return { ...item, isSelected: false };
        }
        return item;
    });
    const selectedFilter = {};
    return { ...state, filters: updatedFilters, selectedFilter, inputData: '' };
}

function applyFiltersAction(state) {
    const selectedFilter = state.selectedFilter;
    const updatedApiData = { ...state.filterApiData, [selectedFilter.key]: state.inputData };
    return {
        ...state,
        appliedFilters: [
            ...state.appliedFilters,
            { ...selectedFilter, currentValue: state.dropDownValue || state.inputData },
        ],
        selectedFilter: {},
        inputData: '',
        dropDownValue: '',
        filterApiData: updatedApiData,
    };
}

function deleteAppliedFilters(state, { indexKey }) {
    const addTofilters = state.appliedFilters[indexKey];
    let selectedFilter = { ...state.selectedFilter };
    const keysToBeDeleted = [addTofilters];
    let checkKey = addTofilters.key;
    for (let i = 0; i < state.appliedFilters.length; i += 1) {
        if (checkKey === state.appliedFilters[i].parentKey) {
            for (let j = 0; j < state.appliedFilters.length; j += 1) {
                if (checkKey === state.appliedFilters[j].parentKey) {
                    keysToBeDeleted.push(state.appliedFilters[j]);
                }
            }
            checkKey = state.appliedFilters[i].key;
        }
    }
    if (keysToBeDeleted.some(selectedKey => selectedKey.key === selectedFilter.parentKey)) {
        keysToBeDeleted.push(selectedFilter);
        selectedFilter = {};
    }

    const updatedAppliedFilters = difference(state.appliedFilters, keysToBeDeleted);
    const filters = cloneDeep(state.filters);
    for (let i = 0; i < state.filters.length; i += 1) {
        for (let j = 0; j < keysToBeDeleted.length; j += 1) {
            if (keysToBeDeleted[j].key === filters[i].key) {
                filters[i].isSelected = false;
            }
        }
    }
    const updatedApiData = cloneDeep(state.filterApiData);
    for (let i = 0; i < keysToBeDeleted.length; i += 1) {
        updatedApiData[keysToBeDeleted[i].key] = null;
    }
    return { ...state, appliedFilters: updatedAppliedFilters, filters, filterApiData: updatedApiData, selectedFilter };
}

function handleInputChange(state, { inputData, dropDownValue }) {
    return { ...state, inputData, dropDownValue };
}

export default function authentication(state = initialState, action = {}) {
    deepFreeze(state);
    deepFreeze(action);
    switch (action.type) {
    case SESSION_TERMINATED:
    case RESET_FILTERS:
    case LOGOUT_SUCCESS: return resetData(state);
    case FETCH_FILTERS: return fetchFiltersData(state, action);
    case FILTER_CHANGE: return selectedFilterChange(state, action);
    case DELETE_FILTER_ACTION: return deleteSelectedFilterAction(state, action);
    case APPLY_FILTER_ACTION: return applyFiltersAction(state);
    case DELETE_APPLIED_FILTER_ACTION: return deleteAppliedFilters(state, action);
    case HANDLE_INPUT_FEILD_CHANGE: return handleInputChange(state, action);
    default: return state;
    }
}

