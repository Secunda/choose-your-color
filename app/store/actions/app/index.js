import _ from 'lodash';

import {
    APP_STORE_READY,
    APP_LOAD_SETTINGS,
    APP_RESET_SETTINGS,
    APP_SAVE_SETTINGS_GAME_SIZE,
    APP_SAVE_SETTINGS_COLOR_SECTION,
} from './types';

export const startApplication = () => ({
    type: APP_STORE_READY,
});

export const loadSettings = settingsFromStorage => ({
    type: APP_LOAD_SETTINGS,
    settings: settingsFromStorage,
});

export const saveSettingsGameSize = (gameSize, settings) => {
    const newState = _.cloneDeep(settings);

    _.set(newState, 'game.fieldSize.rows', gameSize);
    _.set(newState, 'game.fieldSize.cols', gameSize);

    return {
        type: APP_SAVE_SETTINGS_GAME_SIZE,
        settings: newState,
    };
};

export const saveSettingsColorSection = (color, colorSection) => ({
    type: APP_SAVE_SETTINGS_COLOR_SECTION,
    colors: {
        [colorSection]: color,
    },
});

export const resetSettings = () => ({
    type: APP_RESET_SETTINGS,
});
