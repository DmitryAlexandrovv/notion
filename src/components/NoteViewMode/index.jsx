import TextBlock from './Blocks/Text';
import ImageBlock from './Blocks/Image';
import VideoBlock from './Blocks/YouTubeVideo';
import LinkToNoteBlock from './Blocks/LinkToNote';
import { CONTENT_TYPES } from './constants';

import styles from './style.module.css';

const note = {
    title: 'Звездные войны',
    id: 0,
    parentId: null,
    blocks: [
        {
            type: CONTENT_TYPES.TEXT,
            data: '<b>«Звёздные во́йны»</b>   rocks 😀 (англ. Star Wars, МФА: [stɑːɹ wɔːɹz]) — медиафраншиза в жанре космическая опера, включающая в себя 11 художественных фильмов (9 эпизодов основной саги, также известна как «Сага Скайуокеров» и 2 фильма «историй»), а также анимационные сериалы, мультфильмы, телефильмы, книги, комиксы, видеоигры, игрушки и прочие произведения, созданные в рамках единой фантастической вселенной «Звёздных войн», задуманной и реализованной американским режиссёром Джорджем Лукасом в конце 1970-х годов и позднее расширенной.',
        },
        {
            type: CONTENT_TYPES.IMAGE,
            data: {
                url: 'https://avatars.mds.yandex.net/get-zen_doc/3446134/pub_5eb01ba77386957c8ac84c07_5ede350dcd799e2fd3f9b717/scale_1200',
                width: '320',
            },
        },
        {
            type: CONTENT_TYPES.VIDEO,
            data: {
                id: 'kbrHDov7hLI',
                title: 'Наруто использует новый режим мудреца против Кодо в аниме Боруто',
            },
        },
        {
            type: CONTENT_TYPES.LINK_TO_NOTE,
            data: {
                id: 2,
                title: 'Фильмы',
            },
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
                    case CONTENT_TYPES.IMAGE:
                        return <ImageBlock width={block.data.width} imageURL={block.data.url} />;
                    case CONTENT_TYPES.VIDEO:
                        return <VideoBlock videoId={block.data.id} />;
                    case CONTENT_TYPES.LINK_TO_NOTE:
                        return <LinkToNoteBlock id={block.data.id} title={block.data.title} />;
                    default:
                        throw new Error('Неправильный тип контента');
                }
            })}
        </div>
    );
};

export default NoteViewMode;
