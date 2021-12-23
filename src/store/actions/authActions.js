import { SET_USER } from '../../constants/actions';
import { clearStore, setLoading } from './appActions';
import firebaseService from '../../service/firebase';
import { setPages } from './notesActions';

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

export const signIn = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        firebaseService
            .signInWithGoogle()
            .then((user) => {
                dispatch(setUser(user));

                return firebaseService.getPages(user.id);
            })
            .then((pages) => {
                if (pages) {
                    dispatch(setPages(pages));
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
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
};
