import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import reducer from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
