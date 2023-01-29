import {
    CREATE_COUNTRY_LIST,
    CREATE_STATE_LIST,
    CREATE_REGION_LIST,
    CREATE_CITY_LIST,
    EMPTY_CITY_LIST,
} from '../constants';

export function createCountry(countries) {
    return {
        type: CREATE_COUNTRY_LIST,
        countries,
    };
}

export function createState(states) {
    return {
        type: CREATE_STATE_LIST,
        states,
    };
}

export function createRegion(regions) {
    return {
        type: CREATE_REGION_LIST,
        regions,
    };
}

export function createCity(cityList) {
    return {
        type: CREATE_CITY_LIST,
        cityList,
    };
}

export function emptyCityList() {
    return {
        type: EMPTY_CITY_LIST,
    };
}
