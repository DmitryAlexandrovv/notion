import PagesList from '../pages-list';
import UserData from '../user-data';

import styles from './style.module.css';

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.wrapper}>
                <UserData />
                <PagesList />
            </div>
        </aside>
    );
};

export default Sidebar;
