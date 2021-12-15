import { useDispatch, useSelector } from 'react-redux';
import { changeNoteMode } from '../../store/actions';
import { NOTE_MODE_TYPES } from '../../constants';
import Sidebar from '../sidebar';
import NoteViewMode from '../note/note-view-mode';
import NoteEditMode from '../note/note-edit-mode';
import AddingBlock from '../adding-block';
import { Button } from 'antd';
import Login from '../login';

import styles from './style.module.css';

const Layout = () => {
    const dispatch = useDispatch(),
        activeMode = useSelector((state) => state.activeMode),
        activeNote = useSelector((state) => state.activeNote);

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
