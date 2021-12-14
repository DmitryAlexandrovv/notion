import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../store/actions';
import { CONTENT_TYPES } from '../note/note-view-mode/constants';
import { getNestedArray } from '../../helpers';

import styles from './style.module.css';

const note = {
    title: 'Звездные войны',
    id: 0,
    parentId: null,
    blocks: [
        {
            id: 0,
            type: CONTENT_TYPES.TEXT,
            data: '{"blocks":[{"key":"6339p","text":"ыфвыфв😎ыфв","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":7,"length":3,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
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
                url: 'https://www.youtube.com/watch?v=u3kGQZeSSJo',
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
