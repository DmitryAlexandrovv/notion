import { useDispatch, useSelector } from 'react-redux';
import { changeNoteMode } from '../../../store/actions';
import { NOTE_MODE_TYPES } from '../../../constants';
import Sidebar from '../../sidebar';
import NoteViewMode from './note-view-mode';
import NoteEditMode from './note-edit-mode';
import AddingBlock from '../../adding-block';
import { Button } from 'antd';

import pageStyles from '../style.module.css';
import styles from './style.module.css';

const Note = () => {
    const dispatch = useDispatch(),
        activeMode = useSelector((state) => state.activeMode),
        activeNote = useSelector((state) => state.activeNote);

    // useEffect(() => {
    //     dispatch(loadPages(pages));
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const tabToggleHandler = (activeKey) => {
        dispatch(changeNoteMode(activeKey));
    };

    return (
        <div className={pageStyles.layout}>
            <Sidebar />
            <main className={pageStyles.main}>
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

export default Note;