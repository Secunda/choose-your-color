import _ from 'lodash';

import {
    START_GAME,
    GENERATE_GAME,
    GENERATED_GAME,
} from './types';

export const startGame = () => ({
    type: START_GAME,
});

export const generateGame = settings => ({
    settings,
    type: GENERATE_GAME,
});

export const generatedGame = matrix => ({
    matrix,
    type: GENERATED_GAME,
});
