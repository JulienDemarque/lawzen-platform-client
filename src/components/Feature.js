import React, { Component } from "react";
import requireAuth from "./requireAuth";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";

class Feature extends Component {
  onSubmit = formProps => {
    console.log("formProps: ", formProps);
    this.props.addLaw(formProps, () => {
      //this.props.history.push("/");
      console.log("submitted");
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h3>Post a new law proposition!</h3>
        <form autoComplete="off" onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label>Law title</label>
            <Field
              name="lawTitle"
              type="text"
              component="input"
              autoComplete="off"
            />
          </fieldset>
          <fieldset>
            <label>Law description</label>
            <Field
              name="lawDescription"
              type="text"
              component="input"
              autoComplete="off"
            />
          </fieldset>
          <button>Add your law proposition</button>
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
)(requireAuth(Feature));
