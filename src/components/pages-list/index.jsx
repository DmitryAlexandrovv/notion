import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getNestedArray } from '../../helpers';
import { Link } from 'react-router-dom';

import styles from './style.module.css';

const ListItem = ({ page }) => {
    const [opened, setOpened] = useState(false);

    const toggleOpened = () => setOpened((prev) => !prev);

    const titleStyles = [];
    titleStyles.push(page.parentId === undefined ? styles.topLevelTitle : styles.title);
    page.nested && titleStyles.push(styles.titleNested);
    opened && titleStyles.push(styles.titleOpened);

    const onTreeOpen = (event) => {
        event.preventDefault();
        toggleOpened();
    };

    const url = '/note/' + (page.url ? page.url : page.id);

    return (
        <li>
            <Link to={url} className={titleStyles.join(' ')}>
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
    const pages = useSelector((state) => state.notes.pages),
        formattedPages = getNestedArray(pages, undefined);

    return <List pages={formattedPages} />;
};

export default PagesList;
