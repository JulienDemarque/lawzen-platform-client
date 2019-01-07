import React from "react";
import axios from "axios";
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
                <h6 className="title is-6">{law.title}</h6>
                <p>{law.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Welcome;
