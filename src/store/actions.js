import {
    CHANGE_NOTE_MODE,
    SAVE_ACTIVE_NOTE,
    LOAD_PAGES,
    CAN_DRAG_BLOCK,
    UPDATE_ADDED_BLOCKS_IDS,
    IS_DRAGGING_ACTIVE,
    SET_USER,
    CREATE_NEW_NOTE,
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

//ToDo будет нужно, когда подключим бэк
const loadPages = (pages) => {
    return {
        type: LOAD_PAGES,
        payload: pages,
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

const createNewNote = (note) => {
    return {
        type: CREATE_NEW_NOTE,
        payload: note,
    };
};

export {
    changeNoteMode,
    saveActiveNote,
    loadPages,
    canDragNote,
    updateAddedBlocksIds,
    setIsDraggingActive,
    setUser,
    createNewNote,
};
