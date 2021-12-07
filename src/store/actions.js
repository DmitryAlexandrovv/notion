import { CHANGE_NOTE_MODE } from '../constants/actions';

const changeNoteMode = (type) => {
    return {
        type: CHANGE_NOTE_MODE,
        payload: type,
    };
};

export { changeNoteMode };
