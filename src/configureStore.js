import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools as compose } from 'redux-devtools-extension/developmentOnly';
import enGbMessages from './translations/en-gb';

const middlewares = [
    thunkMiddleware, // lets us dispatch() functions
];

const initialState = {
    intl: {
        defaultLocale: 'en-gb',
        locale: 'en-gb',
        messages: enGbMessages,
        languages: [
            { id: 'en-gb', name: 'English' },
            { id: 'fr-fr', name: 'Français' },
            { id: 'zh', name: '中文' },
        ],
    },
};

export default function configureStore(reducers) {
    const store = createStore(
        reducers,
        initialState,
        compose(applyMiddleware(...middlewares)),
    );
    return store;
}
