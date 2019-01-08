import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import LawView from "./LawView";

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
    const response = await axios.get("http://localhost:3090/recent");
    this.setState({ recent: response.data });
    console.log(response);
  }

  async getTopLaws() {
    const response = await axios.get("http://localhost:3090/top");
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
      `http://localhost:3090/upvote/${lawTitle}`,
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
    return (
      <div>
        <div className="container is-fluid m-b-xl">
          <h3 className="title is-3">
            Welcome! {!this.props.authenticated && "Sign up or sign in!"}
          </h3>
        </div>
        <div className="container is-fluid m-b-xl">
          <h5 className="title is-5">Top Propositions:</h5>
          {this.state.top.map(law => {
            return (
              <LawView
                key={law.title}
                handleClick={this.handleClick}
                law={law}
              />
            );
          })}
        </div>
        <div className="container is-fluid">
          <h5 className="title is-5">Recent Propositions:</h5>
          {this.state.recent.map(law => {
            return (
              <LawView
                key={law.title}
                handleClick={this.handleClick}
                law={law}
              />
            );
          })}
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
