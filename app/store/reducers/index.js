import {combineReducers} from 'redux';

import app from './app';
import game from './game';

export default combineReducers({
  app,
  game,
});
