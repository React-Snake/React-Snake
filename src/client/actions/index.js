export const SET_BOARD = 'SET_BOARD';
export const SET_SCORE = 'SET_SCORE';

export const setBoard = (board) => {
   return {
        type: SET_BOARD,
        payload: board
   }
};


export const setScore = (score) => {
   return {
        type: SET_SCORE,
        payload: score
   }
}; 