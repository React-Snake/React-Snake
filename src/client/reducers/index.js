import { combineReducers } from 'redux';
import boardReducer from './board.js';
import directionReducer from './direction';
import gameOverReducer from './board.js';
import scoreReducer from './direction';

const rootReducer = combineReducers({
  score: scoreReducer,
  direction: directionReducer,
  board: boardReducer,
  gameOver: gameOverReducer
});

export default rootReducer;