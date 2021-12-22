import { NOTE_MODE_TYPES } from '../../constants';
import {
    CAN_DRAG_BLOCK,
    CHANGE_NOTE_MODE,
    CREATE_NEW_NOTE,
    IS_DRAGGING_ACTIVE,
    LOAD_PAGES,
    UPDATE_ADDED_BLOCKS_IDS,
    UPDATE_PAGE,
} from '../../constants/actions';

const initialState = {
    activeMode: NOTE_MODE_TYPES.VIEW,
    pages: [],
    canDragBlock: true,
    addedBlocksIds: [],
    isDraggingActive: false,
};

const notesReducer = (state = initialState, { type, payload }) => {
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
        case CREATE_NEW_NOTE:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    [payload.id]: payload.data,
                },
            };
        case UPDATE_PAGE:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    [payload.id]: payload.data,
                },
            };
        default:
            return state;
    }
};

export default notesReducer;
