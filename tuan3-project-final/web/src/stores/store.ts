import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { type ThunkDispatch, thunk } from 'redux-thunk'
import authReducer from '../features/authSlice';
import shoppingCartReducer from '../features/shoppingCartSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  shoppingCart: shoppingCartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, any>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store