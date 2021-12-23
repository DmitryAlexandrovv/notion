import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { signIn } from '../../store/actions/authActions';

import styles from './style.module.css';

const Login = () => {
    const dispatch = useDispatch();

    const onSignInClick = () => {
        dispatch(signIn());
    };

    return (
        <div className={styles.login}>
            <Button onClick={onSignInClick}>Sign in with Google</Button>
        </div>
    );
};

export default Login;
