import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Flipper } from "react-flip-toolkit";
import InfiniteScroll from "react-infinite-scroll-component";
import LawView from "./LawView";
import { API_URL } from "../config.js";
import { removeDuplicate } from "../utils/removeDuplicate";

class ScrollTop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      top: [],
      page: 1,
      hasMore: true
    };
  }

  componentDidMount() {
    this.getTopLaws(this.state.page);
  }

  fetchMoreData = () => {
    this.setState(
      state => ({ page: state.page + 1 }),
      () => {
        this.getTopLaws(this.state.page);
      }
    );
  };

  async getTopLaws(page) {
    const response = await axios.get(`${API_URL}/top/pages/${page}`);
    if (!response.data.length) {
      console.log(`There is no page ${page}!!`);
      this.setState({ hasMore: false });
    }
    this.setState(state => ({
      top: removeDuplicate(state.top.concat(response.data))
    }));
    // console.log("Response:", response);
  }

  handleClick = e => {
    this.sendNewUpvote(e.currentTarget.name);
  };

  async sendNewUpvote(lawTitle) {
    const token = localStorage.getItem("token");
    const config = { headers: { authorization: token } };

    const responseUpdate = await axios.post(
      `${API_URL}/upvote/${lawTitle}`,
      { lawTitle },
      config
    );
    if (responseUpdate.data === "saved your vote!") {
      const responseChangedLaw = await axios.get(
        `${API_URL}/law/single/${lawTitle}`
      );
      const lawIndex = this.state.top.findIndex(law => law.title === lawTitle);
      this.setState(({ top }) => {
        top[lawIndex] = responseChangedLaw.data;
        const sortedTop = top.sort((a, b) => {
          return b.upVotes.length - a.upVotes.length;
        });
        return { top: sortedTop };
      });
    }
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
    const { top } = this.state;

    return (
      <div>
        <div className="container is-fluid">
          <h5 className="title is-5">Top Propositions:</h5>
          <Flipper flipKey={top.map(law => law.title).join("")}>
            <InfiniteScroll
              dataLength={top.length}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {top.map(law => {
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

export default connect(mapStateToProps)(ScrollTop);
