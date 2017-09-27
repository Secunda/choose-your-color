import {
    GENERATE_GAME,
    START_GAME,
} from '../actions/game/types';

const inititalState = {
    /**
     * Game state
     */
    step: 0,
    matrix: [],
    score: 0,

    /**
     * Game properties
     */
    started: false,
    finished: false,

    /**
     * Game options
     */
    currentColor: '',
    colNumbers: 10,
    rowNumbers: 10,
};

export default function reducer(state = inititalState, action) {
    switch (action.type) {
        case GENERATE_GAME: {
            return {
                ...state,
                matrix: action.matrix,
            };
        }
        case START_GAME: {
            return {
                ...state,
                started: true,
                finished: false,
                step: action.step,
                matrix: action.matrix,
                score: action.score,
                currentColor: action.currentColor,
            };
        }
        default:
            return state;
    }
}
