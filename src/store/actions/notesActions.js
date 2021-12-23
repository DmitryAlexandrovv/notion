import {
    CAN_DRAG_BLOCK,
    CHANGE_NOTE_MODE,
    CREATE_NEW_NOTE,
    IS_DRAGGING_ACTIVE,
    SET_PAGES,
    SET_ACTIVE_NOTE,
    UPDATE_ADDED_BLOCKS_IDS,
    UPDATE_PAGE,
} from '../../constants/actions';
import { setLoading } from './appActions';
import firebaseService from '../../service/firebase';

export const changeNoteMode = (type) => {
    return {
        type: CHANGE_NOTE_MODE,
        payload: type,
    };
};

export const setPages = (pages) => {
    return {
        type: SET_PAGES,
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

export const setActiveNote = (note) => {
    return {
        type: SET_ACTIVE_NOTE,
        payload: { note },
    };
};

export const savePage = (data) => (dispatch, getState) => {
    const { user } = getState().auth;
    dispatch(setLoading(true));
    firebaseService
        .appendNewPage(user.id, {
            title: data.title,
            url: data.url,
            ...(data.parentId && { parentId: data.parentId }),
        })
        .then((data) => {
            dispatch(
                createNewNote({
                    id: data.id,
                    data: {
                        title: data.title,
                        parentId: data.parentId ?? undefined,
                        url: data.url,
                    },
                })
            );
        })
        .catch((error) => {
            console.error(error.message);
        })
        .finally(() => {
            dispatch(setLoading(false));
        });
};

export const loadPages = () => (dispatch, getState) => {
    const { user } = getState().auth;

    dispatch(setLoading(true));
    firebaseService
        .getPages(user.id)
        .then((pages) => dispatch(setPages(pages)))
        .catch((error) => console.error(error))
        .finally(() => dispatch(setLoading(false)));
};

export const loadPageById = (id) => (dispatch, getState) => {
    const { user } = getState().auth;
    const { pages } = getState().notes;
    const page = pages[id];

    dispatch(setLoading(true));
    firebaseService
        .getNoteBlocks(user.id, id)
        .then((res) => {
            const blocks = res === null ? [] : res;

            dispatch(
                setActiveNote({
                    ...page,
                    blocks,
                })
            );
        })
        .finally(() => {
            dispatch(setLoading(false));
        });
};

export const savePageProps = (activeNote, data) => (dispatch, getState) => {
    const { user } = getState().auth;

    dispatch(setLoading(true));
    firebaseService
        .updatePage(user.id, activeNote.id, {
            title: data.title,
            url: data.url,
            ...(data.parentId && { parentId: data.parentId }),
        })
        .then(() => {
            dispatch(
                updatePage({
                    id: activeNote.id,
                    data,
                })
            );
            dispatch(
                setActiveNote({
                    ...activeNote,
                    ...data,
                })
            );
        })
        .catch((error) => {
            console.error(error.message);
        })
        .finally(() => {
            dispatch(setLoading(false));
        });
};
