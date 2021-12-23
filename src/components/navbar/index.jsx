import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';

import styles from './style.module.css';

const Navbar = () => {
    const dispatch = useDispatch();

    const onLogout = (event) => {
        event.preventDefault();

        dispatch(logout());
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
                    <a className={styles.navbarLink} onClick={onLogout}>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
