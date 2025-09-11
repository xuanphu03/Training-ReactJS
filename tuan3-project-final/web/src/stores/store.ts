import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import authReducer from "../features/authReducer";
import chatReducer from "../features/chatReducer";


const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);
