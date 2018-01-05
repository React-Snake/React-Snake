import {  SET_DIRECTION } from '../actions';

export default (direction = 'right', action) => {
    switch (action.type) {
        case SET_DIRECTION:
            return action.payload;
        default:
            return direction;
    }
};