import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';







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
    // Adding error handling Errors 
    .then(response => {
             if (response.ok) {
                return response;
            } else {
                // Create an error object and throw it, will be caught by the catch block
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
            }
        },

        error => {
            const errMess = new Error(error.message);
            throw errMess;
        }
    )
    // call a fetch to retirn a promise, use json mathod to convert the response into javascript
        .then(response => response.json())
         // grap  that javascript array in the campsite argument, dispatch that camsite's argument with
        // addCampsites action creator to be used as a payload
        .then(campsites => dispatch(addCampsites(campsites)))
        .catch(error => dispatch(campsitesFailed(error.message)));

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
export const fetchComments = () => dispatch => {    
    return fetch(baseUrl + 'comments')
        // Adding error handling Errors 
        .then(response => {
            if (response.ok) {
                return response;
            } else {
            // Create an error object and throw it, will be caught by the catch block
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },

        error => {
            const errMess = new Error(error.message);
            throw errMess;
        }
    )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

// setup action creator for handle comments, returns action objects (no redux thunk)
// commentsFailed has a parameter of errMess
export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromotions = () => dispatch => {
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        // Adding error handling Errors 
        .then(response => {
            if (response.ok) {
                return response;
            } else {
            // Create an error object and throw it, will be caught by the catch block
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },

        error => {
            const errMess = new Error(error.message);
            throw errMess;
        }
    )
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});