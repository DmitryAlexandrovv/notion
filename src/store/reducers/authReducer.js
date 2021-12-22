import { CLEAR_STORE, SET_USER } from '../../constants/actions';

const initialState = {
    user: null,
    isLoggedIn: false,
};

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CLEAR_STORE:
            return initialState;
        case SET_USER:
            return {
                ...state,
                user: payload,
                isLoggedIn: true,
            };
        default:
            return state;
    }
};

export default authReducer;
