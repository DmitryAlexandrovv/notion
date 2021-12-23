import { Link } from 'react-router-dom';
import firebaseService from '../../service/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { clearStore, setLoading } from '../../store/actions';
import { TreeSelect } from 'antd';
import { createNoteTree, getNestedArray } from '../../helpers';
import { useNavigate } from 'react-router-dom';
import UserData from '../user-data';

import styles from './style.module.css';

const Navbar = () => {
    const dispatch = useDispatch(),
        navigate = useNavigate(),
        pages = useSelector((state) => state.pages),
        formattedPages = getNestedArray(pages, undefined);

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

    const openNote = (pageId) => {
        const page = pages[Object.keys(pages).find((key) => key === pageId)];
        navigate('/note/' + (page.url ? page.url : pageId), { replace: true });
    };

    return (
        <div>
            <ul className={styles.navbar}>
                <li className={styles.navbarUserItem}>
                    <UserData />
                </li>
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
                <li className={styles.navbarTreeItem}>
                    <TreeSelect value={undefined} onChange={(id) => openNote(id)} className={styles.noteTreeLink}>
                        {formattedPages.map((page) => {
                            return createNoteTree(page);
                        })}
                    </TreeSelect>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
