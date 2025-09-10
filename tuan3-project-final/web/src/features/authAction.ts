import { type Dispatch } from 'redux';

interface User {
  username: string;
  token: string;
}

const LoginApi = (email: string, password: string): Promise<User> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'chuyennhagao@gmail.com' && password === '123456789') {
        resolve({ username: 'admin', token: 'fake-jwt-token' });
      } else {
        reject('Invalid email or password');
      }
    }, 1000);
  });

export default function login(email: string, password: string) {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const user = await LoginApi(email, password);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: String(error) });
    }
  };
}

export function logout() {
  return { type: 'LOGOUT' };
}
