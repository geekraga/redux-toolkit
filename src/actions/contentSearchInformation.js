import {
    FETCH_FILTERS,
    FILTER_CHANGE,
    DELETE_FILTER_ACTION,
    APPLY_FILTER_ACTION,
    DELETE_APPLIED_FILTER_ACTION,
    HANDLE_INPUT_FEILD_CHANGE,
    RESET_FILTERS,
} from '../constants';

export function fetchFiltersList({ records }) {
    return {
        type: FETCH_FILTERS,
        records,
    };
}

export function selectedFilterChange(selectedFilter) {
    return {
        type: FILTER_CHANGE,
        selectedFilter,
    };
}

export function deleteSelectedFilter(filter) {
    return {
        type: DELETE_FILTER_ACTION,
        filter,
    };
}

export function applySelectedFilter() {
    return {
        type: APPLY_FILTER_ACTION,
    };
}

export function deleteAppliedFilter(indexKey) {
    return {
        type: DELETE_APPLIED_FILTER_ACTION,
        indexKey,
    };
}

export function handleInputFieldChange(inputData, dropDownValue) {
    return {
        type: HANDLE_INPUT_FEILD_CHANGE,
        inputData,
        dropDownValue,
    };
}

export function resetAppliedFilters() {
    return {
        type: RESET_FILTERS,
    };
}
