import { SET_LOADING } from '../../constants/actions';

const initialState = {
    loading: false,
};

const appReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: payload.loading,
            };
        default:
            return state;
    }
};

export default appReducer;
