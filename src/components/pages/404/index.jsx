import styles from './style.module.css';

const NotFound = () => {
    return (
        <div className={styles.notFoundPage}>
            <h1 className={styles.notFoundPageTitle}>Error 404</h1>
        </div>
    );
};

export default NotFound;
