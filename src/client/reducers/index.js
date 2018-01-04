import { up, down, right, left } from '../actions';

// Our reducer that handles our two action cases,
// increment and decrement. It receives the state
// of our redux store, along with an action created
// by our action creator. What does the reducer
// need to do the count in each case?
export default (count = 0, action) => {
    switch (action.type) {
        case up:
            // Fill in the body of this case
            return count + 1;
        case down:
            // Fill in the body of this case
            return count - 1;
        default:
            return count;

        case left:
            // Fill in the body of this case
            return count + 1;
        case right:
            // Fill in the body of this case
            return count - 1;
        default:
            return count;
    }
};