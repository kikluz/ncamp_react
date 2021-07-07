import * as ActionTypes from './ActionTypes';
import { CAMPSITES } from '../shared/campsites';
import { baseUrl } from '../shared/baseUrl';
import { javascript } from 'webpack';
import { addComments } from '@babel/types';



export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});

export const fetchCampsites = () => dispatch => {

    dispatch(campsitesLoading());

    return fetch(baseUrl + 'campsites')
    // call a fetch to retirn a promise, use json mathod to convert the response into javascript
        .then(response => response.json())
        // grap  that javascript array in the campsite argument, dispatch that camsite's argument with
        // addCampsites action creator to be used as a payload
        .then(campsites => dispatch(addCampsites(campsites)));
};

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});

// thunk action creator with 2 doble arrow function, dispatch argument passed into the inner arrow function
export const fetchCommets = () => dispatch => {
    // get fetch requets from the  json-server and ask from the comments resource 
    // return a promise from the array of comments objects
    return fetch(baseUrl + 'comments')
    // use the array as a promise if were succesfull, use the json method to convert intoi javascript array
        .then(resonse => resonse.json())
        // will dispatch to the comment to be added to the redux store
        .then(comments => dispatch(addComments(comments)));
}

// setup action creator for handle comments, returns action objects (no redux thunk)
// commentsFailed has a parameter of errMess
export const commentsFailed = errMess => ({
    // will create an object ActionTypes.COMMENTS_FAILED
    type: ActionTypes.COMMENTS_FAILED,
    // then payload contain the errMess
    payload: errMess
})

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromotions = () => dispatch => {
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(response => dispatch(addPromotions(promotions)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
})

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
})

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
})
