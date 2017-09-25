import {
    APP_STORE_READY,
} from '../actions/app/types';

const inititalState = {
    gameField: 10,
    isAppStoreReady: false,
};

export default function reducer(state = inititalState, action) {
    switch (action.type) {
        case APP_STORE_READY: {
            return {
                ...state,
                isAppStoreReady: true,
            };
        }
        default:
            return state;
    }
}
