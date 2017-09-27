import _ from 'lodash';

import {
    APP_STORE_READY,
    APP_LOAD_SETTINGS,
    APP_RESET_SETTINGS,
    APP_SAVE_SETTINGS_GAME_SIZE,
} from './types';

export const startApplication = () => ({
    type: APP_STORE_READY,
});

export const loadSettings = settingsFromStorage => ({
    type: APP_LOAD_SETTINGS,
    settings: settingsFromStorage,
});

export const saveSettingsGameSize = (gameSize, settings) => {
    const updatedSettings = _.cloneDeep(settings);

    _.set(updatedSettings, 'game.fieldSize.rows', gameSize);
    _.set(updatedSettings, 'game.fieldSize.cols', gameSize);

    return {
        type: APP_SAVE_SETTINGS_GAME_SIZE,
        settings: updatedSettings,
    };
};

export const resetSettings = () => ({
    type: APP_RESET_SETTINGS,
});
