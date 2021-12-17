import { Link } from 'react-router-dom';

import styles from './style.module.css';

const Navbar = () => {
    const logout = () => {};

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
