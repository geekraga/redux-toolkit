// returns given value or result of given function
export function getResult(arg) {
    return typeof arg === 'function' ? arg() : arg;
}

export function getAccessToken(getState) {
    const state = getResult(getState);
    return state.authentication.accessToken;
}
