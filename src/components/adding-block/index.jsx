import styles from './style.module.css';

const AddingBlock = () => {
    return (
        <div className={styles.addingBlock}>
            <div className={styles.wrapper}>
                <h3 className={styles.addingBlockTitle}>Перетащите блок</h3>
                <div className={styles.block}>Текст</div>
                <div className={styles.block}>Картинка</div>
                <div className={styles.block}>Видео YouTube</div>
                <div className={styles.block}>Ссылка на другую заметку</div>
            </div>
        </div>
    );
};

export default AddingBlock;
