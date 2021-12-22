import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import routes from './router';
import Loader from './components/loader';

const App = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const routing = useRoutes(routes(isLoggedIn));

    return (
        <>
            {routing}
            <Loader />
        </>
    );
};

export default App;
