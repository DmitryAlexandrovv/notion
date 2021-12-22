import {
    CAN_DRAG_BLOCK,
    CHANGE_NOTE_MODE,
    CREATE_NEW_NOTE,
    IS_DRAGGING_ACTIVE,
    LOAD_PAGES,
    UPDATE_ADDED_BLOCKS_IDS,
    UPDATE_PAGE,
} from '../../constants/actions';

export const changeNoteMode = (type) => {
    return {
        type: CHANGE_NOTE_MODE,
        payload: type,
    };
};

export const loadPages = (pages) => {
    return {
        type: LOAD_PAGES,
        payload: pages,
    };
};

export const canDragNote = (canDragNote) => {
    return {
        type: CAN_DRAG_BLOCK,
        payload: canDragNote,
    };
};

export const updateAddedBlocksIds = (blockId) => {
    return {
        type: UPDATE_ADDED_BLOCKS_IDS,
        payload: blockId,
    };
};

export const setIsDraggingActive = (isActive) => {
    return {
        type: IS_DRAGGING_ACTIVE,
        payload: isActive,
    };
};

export const createNewNote = (note) => {
    return {
        type: CREATE_NEW_NOTE,
        payload: note,
    };
};

export const updatePage = ({ id, data }) => {
    return {
        type: UPDATE_PAGE,
        payload: {
            id,
            data,
        },
    };
};
