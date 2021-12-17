import Block from './block';
import { CONTENT_TYPES } from '../pages/note/note-view-mode/constants';

import styles from './style.module.css';

const AddingBlock = () => {
    return (
        <div className={styles.addingBlock}>
            <div className={styles.wrapper}>
                <h3 className={styles.addingBlockTitle}>Перетащите блок</h3>
                <Block type={CONTENT_TYPES.TEXT} text='Текст' />
                <Block type={CONTENT_TYPES.IMAGE} text='Картинка' />
                <Block type={CONTENT_TYPES.VIDEO} text='Видео YouTube' />
                <Block type={CONTENT_TYPES.LINK_TO_NOTE} text='Ссылка на другую заметку' />
            </div>
        </div>
    );
};

export default AddingBlock;
