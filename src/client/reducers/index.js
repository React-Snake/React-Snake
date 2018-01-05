import { combineReducers } from 'redux';
import boardReducer from './board';
import directionReducer from './direction';
import gameOverReducer from './gameOver';
import scoreReducer from './score';
import foodNeededReducer from './foodNeeded'

const rootReducer = combineReducers({
  score: scoreReducer,
  direction: directionReducer,
  board: boardReducer,
  isGameOver: gameOverReducer,
  foodNeeded: foodNeededReducer
});

export default rootReducer
