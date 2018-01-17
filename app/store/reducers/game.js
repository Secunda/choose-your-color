import _ from 'lodash';
import {
  START_GAME,
  GENERATE_GAME,
  GENERATED_GAME,
  GAME_STEP,
  GAME_SCORE,
  GAME_ANIMATED,
  GAME_FINISHED,
} from '../actions/game/types';

const inititalState = {
  started: false,
  generated: false,
  gameSettings: {},
  matrix: [],
  score: 0,
  affectedCells: 0,
  currentColor: null,
  animate: true,
  finished: false,
};

export default function reducer(state = inititalState, action) {
  switch (action.type) {
    case START_GAME: {
      const newState = _.cloneDeep(inititalState);
      newState.started = true;
      newState.finished = false;
      return newState;
    }
    case GENERATE_GAME: {
      const newState = _.cloneDeep(state);
      newState.gameSettings = action.settings;
      return newState;
    }
    case GENERATED_GAME: {
      const newState = _.cloneDeep(state);
      newState.matrix = action.matrix;
      newState.generated = true;
      [[newState.currentColor]] = action.matrix;
      return newState;
    }
    case GAME_STEP: {
      const newState = _.cloneDeep(state);
      newState.matrix = action.matrix;
      [[newState.currentColor]] = action.matrix;
      return newState;
    }
    case GAME_SCORE: {
      const newState = _.cloneDeep(state);
      newState.score = action.score;
      newState.affectedCells = action.affectedCells;
      return newState;
    }
    case GAME_ANIMATED: {
      const newState = _.cloneDeep(state);
      newState.animate = false;
      return newState;
    }
    case GAME_FINISHED: {
      const newState = _.cloneDeep(state);
      newState.finished = true;
      return newState;
    }
    default:
      return state;
  }
}
