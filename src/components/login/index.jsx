import { auth, provider, queryGetUsers, newUserKey, saveNewUser, getPages } from '../../service/firebase';
import { loadPages, setUser } from '../../store/actions';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';

import styles from './style.module.css';

const signInWithGoogle = (onSuccess) => {
    auth.signInWithPopup(provider)
        .then((result) => {
            onSuccess(result);
        })
        .catch((error) => {
            console.log(error.message);
        });
};

const Login = () => {
    const dispatch = useDispatch();

    const onSuccess = (result) => {
        const { email, displayName } = result.user;
        let userId = null;

        queryGetUsers
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userList = snapshot.val();
                    userId = Object.keys(userList).filter((key) => userList[key].email === email)[0];
                    let user;
                    if (userId === undefined) {
                        userId = newUserKey;
                        user = {
                            id: userId,
                            name: displayName,
                            email: email,
                        };
                        saveNewUser(user);
                    } else {
                        user = {
                            id: userId,
                            name: displayName,
                            email: email,
                        };
                    }
                    dispatch(setUser(user));

                    getPages(userId).then((pages) => {
                        if (pages) {
                            dispatch(loadPages(pages));
                        } else {
                        }
                    });
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className={styles.login}>
            <Button onClick={() => signInWithGoogle(onSuccess)}>Sign in with Google</Button>
        </div>
    );
};

export default Login;
