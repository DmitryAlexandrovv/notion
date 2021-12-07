import { CHANGE_NOTE_MODE } from '../constants/actions';
import { NOTE_MODE_TYPES } from '../constants';

const initialState = {
    activeMode: NOTE_MODE_TYPES.VIEW,
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CHANGE_NOTE_MODE:
            return {
                ...state,
                activeMode: payload,
            };
        default:
            return state;
    }
};

export default reducer;
