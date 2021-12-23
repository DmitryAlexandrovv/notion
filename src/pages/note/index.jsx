import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import firebaseService from '../../service/firebase';
import { findPageIdByUrl, showConfirmModal } from '../../helpers';
import { NOTE_MODE_TYPES } from '../../constants';
import Sidebar from '../../components/sidebar';
import NoteViewMode from './view-mode';
import NoteEditMode from './edit-mode';
import NoteControlElements from './edit-mode/note-control-elements';
import Navbar from '../../components/navbar';
import { Button } from 'antd';
import { changeNoteMode, setLoading } from '../../store/actions';

import pageStyles from '../style.module.css';
import styles from './style.module.css';

const Note = () => {
    const user = useSelector((state) => state.user),
        pages = useSelector((state) => state.pages),
        activeMode = useSelector((state) => state.activeMode),
        [isNoteBlocksEdited, setIsNoteBlocksEdited] = useState(false),
        [activeNote, setActiveNote] = useState(null),
        [isUrlExists, setIsUrlExists] = useState(true),
        { url: noteUrl } = useParams(),
        pageId = pages[noteUrl] ? noteUrl : findPageIdByUrl(pages, noteUrl),
        dispatch = useDispatch(),
        location = useLocation();

    useEffect(() => {
        if (pageId) {
            dispatch(setLoading(true));
            firebaseService
                .getNoteBlocks(user.id, pageId)
                .then((res) => {
                    const blocks = res === null ? [] : res;

                    const page = pages[pageId];

                    setActiveNote({
                        ...page,
                        blocks,
                    });
                    setIsUrlExists(true);
                })
                .finally(() => {
                    dispatch(setLoading(false));
                });
        } else {
            setIsUrlExists(false);
        }
    }, [noteUrl, location]);

    useEffect(() => {
        return () => {
            dispatch(changeNoteMode(NOTE_MODE_TYPES.VIEW));
        };
    }, [activeNote]);

    const tabToggleHandler = (activeKey) => {
        if (isNoteBlocksEdited && activeKey === NOTE_MODE_TYPES.VIEW) {
            showConfirmModal({
                title: 'Подтвердите действие',
                message: 'Изменения не сохранятся, продолжить?',
                onSuccess: () => dispatch(changeNoteMode(activeKey)),
            });
        } else {
            dispatch(changeNoteMode(activeKey));
        }
    };

    return (
        <div className={pageStyles.wrapper}>
            <Navbar />
            <div className={pageStyles.layout}>
                <Sidebar />
                <main className={pageStyles.main}>
                    {!isUrlExists && <h1>Note not found</h1>}
                    {activeNote && isUrlExists && (
                        <>
                            <div className={styles.noteCtrlGroup}>
                                <Button
                                    className={styles.noteCtrlGroupItem}
                                    onClick={() => tabToggleHandler(NOTE_MODE_TYPES.VIEW)}
                                >
                                    Просмотр
                                </Button>
                                <Button
                                    className={`${styles.noteCtrlGroupItem} ${styles.noteCtrlEditBtn}`}
                                    onClick={() => tabToggleHandler(NOTE_MODE_TYPES.EDIT)}
                                >
                                    Редактирование
                                </Button>
                            </div>
                            {activeMode === NOTE_MODE_TYPES.VIEW && activeNote && (
                                <NoteViewMode activeNote={activeNote} />
                            )}
                            {activeMode === NOTE_MODE_TYPES.EDIT && activeNote && (
                                <NoteEditMode
                                    setIsNoteBlocksEdited={setIsNoteBlocksEdited}
                                    pageId={pageId}
                                    activeNote={activeNote}
                                    activeMode={activeMode}
                                    setActiveNote={setActiveNote}
                                />
                            )}
                        </>
                    )}
                </main>
                {activeMode === NOTE_MODE_TYPES.EDIT && activeNote && (
                    <NoteControlElements
                        isNoteBlocksEdited={isNoteBlocksEdited}
                        pageId={pageId}
                        activeNote={activeNote}
                        setActiveNote={setActiveNote}
                    />
                )}
            </div>
        </div>
    );
};

export default Note;
