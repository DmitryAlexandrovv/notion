import { Navigate } from 'react-router-dom';
import Login from '../components/login';
import Layout from '../components/layout';

const routes = (isLoggedIn) => [
    {
        path: '/',
        element: isLoggedIn ? <Layout /> : <Navigate to='/login' />,
    },
    {
        path: '/login',
        element: !isLoggedIn ? <Login /> : <Navigate to='/' />,
    },
];

export default routes;
