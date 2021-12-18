import { Navigate } from 'react-router-dom';
import Login from '../components/login';
import Note from '../components/pages/note';
import Home from '../components/pages/home';
import NotFound from '../components/pages/404';

const routes = (isLoggedIn) => [
    {
        path: '/',
        element: isLoggedIn ? <Home /> : <Navigate to='/login' />,
    },
    {
        path: '/note',
        element: isLoggedIn ? <Note /> : <Navigate to='/login' />,
    },
    {
        path: '/login',
        element: !isLoggedIn ? <Login /> : <Navigate to='/' />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
];

export default routes;
