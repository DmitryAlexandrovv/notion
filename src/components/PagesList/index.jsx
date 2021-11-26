import { useState } from 'react';

import styles from './style.module.css';

const pages = [
    {
        id: 1,
        title: 'Первая страница',
        parent: null,
    },
    {
        id: 2,
        title: 'Фильмы',
        parent: null,
    },
    {
        id: 3,
        title: 'Звездные Войны',
        parent: 2,
    },
    {
        id: 4,
        title: 'Звездные войны. Эпизод V',
        parent: 3,
    },
    {
        id: 5,
        title: 'Рецепты',
        parent: null,
    },
    {
        id: 6,
        title: 'Салаты',
        parent: 5,
    },
];

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
    const [opened, setOpened] = useState(false);

    const toggleOpened = () => setOpened((prev) => !prev);

    const titleStyles = [];
    titleStyles.push(page.parent === null ? styles.topLevelTitle : styles.title);
    page.nested && titleStyles.push(styles.titleNested);
    opened && titleStyles.push(styles.titleOpened);

    return (
        <li>
            <div className={titleStyles.join(' ')}>
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
    const formattedPages = getNestedArray(pages, null);

    return <List pages={formattedPages} />;
};

export default PagesList;
