import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import "bulma/css/bulma.css";
//I need to change the render according to if we are login or not. see firebase-react-login about that

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recent: [] };
  }

  componentDidMount() {
    this.getRecentLaws();
  }

  async getRecentLaws() {
    const response = await axios.get("http://localhost:3090/recent");
    this.setState({ recent: response.data });
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
  }

  render() {
    return (
      <div>
        <div className="container is-fluid m-b-xl">
          <h3 className="title is-3">Welcome! Sign up or sign in!</h3>
        </div>
        <div className="container is-fluid">
          <h5 className="title is-5">Recent Propositions:</h5>
          {this.state.recent.map(law => {
            return (
              <div key={law.title} className="notification">
                <div className="columns">
                  <div className="column">
                    <h6 className="title is-6">{law.title}</h6>
                    <p>{law.description}</p>
                  </div>
                  <div className="column">
                    <div className="has-text-right m-b-xl">
                      <button
                        onClick={this.handleClick}
                        name={law.title}
                        className="button is-large is-dark"
                      >
                        <span className="icon is-big is-left">
                          <i className="fas fa-vote-yea" />
                        </span>
                      </button>
                      <p>Upvote: {law.upVotes.length}</p>
                    </div>
                    <p className="has-text-right">
                      <strong> - {law.author.username}</strong>
                    </p>
                  </div>
                </div>
              </div>
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
