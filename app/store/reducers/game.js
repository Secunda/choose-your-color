import _ from 'lodash';
import {
    START_GAME,
    GENERATE_GAME,
    GENERATED_GAME,
} from '../actions/game/types';

const inititalState = {
    started: false,
    generated: false,
    gameSettings: {},
    matrix: [],
    score: 0,
};

export default function reducer(state = inititalState, action) {
    switch (action.type) {
        case START_GAME: {
            const newState = _.cloneDeep(state);
            newState.started = true;
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
            return newState;
        }
        default:
            return state;
    }
}
