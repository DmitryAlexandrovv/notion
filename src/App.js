import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadPages } from './store/actions';
import Layout from './components/layout';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// ToDo типа запрос
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

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadPages(pages));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <Layout />
        </DndProvider>
    );
};

export default App;
