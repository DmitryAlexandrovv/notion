import { auth, provider, database, queryGetUsers, newUserKey, saveNewUser } from '../../service/firebase';
import { setUser } from '../../store/actions';

import { Button } from 'antd';
import { useDispatch } from 'react-redux';

// const userList = [
//     {
//         id: 1,
//         email: 'deadm2249@gmail.com',
//         name: 'Dead M',
//     },
// ];

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

        // const userList = getUsers();
        queryGetUsers
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    // snapshot.val();
                    const userList = snapshot.val();
                    // don't work
                    const foundedUser = userList.find((u) => u.email === email);
                    let user;
                    if (foundedUser === undefined) {
                        const userId = newUserKey;
                        console.log(newUserKey);
                        user = {
                            id: userId,
                            name: displayName,
                            email: email,
                        };
                        saveNewUser(user);
                    } else {
                        user = foundedUser;
                    }
                    dispatch(setUser(user));
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <Button onClick={() => signInWithGoogle(onSuccess)}>Sign in with Google</Button>
        </div>
    );
};

export default Login;
