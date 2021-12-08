import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../store/actions';
import { CONTENT_TYPES } from '../NoteViewMode/constants';

import styles from './style.module.css';

const note = {
    title: 'Звездные войны',
    id: 0,
    parentId: null,
    blocks: [
        {
            id: 0,
            type: CONTENT_TYPES.TEXT,
            data: '<b>«Звёздные во́йны»</b>   rocks 😀 (англ. Star Wars, МФА: [stɑːɹ wɔːɹz]) — медиафраншиза в жанре космическая опера, включающая в себя 11 художественных фильмов (9 эпизодов основной саги, также известна как «Сага Скайуокеров» и 2 фильма «историй»), а также анимационные сериалы, мультфильмы, телефильмы, книги, комиксы, видеоигры, игрушки и прочие произведения, созданные в рамках единой фантастической вселенной «Звёздных войн», задуманной и реализованной американским режиссёром Джорджем Лукасом в конце 1970-х годов и позднее расширенной.',
        },
        {
            id: 1,
            type: CONTENT_TYPES.IMAGE,
            data: {
                url: 'https://avatars.mds.yandex.net/get-zen_doc/3446134/pub_5eb01ba77386957c8ac84c07_5ede350dcd799e2fd3f9b717/scale_1200',
                width: '320',
            },
        },
        {
            id: 2,
            type: CONTENT_TYPES.VIDEO,
            data: {
                id: 'kbrHDov7hLI',
                title: 'Наруто использует новый режим мудреца против Кодо в аниме Боруто',
            },
        },
        {
            id: 3,
            type: CONTENT_TYPES.LINK_TO_NOTE,
            data: {
                id: 2,
                title: 'Фильмы',
            },
        },
    ],
};

const getNestedArray = (pages, parent) => {
    const result = [];
    for (const page of pages) {
        if (page.parent === parent) {
            const children = getNestedArray(pages, page.id);

            if (children.length) {
                page.nested = children;
            }

            result.push(page);
        }
    }
    return result;
};

const ListItem = ({ page }) => {
    const [opened, setOpened] = useState(false),
        dispatch = useDispatch();

    const toggleOpened = () => setOpened((prev) => !prev);

    const openNote = () => {
        //ToDo типа запрос
        dispatch(setActiveNote(note));
    };

    const titleStyles = [];
    titleStyles.push(page.parent === null ? styles.topLevelTitle : styles.title);
    page.nested && titleStyles.push(styles.titleNested);
    opened && titleStyles.push(styles.titleOpened);

    return (
        <li>
            <div className={titleStyles.join(' ')} onClick={openNote}>
                {page.title}
                <span onClick={toggleOpened} />
            </div>
            {opened && page.nested ? <List pages={page.nested} /> : null}
        </li>
    );
};

const List = ({ pages }) => {
    return (
        <ul className={styles.list}>
            {pages.map((page) => (
                <ListItem key={page.id} page={page} />
            ))}
        </ul>
    );
};

const PagesList = () => {
    const formattedPages = getNestedArray(
        useSelector((state) => state.pages),
        null
    );

    return <List pages={formattedPages} />;
};

export default PagesList;
