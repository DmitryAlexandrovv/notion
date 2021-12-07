import Sidebar from '../Sidebar';
import NoteViewMode from '../NoteViewMode';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeNoteMode } from '../../store/actions';
import { NOTE_MODE_TYPES } from '../../constants';

import styles from './style.module.css';

const { TabPane } = Tabs;

const Layout = () => {
    const dispatch = useDispatch(),
        activeMode = useSelector((state) => state.activeMode);

    const tabToggleHandler = (activeKey) => {
        dispatch(changeNoteMode(activeKey));
    };

    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>
                <Tabs activeKey={activeMode} onChange={tabToggleHandler}>
                    <TabPane tab='View mode' key={NOTE_MODE_TYPES.VIEW}>
                        <NoteViewMode />
                    </TabPane>
                    <TabPane tab='Edit mode' key={NOTE_MODE_TYPES.EDIT}>
                        Content of Tab Pane 2
                    </TabPane>
                </Tabs>
            </main>
        </div>
    );
};

export default Layout;
