import _ from 'lodash';

import {
    START_GAME,
    GENERATE_GAME,
    GENERATED_GAME,
    GAME_STEP,
    GAME_SCORE,
    GAME_ANIMATED,
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

export const gameStep = matrix => ({
    matrix,
    type: GAME_STEP,
});

export const gameScore = (affectedCells, score) => ({
    affectedCells,
    score,
    type: GAME_SCORE,
});

export const gameAnimated = () => ({
    type: GAME_ANIMATED,
});
