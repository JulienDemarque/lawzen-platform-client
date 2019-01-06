import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import lawSubmit from "./law-submit";

export default combineReducers({
  auth,
  form: formReducer,
  lawSubmit
});
