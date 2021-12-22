import styles from './style.module.css';
import { Link } from 'react-router-dom';

const ServerError = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Ошибка на сервере</h1>
            <Link to={'/'} className={styles.link}>
                На главную
            </Link>
        </div>
    );
};

export default ServerError;
