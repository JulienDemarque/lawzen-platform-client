import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers from "./reducers";
import App from "./components/App";
import Welcome from "./components/Welcome";
import Explore from "./components/Explore";
import LawForm from "./components/LawForm";
import Signup from "./components/auth/Signup";
import Signout from "./components/auth/Signout";
import Signin from "./components/auth/Signin";

// We are missing the username, should put it in the localStorage too
const store = createStore(
  reducers,
  {
    auth: {
      authenticated: localStorage.getItem("token"),
      username: localStorage.getItem("username")
    }
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/lawform" exact component={LawForm} />
        <Route path="/signout" exact component={Signout} />
        <Route path="/explore" exact component={Explore} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
