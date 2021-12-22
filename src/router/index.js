import { Navigate } from 'react-router-dom';
import Login from '../pages/login';
import Note from '../pages/note';
import Home from '../pages/home';
import NotFound from '../pages/404';
import ServerError from '../pages/500';

const routes = (isLoggedIn) => [
    {
        path: '/',
        element: isLoggedIn ? <Home /> : <Navigate to='/login' />,
    },
    {
        path: '/note/:url',
        element: isLoggedIn ? <Note /> : <Navigate to='/login' />,
    },
    {
        path: '/login',
        element: !isLoggedIn ? <Login /> : <Navigate to='/' />,
    },
    {
        path: '/500',
        element: <ServerError />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
];

export default routes;
