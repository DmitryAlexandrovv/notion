import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { findPageIdByUrl } from '../../helpers';
import { NOTE_MODE_TYPES } from '../../constants';
import Sidebar from '../../components/sidebar';
import NoteViewMode from './view-mode';
import NoteEditMode from './edit-mode';
import NoteControlElements from './edit-mode/note-control-elements';
import Navbar from '../../components/navbar';
import { changeNoteMode, loadPageById, setActiveNote } from '../../store/actions/notesActions';

import pageStyles from '../style.module.css';
import styles from './style.module.css';

const Note = () => {
    const pages = useSelector((state) => state.notes.pages),
        activeMode = useSelector((state) => state.notes.activeMode),
        activeNote = useSelector((state) => state.notes.activeNote),
        [isUrlExists, setIsUrlExists] = useState(true),
        { url: noteUrl } = useParams(),
        pageId = pages[noteUrl] ? noteUrl : findPageIdByUrl(pages, noteUrl),
        dispatch = useDispatch();

    const changeNote = (note) => dispatch(setActiveNote(note));

    useEffect(() => {
        if (pageId) {
            setIsUrlExists(true);
            dispatch(loadPageById(pageId));
        } else {
            setIsUrlExists(false);
        }
    }, [noteUrl]);

    useEffect(() => {
        return () => {
            dispatch(changeNoteMode(NOTE_MODE_TYPES.VIEW));
        };
    }, [activeNote]);

    const tabToggleHandler = (activeKey) => {
        dispatch(changeNoteMode(activeKey));
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
                                    className={styles.noteCtrlGroupItem}
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
                                    pageId={pageId}
                                    activeNote={activeNote}
                                    activeMode={activeMode}
                                    setactiveNote={changeNote}
                                />
                            )}
                        </>
                    )}
                </main>
                {activeMode === NOTE_MODE_TYPES.EDIT && activeNote && (
                    <NoteControlElements pageId={pageId} activeNote={activeNote} setActiveNote={changeNote} />
                )}
            </div>
        </div>
    );
};

export default Note;
