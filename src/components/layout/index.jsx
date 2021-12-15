import { useDispatch, useSelector } from 'react-redux';
import { changeNoteMode } from '../../store/actions';
import { NOTE_MODE_TYPES } from '../../constants';
import Sidebar from '../sidebar';
import NoteViewMode from '../note/note-view-mode';
import NoteEditMode from '../note/note-edit-mode';
import { Tabs } from 'antd';

import styles from './style.module.css';

const { TabPane } = Tabs;

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
                    <Tabs activeKey={activeMode} onChange={tabToggleHandler}>
                        <TabPane tab='View mode' key={NOTE_MODE_TYPES.VIEW}>
                            <NoteViewMode activeNote={activeNote} />
                        </TabPane>
                        <TabPane tab='Edit mode' key={NOTE_MODE_TYPES.EDIT}>
                            <NoteEditMode activeNote={activeNote} />
                        </TabPane>
                    </Tabs>
                )}
            </main>
        </div>
    );
};

export default Layout;
