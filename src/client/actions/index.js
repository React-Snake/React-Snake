//Jourdan Clark [11:18 AM] 
//In the store we'll need 'direction' which will be
// 'left'/'right'/'up'/'down' and we'll need 'score' which will be a number
export const up = 'up';
export const down = 'down';
export const left = 'left';
export const right = 'right';

// Our action creators will return
// an action packet that our reducer will
// receive. What does the action packet look like?
// Note that the action creator is not at all
// responsible for handling any of the actual
// logic of updating the centra Redux store. That
// is left to the reducer(s).

export const up = (score) => {
   // Fill in this function 
   return {
    type: 'up'
    payload: score
   }
};

export const down = () => {
   // Fill in this function 
   return {
    type: down
   }
};

export const left = (score) => {
    // Fill in this function 
    return {
     type: 'left'
     payload: score
    }
 };

 export const right = () => {
    // Fill in this function 
    return {
     type: right
    }
 };