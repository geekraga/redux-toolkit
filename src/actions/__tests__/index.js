/* eslint-env jest */

import { changeDashboardLoadingStatus } from '../common';

describe('changeDashboardLoadingStatus', () => {
    const returnedObj = { type: 'CHANGE_DASHBOARD_LOADING_STATUS' };

    describe('returned function', () => {
        it('returns a new object that must contain a type property', () => {
            const state = {};
            const result = changeDashboardLoadingStatus(state);
            expect(result).not.toBe(state);
            expect(result).toEqual(expect.any(Object));
            expect(result).toEqual(expect.objectContaining({ type: 'CHANGE_DASHBOARD_LOADING_STATUS' }));
        });
    });

    it('returns a correct object with status false', () => {
        expect(changeDashboardLoadingStatus({status:false})).toEqual({
            ...returnedObj, status: false,
        });
    });

    it('returns a correct object with status true', () => {
        expect(changeDashboardLoadingStatus({status:true})).toEqual({
            ...returnedObj, status: true,
        });
    });

});

