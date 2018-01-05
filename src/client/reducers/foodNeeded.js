import { SET_FOOD_NEEDED } from '../actions';

export default (foodNeeded = false, action) => {
  switch (action.type) {
    case SET_FOOD_NEEDED:
      return action.payload;
    default:
      return foodNeeded;
  }
}
