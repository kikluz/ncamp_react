import * as ActionTypes from './ActionTypes';

export const Promotions = (state = {isLoading: true,
                            
                                    errMess: null,    
                                    promotion: []}, action) => {

    switch (action.type) {
        case ActionTypes.ADD_PROMOTIONS:
            return {...state, isLoading: flase, errMess: null, promotions: action.payload};

        case ActionTypes.PROMOTIONS_LOADING:
            return {...state, isLoading: true, errMess: null, promotion: []};

        case  ActionTypes.PROMOTIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload} 
        default:
            return state;
    }
};