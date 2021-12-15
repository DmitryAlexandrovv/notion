import { auth, provider } from '../../service/firebase';
import { setUser } from '../../store/actions';

import { Button } from 'antd';
import { useDispatch } from 'react-redux';

const userList = [
    {
        id: 1,
        email: 'deadm2249@gmail.com',
        name: 'Dead M',
    },
];

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
        const { email } = result.user;
        const foundedUser = userList.find((u) => u.email === email);
        let user;
        if (foundedUser === null) {
            // write to database id email name
            // user = foundedUser;
            // get user id
        } else {
            user = foundedUser;
        }
        dispatch(setUser(user));
    };

    return (
        <div>
            <Button onClick={() => signInWithGoogle(onSuccess)}>Sign in with Google</Button>
        </div>
    );
};

export default Login;
