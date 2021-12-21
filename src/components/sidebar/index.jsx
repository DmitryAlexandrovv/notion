import PagesList from '../pages-list';
import { useSelector } from 'react-redux';

import styles from './style.module.css';

const UserData = ({ user }) => {
    const { name } = user;

    return (
        <div className={styles.user}>
            <span className={styles.userIcon}>A</span>
            <span className={styles.userName}>{name}</span>
        </div>
    );
};

const Sidebar = () => {
    const user = useSelector((state) => state.user);

    return (
        <aside className={styles.sidebar}>
            <div className={styles.wrapper}>
                <UserData user={user} />
                <PagesList />
            </div>
        </aside>
    );
};

export default Sidebar;
