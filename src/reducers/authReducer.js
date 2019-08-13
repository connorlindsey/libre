import { SIGN_IN, SIGN_OUT, UPDATE_CURRENT_USER } from "../actions/types";

const initialState = {
  user: null,
  currentUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, {
        user: action.payload,
      });
    case SIGN_OUT:
      return {
        user: null,
        currentUser: null
      }
    case UPDATE_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.payload,
      });
    default:
      return state;
  }
};
