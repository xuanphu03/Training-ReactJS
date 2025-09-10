import { fetchLoginApi } from "@/apis/auth";
import { type Dispatch } from "redux";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./authTypes";

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await fetchLoginApi({ email, password });
      console.log(response)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error || "Login failed",
      });
    }
  };
};

export const logout = () => ({ type: LOGOUT });
