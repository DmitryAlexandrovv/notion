import PagesList from '../pages-list';
import Login from '../login';

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

    let button;

    if (user === null) {
        button = <Login />;
    } else {
        button = <UserData user={user} />;
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.wrapper}>
                {button}
                <PagesList />
            </div>
        </aside>
    );
};

export default Sidebar;
