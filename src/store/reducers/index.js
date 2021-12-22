import { combineReducers } from 'redux';
import appReducer from './appReducer';
import authReducer from './authReducer';
import notesReducer from './notesReducer';

const reducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    notes: notesReducer,
});

export default reducer;
