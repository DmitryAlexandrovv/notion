import firebaseService from '../../service/firebase';
import { loadPages, setUser } from '../../store/actions';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';

import styles from './style.module.css';

const Login = () => {
    const dispatch = useDispatch();

    const signIn = () => {
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
            });
    };

    return (
        <div className={styles.login}>
            <Button onClick={signIn}>Sign in with Google</Button>
        </div>
    );
};

export default Login;
