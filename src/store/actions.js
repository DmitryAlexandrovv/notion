import { CHANGE_NOTE_MODE, SAVE_ACTIVE_NOTE, LOAD_PAGES, SET_ACTIVE_NOTE } from '../constants/actions';

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

export { changeNoteMode, saveActiveNote, loadPages, setActiveNote };