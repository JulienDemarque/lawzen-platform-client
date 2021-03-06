import { AUTH_USER, AUTH_ERROR } from "../actions/types";

const INITIAL_STATE = {
  authenticated: "",
  username: "",
  errorMessage: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.payload.token,
        username: action.payload.username
      };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
