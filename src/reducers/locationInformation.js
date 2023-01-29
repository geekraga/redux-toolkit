import deepFreeze from 'deep-freeze-es6';
import {
    LOGOUT_SUCCESS,
    SESSION_TERMINATED,
    CREATE_COUNTRY_LIST,
    CREATE_STATE_LIST,
    CREATE_REGION_LIST,
    CREATE_CITY_LIST,
    EMPTY_CITY_LIST,
} from '../constants';

const initialRuntimeSettings = {
    countries: [],
    states: [],
    regions: [],
    cities: [],
};

function createCountry(state, { countries }) {
    return { ...state, countries };
}

function createStates(state, { states }) {
    return { ...state, states };
}

function createRegions(state, { regions }) {
    return { ...state, regions };
}

function createCities(state, { cityList }) {
    return { ...state, cities: [...cityList] };
}

function removeCities(state) {
    return { ...state, cities: [] };
}

export default function locationInformation(state = initialRuntimeSettings, action = {}) {
    deepFreeze(state);
    deepFreeze(action);

    switch (action.type) {
    case SESSION_TERMINATED:
    case LOGOUT_SUCCESS: return initialRuntimeSettings;
    case CREATE_COUNTRY_LIST: return createCountry(state, action);
    case CREATE_STATE_LIST: return createStates(state, action);
    case CREATE_REGION_LIST: return createRegions(state, action);
    case CREATE_CITY_LIST: return createCities(state, action);
    case EMPTY_CITY_LIST: return removeCities(state);
    default: return state;
    }
}
