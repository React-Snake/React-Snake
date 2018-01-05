import {  SET_TOP_SCORE } from '../actions';

export default (score = 0, action) => {
  switch (action.type) {
    case SET_TOP_SCORE:
      return action.payload;
    default:
      return score;
  }
}
