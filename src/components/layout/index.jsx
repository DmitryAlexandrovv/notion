import { useDispatch, useSelector } from 'react-redux';
import { changeNoteMode, loadPages } from '../../store/actions';
import { NOTE_MODE_TYPES } from '../../constants';
import Sidebar from '../sidebar';
import NoteViewMode from '../note/note-view-mode';
import NoteEditMode from '../note/note-edit-mode';
import AddingBlock from '../adding-block';
import { Button } from 'antd';

import styles from './style.module.css';
import { useEffect } from 'react';

// ToDo типа запрос
const pages = [
    {
        id: 1,
        title: 'Первая страница',
        parent: null,
    },
    {
        id: 2,
        title: 'Фильмы',
        parent: null,
    },
    {
        id: 3,
        title: 'Звездные Войны',
        parent: 2,
    },
    {
        id: 4,
        title: 'Звездные войны. Эпизод V',
        parent: 3,
    },
    {
        id: 5,
        title: 'Рецепты',
        parent: null,
    },
    {
        id: 6,
        title: 'Салаты',
        parent: 5,
    },
];

const Layout = () => {
    const dispatch = useDispatch(),
        activeMode = useSelector((state) => state.activeMode),
        activeNote = useSelector((state) => state.activeNote);

    useEffect(() => {
        dispatch(loadPages(pages));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tabToggleHandler = (activeKey) => {
        dispatch(changeNoteMode(activeKey));
    };

    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>
                {activeNote && (
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
                        {activeMode === NOTE_MODE_TYPES.VIEW && <NoteViewMode activeNote={activeNote} />}
                        {activeMode === NOTE_MODE_TYPES.EDIT && <NoteEditMode activeNote={activeNote} />}
                    </>
                )}
            </main>
            {activeMode === NOTE_MODE_TYPES.EDIT && <AddingBlock />}
        </div>
    );
};

export default Layout;
