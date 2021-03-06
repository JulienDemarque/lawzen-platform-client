import React from "react";
import { connect } from "react-redux";
import { Flipped } from "react-flip-toolkit";
import {formatTime} from "../utils/formatTime"

class LawView extends React.Component {
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
    const { law, handleClick, key, flipId } = this.props;
    console.log(law.title);
    const formatedTime = formatTime(law.createdAt);
    console.log(formatedTime)
    return (
      <Flipped key={key} flipId={flipId}>
        <div className="notification">
          <div className="columns">
            <div className="column">
              <h6 className="title is-6">{law.title}</h6>
              <p>{law.description}</p>
            </div>
            <div className="column">
              <div className="has-text-right m-b-md">
                <p className="is-vertical-center">
                  <span className="is-size-5 m-r-sm">
                    {law.upVotes.length} person approved
                  </span>
                  <button
                    onClick={handleClick}
                    name={law.title}
                    className={this.renderButtonClass(law)}
                  >
                    <span className="icon is-big is-left">
                      <i className="fas fa-vote-yea" />
                    </span>
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="has-text-right">
              Posted {formatedTime.time} {formatedTime.unit} ago by <strong>{law.author.username}</strong>
            </p>
          </div>
        </div>
      </Flipped>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    username: state.auth.username
  };
}

export default connect(mapStateToProps)(LawView);
