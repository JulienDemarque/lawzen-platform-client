import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Flipper } from "react-flip-toolkit";
import LawView from "./LawView";
import { API_URL } from "../config.js";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recent: [], top: [] };
  }

  componentDidMount() {
    this.getRecentLaws();
    this.getTopLaws();
  }

  async getRecentLaws() {
    const response = await axios.get(`${API_URL}/recent`);
    this.setState({ recent: response.data });
    console.log(response);
  }

  async getTopLaws() {
    const response = await axios.get(`${API_URL}/top`);
    this.setState({ top: response.data });
    console.log(response);
  }

  handleClick = e => {
    this.sendNewUpvote(e.currentTarget.name);
  };

  async sendNewUpvote(lawTitle) {
    const token = localStorage.getItem("token");
    const config = { headers: { authorization: token } };

    const response = await axios.post(
      `${API_URL}/upvote/${lawTitle}`,
      { lawTitle },
      config
    );
    console.log(response);
    //update the state with the new vote or unvote
    this.getRecentLaws();
    this.getTopLaws();
  }

  renderButtonClass = law => {
    const userVoted = law.upVotes.find(voter => {
      return voter.username === this.props.username;
    });
    if (userVoted) {
      return "button is-large is-primary is-inverted";
    } else {
      return "button is-large is-dark";
    }
  };

  render() {
    console.log(this.state.top.map(law => law.title).join(""));
    return (
      <div>
        <div className="container is-fluid m-b-xl">
          <h3 className="title is-3">Welcome to LawZen! </h3>
          <h4 className="title is-4 has-text-grey">
            {!this.props.authenticated && "Sign up or sign in!"}
          </h4>
        </div>
        <div className="container is-fluid m-b-xl">
          <h5 className="title is-5">Five Top Propositions:</h5>
          <Flipper flipKey={this.state.top.map(law => law.title).join("")}>
            {this.state.top.map(law => {
              return (
                <LawView
                  flipId={law.title}
                  key={law.title}
                  handleClick={this.handleClick}
                  law={law}
                />
              );
            })}
          </Flipper>
        </div>
        <div className="container is-fluid">
          <h5 className="title is-5">Five Most Recent Propositions:</h5>
          <Flipper flipKey={this.state.recent.map(law => law.title).join("")}>
            {this.state.recent.map(law => {
              return (
                <LawView
                  flipId={law.title}
                  key={law.title}
                  handleClick={this.handleClick}
                  law={law}
                />
              );
            })}
          </Flipper>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    username: state.auth.username
  };
}

export default connect(mapStateToProps)(Welcome);
