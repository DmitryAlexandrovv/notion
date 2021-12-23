import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import routes from './router';
import Loader from './components/loader';
import { loadPages } from './store/actions/notesActions';

const App = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const routing = useRoutes(routes(isLoggedIn));

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadPages());
        }
    }, []);

    return (
        <>
            {routing}
            <Loader />
        </>
    );
};

export default App;
