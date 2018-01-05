import { SET_TOP_TEXT } from '../actions';

export default (text = '<Snake/>', action) => {
  switch (action.type) {
    case SET_TOP_TEXT:
      return action.payload;
    default:
      return text;
  }
}
