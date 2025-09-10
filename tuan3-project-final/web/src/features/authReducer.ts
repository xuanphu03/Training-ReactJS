import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./authTypes";

interface AuthState {
  email: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  email: null,
  loading: false,
  error: null,
};

function authReducer(
  state = initialState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: string; payload?: any },
): AuthState {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      localStorage.setItem("user", action.payload.user);
      return {
        ...state,
        email: action.payload.user,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      localStorage.clear();
      return { ...state, email: null };
    default:
      return state;
  }
}

export default authReducer;
