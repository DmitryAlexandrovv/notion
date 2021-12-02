import styles from './style.module.css';

const TextBlock = (props) => {
    return <div className={styles.textBlock}>{props.text}</div>;
};

export default TextBlock;
