import TextBlock from '../blocks/text';
import ImageBlock from '../blocks/image';
import VideoBlock from '../blocks/youtube-video';
import LinkToNoteBlock from '../blocks/link-to-note';
import { CONTENT_TYPES } from './constants';

import styles from './style.module.css';

const NoteViewMode = (props) => {
    const { activeNote } = props;

    return (
        <>
            <h3 className={styles.noteTitle}>{activeNote.title}</h3>
            <div className={styles.note}>
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
        </>
    );
};

export default NoteViewMode;
