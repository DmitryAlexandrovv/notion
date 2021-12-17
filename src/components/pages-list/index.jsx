import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getNestedArray } from '../../helpers';
import { useDispatch } from 'react-redux';
import { changeNoteMode, saveActiveNote } from '../../store/actions';
import { Link } from 'react-router-dom';
import { NOTE_MODE_TYPES } from '../../constants';

import styles from './style.module.css';

const ListItem = ({ page }) => {
    const [opened, setOpened] = useState(false),
        dispatch = useDispatch();

    const toggleOpened = () => setOpened((prev) => !prev);

    const openNote = () => {
        //ToDo типа запрос(Отправлять всегда новыцй, тк на фронте хранится тока id, parentId
        //ToDo лучше один экшн?
        dispatch(changeNoteMode(NOTE_MODE_TYPES.VIEW));
        dispatch(
            saveActiveNote({
                ...page,
                blocks: [],
            })
        );
    };

    const titleStyles = [];
    titleStyles.push(page.parentId === null ? styles.topLevelTitle : styles.title);
    page.nested && titleStyles.push(styles.titleNested);
    opened && titleStyles.push(styles.titleOpened);

    const onTreeOpen = (event) => {
        event.preventDefault();
        toggleOpened();
    };

    return (
        <li>
            <Link to='/note' className={titleStyles.join(' ')} onClick={openNote}>
                {page.title}
                <span onClick={onTreeOpen} />
            </Link>
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
    const pages = useSelector((state) => state.pages),
        formattedPages = getNestedArray(pages, null);

    return <List pages={formattedPages} />;
};

export default PagesList;
