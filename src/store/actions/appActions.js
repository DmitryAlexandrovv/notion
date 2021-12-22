import { CLEAR_STORE, SET_LOADING } from '../../constants/actions';

export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        payload: {
            loading,
        },
    };
};

export const clearStore = () => {
    return {
        type: CLEAR_STORE,
    };
};
