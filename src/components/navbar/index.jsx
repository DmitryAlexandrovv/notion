import { Link } from 'react-router-dom';
import firebaseService from '../../service/firebase';
import { useDispatch } from 'react-redux';

import styles from './style.module.css';
import { clearStore, setLoading } from '../../store/actions/appActions';

const Navbar = () => {
    const dispatch = useDispatch();

    const logout = (event) => {
        dispatch(setLoading(true));
        event.preventDefault();
        firebaseService
            .signOut()
            .then(() => {
                dispatch(clearStore());
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    };

    return (
        <div>
            <ul className={styles.navbar}>
                <li>
                    <Link to='/' className={styles.navbarLink}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/logout' className={styles.navbarLink} onClick={logout}>
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
