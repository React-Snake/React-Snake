export const SET_DIRECTION = 'SET_DIRECTION';
export const SET_BOARD = 'SET_BOARD';
export const SET_SCORE = 'SET_SCORE';
export const SET_TOP_SCORE = 'SET_TOP_SCORE';
export const SET_STAGE = 'SET_STAGE';
export const GAME_OVER = 'GAME_OVER';
export const SET_FOOD_NEEDED = 'SET_FOOD_NEEDED';
export const SET_TOP_TEXT = 'SET_TOP_TEXT';

export const setDirection = (direction) => {
  return {
    type: SET_DIRECTION,
    payload: direction
  }
};

export const setBoard = (board) => {
  return {
    type: SET_BOARD,
    payload: board
  }
}

export const setScore = (score) => {
  return {
    type: SET_SCORE,
    payload: score
  }
}

export const setTopScore = (score) => {
  const topScore = localStorage.getItem('topScore') || 0;
  if (score < topScore)
    score = topScore;
  else
    localStorage.setItem('topScore', score);
  return {
    type: SET_TOP_SCORE,
    payload: score
  }
}

export const gameOver = (bool) => {
  return {
    type: GAME_OVER,
    payload: bool
  }
}

export const setFoodNeeded = (bool) => {
  return {
    type: SET_FOOD_NEEDED,
    payload: bool
  }
}

export const setStage = (stage) => {
  return {
    type: SET_STAGE,
    payload: stage
  }
}

export const setTopText = (text) => {
  return {
    type: SET_TOP_TEXT,
    payload: text
  }
}


