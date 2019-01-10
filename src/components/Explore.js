import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Flipper } from "react-flip-toolkit";
import InfiniteScroll from "react-infinite-scroll-component";
import LawView from "./LawView";
import { removeDuplicate } from "../utils/removeDuplicate";

class Explore extends React.Component {
  constructor(props) {
    super(props);
    //OK we have a big mess because we share the same "page", "hasmore" state.
    //Better to make 2 InfiniteScroll
    this.state = {
      recent: [],
      top: [],
      page: 1,
      hasMore: true,
      filter: "recent"
    };
  }

  componentDidMount() {
    this.getRecentLaws(this.state.page, "recent");
    this.getRecentLaws(this.state.page, "top");
  }

  fetchMoreData = () => {
    this.setState(
      state => ({ page: state.page + 1 }),
      () => {
        this.getRecentLaws(this.state.page, this.state.filter);
      }
    );
  };

  async getRecentLaws(page, filter) {
    const response = await axios.get(
      `http://localhost:3090/${filter}/pages/${page}`
    );
    if (!response.data.length) {
      console.log(`There is no page ${page}!!`);
      this.setState({ hasMore: false });
    }
    this.setState(state => ({
      [filter]: removeDuplicate(state[filter].concat(response.data))
    }));
    console.log("Response:", response);
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
    //FUCK HOW DO I DO THAT?!!!
  }

  handleFilter = e => {
    this.setState({
      filter: e.currentTarget.getAttribute("name"),
      hasMore: true
    });
  };

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
    const { filter, recent, top } = this.state;
    const data = filter === "recent" ? recent : top;
    return (
      <div>
        <div className="container is-fluid">
          <div className="buttons has-addons is-right">
            <span
              name="recent"
              onClick={this.handleFilter}
              className={filter === "recent" ? "button is-primary" : "button"}
            >
              Most Recent
            </span>
            <span
              name="top"
              onClick={this.handleFilter}
              className={filter === "top" ? "button is-primary" : "button"}
            >
              Most Upvote
            </span>
          </div>
          <h5 className="title is-5">Recent Propositions:</h5>
          <Flipper flipKey={data.map(law => law.title).join("")}>
            <InfiniteScroll
              dataLength={data.length}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {data.map(law => {
                return (
                  <LawView
                    flipId={law.title}
                    key={law.title}
                    handleClick={this.handleClick}
                    law={law}
                  />
                );
              })}
            </InfiniteScroll>
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

export default connect(mapStateToProps)(Explore);
