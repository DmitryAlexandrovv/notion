import { signInWithGoogle } from '../../service/firebase';

const Login = () => {
    return (
        <div>
            <button className='button' onClick={signInWithGoogle}>
                <i className='fab fa-google'>Sign in with google</i>
            </button>
        </div>
    );
};

export default Login;
