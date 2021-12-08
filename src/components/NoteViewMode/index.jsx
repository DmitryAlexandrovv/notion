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
                        return <ImageBlock width={block.data.width} imageURL={block.data.url} key={block.id} />;
                    case CONTENT_TYPES.VIDEO:
                        return <VideoBlock videoId={block.data.id} key={block.id} />;
                    case CONTENT_TYPES.LINK_TO_NOTE:
                        return <LinkToNoteBlock id={block.data.id} title={block.data.title} key={block.id} />;
                    default:
                        throw new Error('Неправильный тип контента');
                }
            })}
        </div>
    );
};

export default NoteViewMode;
