import {  GAME_OVER } from '../actions';

export default (gameOver = false, action) => {
  switch (action.type) {
    case GAME_OVER:
      return action.payload;
    default:
      return gameOver;
  }
}
