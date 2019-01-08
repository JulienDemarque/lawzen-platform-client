import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions";

// Note: I haven't handle error message properly yet. It is still to be done.
// Check the firebase-react-login for exemple

class Signin extends Component {
  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push("/lawform");
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h5 className="title is-5">Sign-in</h5>
        <form autoComplete="off" onSubmit={handleSubmit(this.onSubmit)}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <Field
                className="input"
                placeholder="email"
                name="email"
                type="text"
                component="input"
                autoComplete="off"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <Field
                className="input"
                placeholder="password"
                name="password"
                type="password"
                component="input"
                autoComplete="off"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-unlock" />
              </span>
            </div>
          </div>
          <div>{this.props.errorMessage}</div>
          <div className="control">
            <button className="button is-link">Sign in</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signin" })
)(Signin);
