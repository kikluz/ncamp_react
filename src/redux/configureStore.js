import {createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms, initialFieldState } from 'react-redux-form';
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';



export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions,
            // combine reducers pass it to combine reducers as one of the arguments using the spread syntax
            // give and arguement contains a model name 
            ...createForms({
                // initial feedback object for the initial form state 
                feedbackForm: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};
// delete redux/Reducer.js file no longer use it 