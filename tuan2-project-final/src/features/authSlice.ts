const initialState = {
  username: null,
  token: null,
};

function authReducer(
  state = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
      };
    case 'LOGOUT':
      localStorage.clear()
      return { ...state, user: null, token: null };
    default:
      return state;
  }
}

export default authReducer;
