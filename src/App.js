import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import routes from './router';

const App = () => {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    const routing = useRoutes(routes(isLoggedIn));

    return <>{routing}</>;
};

export default App;
