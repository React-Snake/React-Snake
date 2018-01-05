import {  GAME_OVER } from '../actions';

export default (isGameOver = false, action) => {
    switch (action.type) {
        case GAME_OVER:
            return action.payload;
        default:
            return isGameOver;
    }
};