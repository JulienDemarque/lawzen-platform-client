import React, { Component } from "react";
import requireAuth from "./requireAuth";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";

class LawForm extends Component {
  onSubmit = formProps => {
    formProps.lawTitle = formProps.lawTitle.trim();
    formProps.lawDescription = formProps.lawDescription.trim();
    console.log("formProps: ", formProps);
    this.props.addLaw(formProps, () => {
      this.props.history.push("/");
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h5 className="title is-5">Post a new law proposition!</h5>
        <form autoComplete="off" onSubmit={handleSubmit(this.onSubmit)}>
          <div className="field">
            <label className="label">Law title</label>
            <div className="control has-icons-left has-icons-right">
              <Field
                className="input"
                placeholder="law title"
                name="lawTitle"
                type="text"
                component="input"
                autoComplete="off"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-gavel" />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Law description</label>
            <div className="control has-icons-left has-icons-right">
              <Field
                className="textarea"
                placeholder="law description"
                name="lawDescription"
                type="text"
                component="input"
                autoComplete="off"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-pen" />
              </span>
            </div>
          </div>
          <div className="control">
            <button className="button is-link">Add your law proposition</button>
          </div>
        </form>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     lawTitle: state.lawSubmit.lawTitle
//   };
// }

export default compose(
  connect(
    null,
    actions
  ),
  reduxForm({ form: "addLaw" })
)(requireAuth(LawForm));
