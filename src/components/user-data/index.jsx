import styles from './style.module.css';
import { useSelector } from 'react-redux';

const UserData = () => {
    const user = useSelector((state) => state.user);

    return (
        <div className={styles.user}>
            <span className={styles.userIcon}>A</span>
            <span className={styles.userName}>{user.name}</span>
        </div>
    );
};

export default UserData;
