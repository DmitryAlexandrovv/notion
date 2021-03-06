import {
    CHANGE_NOTE_MODE,
    LOAD_PAGES,
    CAN_DRAG_BLOCK,
    UPDATE_ADDED_BLOCKS_IDS,
    IS_DRAGGING_ACTIVE,
    SET_USER,
    CREATE_NEW_NOTE,
    CLEAR_STORE,
    UPDATE_PAGE,
    SET_LOADING,
} from '../constants/actions';
import { NOTE_MODE_TYPES } from '../constants';

const initialState = {
    activeMode: NOTE_MODE_TYPES.VIEW,
    pages: [],
    canDragBlock: true,
    addedBlocksIds: [],
    isDraggingActive: false,
    user: null,
    isLoggedIn: false,
    loading: false,
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CHANGE_NOTE_MODE:
            return {
                ...state,
                activeMode: payload,
            };
        case LOAD_PAGES:
            return {
                ...state,
                pages: payload,
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
        case CREATE_NEW_NOTE:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    [payload.id]: payload.data,
                },
            };
        case CLEAR_STORE:
            return initialState;
        case UPDATE_PAGE:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    [payload.id]: payload.data,
                },
            };
        case SET_LOADING:
            return {
                ...state,
                loading: payload.loading,
            };
        default:
            return state;
    }
};

export default reducer;
