import styles from './style.module.css';

const TextBlock = (props) => {
    return <div className={styles.textBlock} dangerouslySetInnerHTML={{ __html: props.text }} />;
};

export default TextBlock;
