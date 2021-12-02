import TextBlock from './Blocks/Text';
import { CONTENT_TYPES } from './constants';

import styles from './style.module.css';

const note = {
    title: 'Звездные войны',
    id: 0,
    parentId: null,
    blocks: [
        {
            type: CONTENT_TYPES.TEXT,
            data: '«Звёздные во́йны» (англ. Star Wars, МФА: [stɑːɹ wɔːɹz]) — медиафраншиза в жанре космическая опера, включающая в себя 11 художественных фильмов (9 эпизодов основной саги, также известна как «Сага Скайуокеров» и 2 фильма «историй»), а также анимационные сериалы, мультфильмы, телефильмы, книги, комиксы, видеоигры, игрушки и прочие произведения, созданные в рамках единой фантастической вселенной «Звёздных войн», задуманной и реализованной американским режиссёром Джорджем Лукасом в конце 1970-х годов и позднее расширенной.',
        },
    ],
};

const NoteViewMode = () => {
    return (
        <div className={styles.note}>
            <h3 className={styles.noteTitle}>{note.title}</h3>
            {note.blocks.map((block) => {
                switch (block.type) {
                    case CONTENT_TYPES.TEXT:
                        return <TextBlock text={block.data} />;
                        break;
                    default:
                        throw new Error('Неправильный тип контента');
                }
            })}
        </div>
    );
};

export default NoteViewMode;
