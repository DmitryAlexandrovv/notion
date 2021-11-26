import PagesList from '../PagesList';

import styles from './style.module.css';

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.wrapper}>
                <div className={styles.user}>
                    <span className={styles.userIcon}>A</span>
                    <span className={styles.userName}>Adel Ibragimov</span>
                </div>
                <PagesList />
            </div>
        </aside>
    );
};

export default Sidebar;
