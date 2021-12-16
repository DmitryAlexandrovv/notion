import {
    CHANGE_NOTE_MODE,
    SAVE_ACTIVE_NOTE,
    LOAD_PAGES,
    SET_ACTIVE_NOTE,
    CAN_DRAG_BLOCK,
    UPDATE_ADDED_BLOCKS_IDS,
    IS_DRAGGING_ACTIVE,
    SET_USER,
} from '../constants/actions';
import { NOTE_MODE_TYPES } from '../constants';

const initialState = {
    activeMode: NOTE_MODE_TYPES.VIEW,
    activeNote: null,
    pages: [],
    canDragBlock: true,
    addedBlocksIds: [],
    isDraggingActive: false,
    user: null,
    isLoggedIn: false,
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
        case CAN_DRAG_BLOCK:
            return {
                ...state,
                canDragBlock: payload,
            };
        case UPDATE_ADDED_BLOCKS_IDS:
            return {
                ...state,
                addedBlocksIds: payload,
            };
        case IS_DRAGGING_ACTIVE:
            return {
                ...state,
                isDraggingActive: payload,
            };
        case SET_USER:
            return {
                ...state,
                user: payload,
                isLoggedIn: true,
            };
        default:
            return state;
    }
};

export default reducer;
