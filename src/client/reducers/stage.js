import {  SET_STAGE } from '../actions';

export default (stage = 'main_menu', action) => {
  switch (action.type) {
    case SET_STAGE:
      return action.payload;
    default:
      return stage;
  }
}
