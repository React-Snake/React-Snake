import {  IS_GAME_OVER } from '../actions';

export default (gameOver = false, action) => {
    switch (action.type) {
        case IS_GAME_OVER:
            return action.payload;
        default:
            return gameOver;
    }
};