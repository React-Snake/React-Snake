import { SET_BOARD } from '../actions';

export default (board = {}, action) => {
    switch (action.type) {
        case SET_BOARD:
            return action.payload;
        default:
            return board;
    }
};