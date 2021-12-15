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

const changeNoteMode = (type) => {
    return {
        type: CHANGE_NOTE_MODE,
        payload: type,
    };
};

const saveActiveNote = (note) => {
    return {
        type: SAVE_ACTIVE_NOTE,
        payload: note,
    };
};

const loadPages = (pages) => {
    return {
        type: LOAD_PAGES,
        payload: pages,
    };
};

const setActiveNote = (note) => {
    return {
        type: SET_ACTIVE_NOTE,
        payload: note,
    };
};

const canDragNote = (canDragNote) => {
    return {
        type: CAN_DRAG_BLOCK,
        payload: canDragNote,
    };
};

const updateAddedBlocksIds = (blockId) => {
    return {
        type: UPDATE_ADDED_BLOCKS_IDS,
        payload: blockId,
    };
};

const setIsDraggingActive = (isActive) => {
    return {
        type: IS_DRAGGING_ACTIVE,
        payload: isActive,
    };
};

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

export {
    changeNoteMode,
    saveActiveNote,
    loadPages,
    setActiveNote,
    canDragNote,
    updateAddedBlocksIds,
    setIsDraggingActive,
    setUser,
};
