import { combineReducers } from 'redux';
import boardReducer from './board';
import directionReducer from './direction';
import gameOverReducer from './gameOver';
import scoreReducer from './score';
import topScoreReducer from './topScore';
import foodNeededReducer from './foodNeeded';
import stageReducer from './stage';
import topTextReducer from './topText';

const rootReducer = combineReducers({
  score: scoreReducer,
  topScore: topScoreReducer,
  direction: directionReducer,
  board: boardReducer,
  isGameOver: gameOverReducer,
  foodNeeded: foodNeededReducer,
  stage: stageReducer,
  topText: topTextReducer
});

export default rootReducer;
