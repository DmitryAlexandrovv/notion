import TextBlock from './Blocks/Text';
import ImageBlock from './Blocks/Image';
import VideoBlock from './Blocks/YouTubeVideo';
import LinkToNoteBlock from './Blocks/LinkToNote';
import { CONTENT_TYPES } from './constants';

import styles from './style.module.css';

const NoteViewMode = (props) => {
    const { activeNote } = props;

    return (
        <div className={styles.note}>
            <h3 className={styles.noteTitle}>{activeNote.title}</h3>
            {activeNote.blocks.map((block) => {
                switch (block.type) {
                    case CONTENT_TYPES.TEXT:
                        return <TextBlock block={block} key={block.id} />;
                    case CONTENT_TYPES.IMAGE:
                        return <ImageBlock width={block.data.width} block={block} key={block.id} />;
                    case CONTENT_TYPES.VIDEO:
                        return <VideoBlock block={block} key={block.id} />;
                    case CONTENT_TYPES.LINK_TO_NOTE:
                        return <LinkToNoteBlock block={block} key={block.id} />;
                    default:
                        throw new Error('Неправильный тип контента');
                }
            })}
        </div>
    );
};

export default NoteViewMode;
