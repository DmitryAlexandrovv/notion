import Sidebar from '../Sidebar';
import NoteViewMode from '../NoteViewMode';

import styles from './style.module.css';

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>
                <NoteViewMode />
            </main>
        </div>
    );
};

export default Layout;
