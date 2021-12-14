import { CHANGE_NOTE_MODE, SAVE_ACTIVE_NOTE, LOAD_PAGES, SET_ACTIVE_NOTE, SET_USER } from '../constants/actions';
import { NOTE_MODE_TYPES } from '../constants';

const initialState = {
    activeMode: NOTE_MODE_TYPES.VIEW,
    activeNote: null,
    pages: [],
    user: null,
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CHANGE_NOTE_MODE:
            return {
                ...state,
                activeMode: payload,
            };
        case SAVE_ACTIVE_NOTE:
            return {
                ...state,
                activeNote: payload,
            };
        case LOAD_PAGES:
            return {
                ...state,
                pages: payload,
            };
        case SET_ACTIVE_NOTE:
            return {
                ...state,
                activeNote: payload,
            };
        case SET_USER:
            console.log(payload);
            return {
                ...state,
                user: payload,
            };
        default:
            return state;
    }
};

export default reducer;
