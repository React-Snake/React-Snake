import { combineReducers } from 'redux';
import boardReducer from './board.js';
import directionReducer from './direction.js';
import gameOverReducer from './isGameOver.js';
import scoreReducer from './score.js';

const rootReducer = combineReducers({
  score: scoreReducer,
  direction: directionReducer,
  board: boardReducer,
  gameOver: gameOverReducer
});

export default rootReducer;