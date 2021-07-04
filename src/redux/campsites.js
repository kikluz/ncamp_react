import { CAMPSITES } from '../shared/campsites';
// export it 
// Initialize a variable, first argument state  assigned, second parameter it take the action Object
export const Campsites = (state =  CAMPSITES, action) => {
    // Check Any on the action type in the match 
    switch (action.type) {
        default:
        // return state to the store 
            return state;
    }
};