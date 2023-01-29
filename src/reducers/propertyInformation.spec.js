/* eslint-env jest */
import propertyInformation from './propertyInformation';

describe('Property Reducer', () => {
    describe('default', () => {
        it('returns the given state object', () => {
            const state = {};
            const action = { type: null };
            expect(propertyInformation(state, action)).toBe(state);
        });
    });

    describe('GET_VIDEO_INFO', () => {
        let action = {};
        const state = {};
        beforeEach(() => {
            action = {
                type: 'GET_VIDEO_INFO',
                videoNames: {
                    records: [1,2,3],
                },
            };
        });
        it('returns a new state object', () => {
            expect(propertyInformation(state, action)).not.toBe(state);
        });

        it('returns expected state object', () => {
            expect(propertyInformation(state, action)).toEqual({
                ...state,
                videoNameHintSearch: [1,2,3],
            });
        });
    });

    describe('ADD_NEW_LINK_VIDEO', () => {
        let action = {};
        beforeEach(() => {
            action = {
                type: 'ADD_NEW_LINK_VIDEO',
                chosenData: {
                    id: 1,
                    name: 'videoName',
                },
            };
        });
        it('returns a new state object', () => {
            const state = {
                videoAssociationList: [],
                videoNameHintSearch: [1,2,3],
                recommendedVideoList: [],
            };
            expect(propertyInformation(state, action)).not.toBe(state);
        });

        it('returns expected state object with added display order', () => {
            const state = {
                videoAssociationList: [],
                videoNameHintSearch: [1,2,3],
                recommendedVideoList: [],
            };
            expect(propertyInformation(state, action)).toEqual({
                ...state,
                videoAssociationList: expect.arrayContaining([]),
                recommendedVideoList: [],
                displayOrderCategory: [1],
                videoNameHintSearch: [],
            });

            const action2 = {
                ...action,
                chosenData: {
                    id: 2,
                    name: 'videoName2',
                }
            }

            const prev = {
                categoryId: '',
                contentId: 2,
                contentName: 'videoName2',
                order: null,
                orderValidationCheck: false,
                isValid: false,
                validationCheck: false,
                hostVideoFlag: false,
                actionFlag: 1,
            }

            expect(propertyInformation(state, action2)).toEqual({
                ...state,
                videoAssociationList: expect.arrayContaining([
                    prev
                ]),
                recommendedVideoList: [],
                displayOrderCategory: [1],
                videoNameHintSearch: [],
            });

        });
    });

});
