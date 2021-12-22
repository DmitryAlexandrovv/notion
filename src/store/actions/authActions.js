import { SET_USER } from '../../constants/actions';

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};
