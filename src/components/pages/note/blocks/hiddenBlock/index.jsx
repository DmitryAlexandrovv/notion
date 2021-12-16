import styles from './style.module.css';
import { useDrop } from 'react-dnd';
import { CONTENT_TYPES } from '../../note-view-mode/constants';

const HiddenBlock = ({ addHiddenBlock }) => {
    const [, drop] = useDrop(() => ({
        accept: [CONTENT_TYPES.TEXT, CONTENT_TYPES.IMAGE, CONTENT_TYPES.VIDEO, CONTENT_TYPES.LINK_TO_NOTE],
        drop: (item) => addHiddenBlock(item),
    }));

    return <div ref={drop} className={styles.hiddenBlock} />;
};

export default HiddenBlock;
