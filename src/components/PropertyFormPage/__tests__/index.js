/* eslint-env jest */

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { getIntl } from '../../../testHelpers/context';
import SelectPropertyComponent from '../selectPropertyVideos';

describe('SelectPropertyComponent', () => {
    let component;

    beforeEach(() => {
        const messageKeys = ['cancel'];
        const intlComp = getIntl(messageKeys);
        const baseProps = {
            showLoader: false,
            fetchVideos: () => {},
            previewContent: () => {},
            propertyInfo: {},
            populateData: () => {},
            loadPropertyDetails: () => {},
            hideRecommendedVideos: () => {},
            uploadPropertyData: () => {},
            showRecommended: true,
            intl: intlComp,
        };
        const store = {
            default: () => {},
            subscribe: () => {},
            dispatch: () => {},
            getState: () => {
                return { ...state };
            },
        };
        component = shallow(<Provider store={store}><SelectPropertyComponent { ...baseProps } /></Provider>);
    });

    it('should render RecommendedVideos Component only', () => {
        expect(component).toMatchSnapshot();
    });
});

