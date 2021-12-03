import { Button } from 'antd';

import styles from './style.module.css';

const LinkToNoteBlock = (props) => {
    const redirect = () => {
        //ToDo редирект на другую заметку
    };

    return (
        <div className={styles.imageBlock}>
            <Button onClick={redirect}>{props.title}</Button>
        </div>
    );
};

export default LinkToNoteBlock;
