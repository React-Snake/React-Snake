import {  SET_SCORE } from '../actions';

export default (score = {}, action) => {
    switch (action.type) {
        case SET_SCORE:
            return action.payload;
        default:
            return score;
    }
};