/* eslint-env jest */
import authentication from './authentication';

describe('authentication', () => {
    it('returns the old state object for action type null', () => {
        const state = {};
        const action = { type: null };
        expect(authentication(state, action)).toBe(state);
    });

    describe('CHANGE_UNAUTH_VIEW', () => {
        it('returns a new state object', () => {
            const state = {};
            const action = {
                type: 'CHANGE_UNAUTH_VIEW',
                updatedView: {
                    showForgotPassword: true,
                    showRegister: false,
                },
            };

            expect(authentication(state, action)).not.toBe(state);
        });
        it('show up the ForgotPassword Page', () => {
            const state = {};
            const action = {
                type: 'CHANGE_UNAUTH_VIEW',
                updatedView: {
                    showForgotPassword: true,
                },
            };

            expect(authentication(state, action)).toEqual({
                ...state,
                showForgotPassword: true,
            });
        });
    });
});
