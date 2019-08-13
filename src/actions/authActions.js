import { SIGN_IN, SIGN_OUT, UPDATE_CURRENT_USER } from "./types";

export const signIn = payload => dispatch => {
  dispatch({
    type: SIGN_IN,
    payload
  });
};

export const signOut = () => dispatch => {
  dispatch({
    type: SIGN_OUT
  });
};

export const updateUser = payload => dispatch => {
  dispatch({
    type: UPDATE_CURRENT_USER,
    payload
  });
};
