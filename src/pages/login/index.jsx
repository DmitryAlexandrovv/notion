import firebaseService from '../../service/firebase';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';

import styles from './style.module.css';
import { setUser } from '../../store/actions/authActions';
import { loadPages } from '../../store/actions/notesActions';
import { setLoading } from '../../store/actions/appActions';

const Login = () => {
    const dispatch = useDispatch();

    const signIn = () => {
        dispatch(setLoading(true));
        firebaseService
            .signInWithGoogle()
            .then((user) => {
                dispatch(setUser(user));

                return firebaseService.getPages(user.id);
            })
            .then((pages) => {
                if (pages) {
                    dispatch(loadPages(pages));
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    };

    return (
        <div className={styles.login}>
            <Button onClick={signIn}>Sign in with Google</Button>
        </div>
    );
};

export default Login;
