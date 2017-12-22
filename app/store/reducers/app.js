import _ from 'lodash';

import {
  APP_STORE_READY,
  APP_LOAD_SETTINGS,
  APP_SAVE_SETTINGS_GAME_SIZE,
  APP_RESET_SETTINGS,
  APP_SAVE_SETTINGS_COLOR_SECTION,
} from '../actions/app/types';

const inititalState = {
  isAppStoreReady: false,
  settings: {
    game: {
      fieldSize: {
        rows: 10,
        cols: 10,
      },
      colors: {
        cl1: '#F00',
        cl2: '#FF8000',
        cl3: '#FFFF00',
        cl4: '#00FF00',
        cl5: '#00FFFF',
        cl6: '#0000FF',
        cl7: '#FF00FF',
        cl8: '#888888',
      },
    },
  },
};

export default function reducer(state = inititalState, action) {
  switch (action.type) {
    case APP_STORE_READY: {
      return {
        ...state,
        isAppStoreReady: true,
      };
    }
    case APP_LOAD_SETTINGS: {
      return {
        ...state,
        settings: action.settings || inititalState.settings,
      };
    }
    case APP_SAVE_SETTINGS_GAME_SIZE: {
      return {
        ...state,
        settings: action.settings,
      };
    }
    case APP_RESET_SETTINGS: {
      return {
        ...state,
        settings: inititalState.settings,
      };
    }
    case APP_SAVE_SETTINGS_COLOR_SECTION: {
      const newState = _.cloneDeep(state);

      _.set(newState, 'settings.game.colors', _.merge({}, newState.settings.game.colors, action.colors));
      return newState;
    }
    default:
      return state;
  }
}
