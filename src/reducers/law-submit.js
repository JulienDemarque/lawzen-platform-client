import { LAW_SUBMIT } from "../actions/types";

const INITIAL_STATE = {
  lawTitle: "",
  lawDescription: ""
};

// We are not using this reducer yet, not sure if we actually
// need a reducer since we are populating the server... maybe just for
// confirmation or for display error
export default function(state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
    case LAW_SUBMIT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
